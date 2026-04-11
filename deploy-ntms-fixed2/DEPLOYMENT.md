# NTMS Cloud Guide — GitHub Actions Deployment Setup

## Architecture

```
GitHub Repo
├── main     → Azure App Service (production)
├── staging  → Deployment Slot: staging
├── dev      → Deployment Slot: dev
└── release/* → Deployment Slot: release-x-y
```

Every `git push` to a configured branch triggers the workflow automatically.
The infrastructure provisioning is **idempotent** — safe to run on every push.

---

## Step 1 — Create the Service Principal

Run these commands in Azure Cloud Shell or Azure CLI:

```bash
# Set your subscription
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
APP_NAME="ntms-cloud-guide"
RG="ntms-cloud-guide-rg"

# Create Service Principal with Contributor on the resource group
# (First push creates the RG, so we give Sub-level Contributor initially)
az ad sp create-for-rbac \
  --name "sp-ntms-cloud-guide-ghactions" \
  --role "Contributor" \
  --scopes "/subscriptions/$SUBSCRIPTION_ID" \
  --sdk-auth
```

This outputs a JSON block like:
```json
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

> **Copy the entire JSON block** — you'll need it for the GitHub secret.

---

## Step 2 — Add GitHub Secrets

In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret name         | Value                                      |
|---------------------|--------------------------------------------|
| `AZURE_CREDENTIALS` | The entire JSON block from Step 1          |

---

## Step 3 — Add GitHub Environments (optional, for approval gates)

In **Settings → Environments**:
- Create `production` — add required reviewers for protection
- Create `staging` — no protection needed
- Create `dev` — no protection needed

---

## Step 4 — Push and Deploy

```bash
git add .
git commit -m "Initial NTMS Cloud Guide setup"
git push origin main   # deploys to production
```

To deploy a specific version/content to staging:
```bash
git checkout -b staging
# edit topics, branding, etc.
git push origin staging   # auto-deploys to staging slot
```

---

## Step 5 — Configure Entra ID (Azure AD) Authentication

### 5a. Register the App in Entra ID

```bash
APP_URL="https://ntms-cloud-guide.azurewebsites.net"

az ad app create \
  --display-name "NTMS Cloud Guide" \
  --web-redirect-uris "${APP_URL}/.auth/login/aad/callback" \
  --sign-in-audience "AzureADMyOrg"

# Note the appId from output
CLIENT_ID="<appId from above>"

# Create a client secret
az ad app credential reset --id $CLIENT_ID --display-name "AppService"
# Note the password from output → CLIENT_SECRET
```

### 5b. Enable Easy Auth on the App Service

```bash
RG="ntms-cloud-guide-rg"
APP="ntms-cloud-guide"
TENANT_ID=$(az account show --query tenantId -o tsv)

az webapp auth microsoft update \
  --name $APP \
  --resource-group $RG \
  --client-id $CLIENT_ID \
  --client-secret $CLIENT_SECRET \
  --tenant-id $TENANT_ID \
  --allowed-audiences "$APP_URL"

az webapp auth update \
  --name $APP \
  --resource-group $RG \
  --enabled true \
  --action AllowAnonymous \
  --token-store true
```

> We use `AllowAnonymous` so unauthenticated users can view **public topics**.
> The server reads the `X-MS-CLIENT-PRINCIPAL` header to distinguish auth state.

### 5c. Configure Topic Access Control

In **App Service → Configuration → Application settings**, add:

| Setting              | Value                    | Description                             |
|----------------------|--------------------------|-----------------------------------------|
| `AUTH_ENABLED`       | `true`                   | Enable auth checking in server.js       |
| `PROTECTED_TOPICS`   | `devops,db,compute`      | Comma-separated topic IDs to lock       |

**Topic IDs** (from module META.id):
- `lb` — Load Balancers
- `storage` — Storage
- `db` — Databases
- `compute` — App Hosting & Compute
- `devops` — DevOps

Example: `PROTECTED_TOPICS=devops,db` — only authenticated users see DevOps and Databases.

---

## Branch → Version Mapping

| Branch         | Audience        | URL                                              |
|----------------|-----------------|--------------------------------------------------|
| `main`         | Production      | `https://ntms-cloud-guide.azurewebsites.net`     |
| `staging`      | Pre-release     | `https://ntms-cloud-guide-staging.azurewebsites.net` |
| `dev`          | Development     | `https://ntms-cloud-guide-dev.azurewebsites.net` |
| `release/v2`   | Version 2       | `https://ntms-cloud-guide-release-v2.azurewebsites.net` |

> You can swap a slot to production without redeployment:
> ```bash
> az webapp deployment slot swap \
>   --name ntms-cloud-guide \
>   --resource-group ntms-cloud-guide-rg \
>   --slot staging \
>   --target-slot production
> ```

---

## Workflow Variables Reference

Edit these in `.github/workflows/deploy.yml` under `env:`:

```yaml
env:
  AZURE_RG:         ntms-cloud-guide-rg   # Resource group name
  AZURE_LOCATION:   eastus                # Azure region
  APP_SERVICE_PLAN: ntms-cloud-guide-plan # App Service Plan name
  APP_SERVICE_NAME: ntms-cloud-guide      # App Service name (must be globally unique)
  NODE_VERSION:     '20-lts'              # Node runtime
  APP_SKU:          B1                    # B1=Basic, S1=Standard (needed for slots)
```

> **Note:** Deployment slots require **Standard (S1)** or higher SKU.  
> `B1` (Basic) does NOT support slots — use `S1` if you need staging/dev slots.

---

## Local Development

```bash
npm install
node server.js
# Visit http://localhost:3000
# Auth is disabled locally (AUTH_ENABLED defaults to 'false')
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `403 on deploy` | SP needs Contributor on subscription or RG |
| `Slots not supported` | Upgrade App Service Plan to S1+ |
| `Auth header missing` | Ensure Easy Auth is enabled in App Service |
| `Cold start slow` | Upgrade to S1, enable Always On |
| `Module not found` | Run `npm install` after deploy via Kudu console |
