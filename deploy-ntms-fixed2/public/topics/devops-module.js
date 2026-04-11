// ═══════════════════════════════════════════════════════
// TOPIC MODULE: DevOps
// Azure:  Azure DevOps (Boards·Repos·Pipelines·Artifacts),
//         ACR, GitHub Actions, Azure Monitor, App Insights, Key Vault
// AWS:    CodePipeline, CodeBuild, CodeDeploy, CodeCommit,
//         ECR, CodeCatalyst, CloudWatch, Secrets Manager
// GCP:    Cloud Build, Cloud Deploy, Artifact Registry,
//         Cloud Source Repos, Cloud Monitoring, Secret Manager
// ═══════════════════════════════════════════════════════

window.TOPIC_DEVOPS = (function() {

const META = {
  id: 'devops',
  label: 'DevOps',
  icon: '🔄',
  desc: 'CI/CD pipelines, container registries, monitoring, secrets — full DevOps lifecycle',
  clouds: ['azure','aws','gcp'],
  views: ['tree','gallery','compare'],
  heroTitle: 'Which DevOps service fits your pipeline?',
  heroSub: 'Source control · CI/CD · Registries · Monitoring · Secrets management',
  chips: {
    azure: ['🔄 Azure Pipelines','📦 Azure Artifacts','🐳 ACR','⚡ GitHub Actions','📊 Azure Monitor','🔑 Key Vault'],
    aws:   ['🔄 CodePipeline','🔨 CodeBuild','🚀 CodeDeploy','🐳 ECR','📊 CloudWatch','🔑 Secrets Manager'],
    gcp:   ['🔄 Cloud Build','🚀 Cloud Deploy','📦 Artifact Registry','📊 Cloud Monitoring','🔑 Secret Manager'],
  },
};

// ── SVG HELPERS ──
function B(x,y,w,h,lb,sb,col,rx=9){
  const F={blue:'#ebf4fc',teal:'#e0f7fa',green:'#e8f5e8',amber:'#fff8ed',red:'#fce8e9',gray:'#f3f7fb',purple:'#f3e8fd',indigo:'#eef0fb',orange:'#fff3e0',pink:'#fce8f3',dark:'#1e293b'};
  const S={blue:'#0078d4',teal:'#00b4d8',green:'#107c10',amber:'#e07000',red:'#a4262c',gray:'#a0b8cc',purple:'#7b2fbe',indigo:'#4b5ae4',orange:'#e65100',pink:'#c2185b',dark:'#334155'};
  const TX={blue:'#004578',teal:'#006478',green:'#0a5007',amber:'#5a3000',red:'#6b0c0e',gray:'#3a5068',purple:'#4a1580',indigo:'#1e2580',orange:'#4e1f00',pink:'#6a0030',dark:'#f1f5f9'};
  const f=F[col]||F.blue,s=S[col]||S.blue,t=TX[col]||TX.blue;
  const cy=sb?y+h/2-7:y+h/2;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width="1.5"/>
<text x="${x+w/2}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="'DM Sans',sans-serif" font-size="14" font-weight="600" fill="${t}">${lb}</text>
${sb?`<text x="${x+w/2}" y="${y+h/2+11}" text-anchor="middle" dominant-baseline="central" font-family="'DM Sans',sans-serif" font-size="12" fill="${t}" opacity=".8">${sb}</text>`:''}`;}

function A(x1,y1,x2,y2,col='#0078d4'){
  const id='dv'+Math.abs(x1*3+y1*7+x2*11+y2*17);
  return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round"/></marker></defs>
<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="2" class="fa" marker-end="url(#${id})"/>`;}

function N(x,y,t){return `<text x="${x}" y="${y}" font-family="'DM Sans',sans-serif" font-size="13" fill="#6a8ba4">${t}</text>`;}
function SVG(c,h=268){return `<svg viewBox="0 0 780 ${h}" xmlns="http://www.w3.org/2000/svg">${c}</svg>`;}

// ── GLOSSY ICON BUILDER ──
function gi(iid,bg1,bg2,shape){
  return `<svg width="80" height="80" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 6px 18px ${bg1}70)">
<defs>
<radialGradient id="gb_${iid}" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="${bg2}"/><stop offset="100%" stop-color="${bg1}"/></radialGradient>
<radialGradient id="gs_${iid}" cx="42%" cy="18%" r="62%"><stop offset="0%" stop-color="rgba(255,255,255,0.62)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>
</defs>
<rect x="4" y="5" width="64" height="63" rx="16" fill="url(#gb_${iid})"/>
<rect x="4" y="5" width="64" height="35" rx="16" fill="url(#gs_${iid})" opacity="0.75"/>
<rect x="4" y="28" width="64" height="12" fill="url(#gs_${iid})" opacity="0.22"/>
${shape}
<rect x="4" y="5" width="64" height="63" rx="16" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
</svg>`;}

// ── ICON SHAPES ──
// CI/CD pipeline — circular arrows with stages
const PIPELINE = `
<circle cx="36" cy="36" r="16" fill="none" stroke="white" stroke-width="3" stroke-dasharray="60 20" stroke-linecap="round"/>
<path d="M36 20 L40 26 L32 26Z" fill="white"/>
<circle cx="21" cy="42" r="4" fill="white" opacity=".9"/>
<circle cx="36" cy="52" r="4" fill="white" opacity=".8"/>
<circle cx="51" cy="42" r="4" fill="white" opacity=".7"/>`;

// Build hammer + code
const BUILD = `
<rect x="18" y="22" width="36" height="28" rx="5" fill="white" opacity=".9"/>
<rect x="18" y="22" width="36" height="9" rx="5" fill="rgba(255,255,255,0.5)"/>
<rect x="18" y="27" width="36" height="4" fill="rgba(255,255,255,0.5)"/>
<circle cx="24" cy="29" r="2" fill="rgba(0,0,0,.2)"/>
<circle cx="30" cy="29" r="2" fill="rgba(0,0,0,.15)"/>
<rect x="22" y="36" width="10" height="2.5" rx="1" fill="rgba(0,0,0,.25)"/>
<rect x="22" y="41" width="16" height="2.5" rx="1" fill="rgba(0,0,0,.2)"/>
<rect x="22" y="46" width="8" height="2.5" rx="1" fill="rgba(0,0,0,.15)"/>
<path d="M42 35 L50 27 L54 31 L46 39Z" fill="white" opacity=".85"/>
<rect x="48" y="24" width="5" height="7" rx="2" fill="white" opacity=".7" transform="rotate(45 50 27)"/>`;

// Git branch
const GIT = `
<circle cx="36" cy="20" r="6" fill="white" opacity=".95"/>
<circle cx="22" cy="50" r="5.5" fill="white" opacity=".9"/>
<circle cx="50" cy="50" r="5.5" fill="white" opacity=".9"/>
<line x1="36" y1="26" x2="36" y2="40" stroke="white" stroke-width="2.5" opacity=".8"/>
<path d="M36 40 Q36 50 22 50" fill="none" stroke="white" stroke-width="2.5" opacity=".75"/>
<path d="M36 40 Q36 50 50 50" fill="none" stroke="white" stroke-width="2.5" opacity=".65"/>
<circle cx="36" cy="40" r="3.5" fill="white" opacity=".85"/>`;

// Container registry — whale-like box
const REGISTRY = `
<rect x="14" y="18" width="44" height="38" rx="6" fill="white" opacity=".9"/>
<rect x="14" y="18" width="44" height="12" rx="6" fill="rgba(255,255,255,0.5)"/>
<rect x="14" y="25" width="44" height="5" fill="rgba(255,255,255,0.5)"/>
<rect x="20" y="35" width="10" height="10" rx="2.5" fill="rgba(0,0,0,.18)"/>
<rect x="33" y="35" width="10" height="10" rx="2.5" fill="rgba(0,0,0,.14)"/>
<rect x="46" y="35" width="6" height="10" rx="2" fill="rgba(0,0,0,.1)"/>
<rect x="20" y="48" width="32" height="3" rx="1.5" fill="rgba(0,0,0,.1)"/>`;

// Deploy rocket
const DEPLOY = `
<path d="M36 14 Q42 14 44 20 L48 36 L36 44 L24 36 L28 20 Q30 14 36 14Z" fill="white" opacity=".92"/>
<path d="M24 36 L18 44 L24 44 L28 40Z" fill="white" opacity=".7"/>
<path d="M48 36 L54 44 L48 44 L44 40Z" fill="white" opacity=".7"/>
<path d="M30 44 L32 54 L36 58 L40 54 L42 44Z" fill="white" opacity=".6"/>
<circle cx="36" cy="28" r="5" fill="rgba(0,0,0,.2)"/>`;

// Monitor — chart with line
const MONITOR = `
<rect x="12" y="16" width="48" height="32" rx="5" fill="white" opacity=".92"/>
<rect x="28" y="48" width="16" height="5" fill="white" opacity=".7"/>
<rect x="22" y="52" width="28" height="3" rx="1.5" fill="white" opacity=".55"/>
<polyline points="16,40 24,34 30,38 38,24 46,30 54,22" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="24" cy="34" r="2.5" fill="rgba(0,0,0,.3)"/>
<circle cx="38" cy="24" r="2.5" fill="rgba(0,0,0,.3)"/>`;

// Key / lock
const KEYVAULT = `
<circle cx="36" cy="28" r="12" fill="none" stroke="white" stroke-width="3"/>
<circle cx="36" cy="28" r="5" fill="white" opacity=".9"/>
<rect x="32" y="38" width="8" height="16" rx="3" fill="white" opacity=".88"/>
<rect x="38" y="44" width="6" height="4" rx="1.5" fill="white" opacity=".6"/>
<rect x="38" y="50" width="6" height="4" rx="1.5" fill="white" opacity=".6"/>`;

// Package box
const ARTIFACTS = `
<path d="M20 28 L36 20 L52 28 L52 50 L36 58 L20 50Z" fill="white" opacity=".9"/>
<line x1="36" y1="20" x2="36" y2="58" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<line x1="20" y1="28" x2="52" y2="28" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<path d="M28 24 L36 20 L44 24 L36 28Z" fill="rgba(255,255,255,0.35)"/>`;

// Octocat-style github
const GITHUB = `
<circle cx="36" cy="36" r="18" fill="white" opacity=".92"/>
<path d="M36 24 C28 24 22 30 22 38 C22 44.6 26.4 50.2 32.6 52.2 C33.4 52.4 33.6 51.8 33.6 51.4 L33.6 49 C29.4 49.8 28.4 47 28.2 46.2 C27.8 45.2 27 44.4 26.4 43.8 C26 43.6 25.6 42.8 26.4 42.8 C27.2 42.8 27.8 43.6 28.2 44.2 C29.2 46 31 45.4 33.6 44.6 C33.8 43.6 34.2 42.8 34.8 42.4 C30.8 41.6 27 40 27 33.8 C27 31.8 27.6 30.2 28.8 29 C28.6 28.4 28 26.6 29 24.2 C29 24.2 30.6 23.6 33.6 25.8 C35 25.4 36.6 25.2 38 25.2 C39.4 25.2 40.8 25.4 42.2 25.8 C45.2 23.6 46.8 24.2 46.8 24.2 C47.8 26.6 47.2 28.4 47 29 C48.2 30.2 49 31.8 49 33.8 C49 40 45.2 41.6 41.2 42.4 C42 43 42.6 44.2 42.6 46 L42.6 51.4 C42.6 51.8 42.8 52.4 43.6 52.2 C49.8 50.2 54 44.6 54 38 C54 30 48 24 36 24Z" fill="rgba(0,0,0,.25)"/>`;

const ICONS = {
  // AZURE
  'azure_devops':     gi('azDO',    '#003060','#0050b3', PIPELINE),
  'azure_pipelines':  gi('azPipes', '#004578','#0078d4', PIPELINE),
  'azure_repos':      gi('azRepos', '#005a00','#107c10', GIT),
  'azure_artifacts':  gi('azArtif', '#5c0080','#9333ea', ARTIFACTS),
  'azure_acr':        gi('azACR',   '#004578','#0078d4', REGISTRY),
  'azure_ghactions':  gi('azGHA',   '#1a1a2e','#30363d', GITHUB),
  'azure_monitor':    gi('azMon',   '#0a3060','#1060c0', MONITOR),
  'azure_appinsights':gi('azAI2',   '#0a5060','#0891b2', MONITOR),
  'azure_keyvault':   gi('azKV',    '#7a3000','#b45309', KEYVAULT),
  // AWS
  'aws_codepipeline': gi('awsCP',   '#7a4200','#e07000', PIPELINE),
  'aws_codebuild':    gi('awsCB',   '#6a3800','#c86800', BUILD),
  'aws_codedeploy':   gi('awsCD',   '#5a3000','#a05000', DEPLOY),
  'aws_codecommit':   gi('awsCC',   '#4a3000','#886000', GIT),
  'aws_ecr':          gi('awsECR',  '#7a4200','#d47000', REGISTRY),
  'aws_codecatalyst': gi('awsCAT',  '#1a1a2e','#2d3748', GITHUB),
  'aws_cloudwatch':   gi('awsCW',   '#1a4080','#2563eb', MONITOR),
  'aws_secrets':      gi('awsSM',   '#7a2000','#c03000', KEYVAULT),
  // GCP
  'gcp_cloudbuild':   gi('gcpCB',   '#0d3b8c','#2878e8', BUILD),
  'gcp_clouddeploy':  gi('gcpCD2',  '#0d4060','#0891b2', DEPLOY),
  'gcp_artifactreg':  gi('gcpAR',   '#0a4060','#0284c7', ARTIFACTS),
  'gcp_sourcerepos':  gi('gcpSR',   '#0a5040','#059669', GIT),
  'gcp_monitoring':   gi('gcpMon',  '#0d3b8c','#1a73e8', MONITOR),
  'gcp_secretmgr':    gi('gcpSec',  '#0d4060','#0369a1', KEYVAULT),
};

// ── DIAGRAMS ──
const DIAG = {
  // AZURE
  azure_devops: ()=>SVG(`
${B(20,35,120,42,'Dev Team','Code + planning','gray')}
${A(140,56,220,56,'#0050b3')}
${B(220,20,200,130,'Azure DevOps','Boards·Repos·Pipelines·Artifacts','blue')}
${A(420,38,498,30,'#0078d4')}${A(420,56,498,56,'#0078d4')}${A(420,74,498,86,'#0078d4')}${A(420,100,498,112,'#0078d4')}${A(420,130,498,140,'#0078d4')}
${B(498,14,175,34,'Boards','Kanban · Scrum · Epics','teal',7)}
${B(498,52,175,34,'Repos','Git · branch policies · PR','green',7)}
${B(498,90,175,34,'Pipelines','CI + CD YAML','blue',7)}
${B(498,128,175,34,'Artifacts','NuGet · npm · Maven','purple',7)}
${B(498,166,175,34,'Test Plans','Manual + automated','amber',7)}
${N(20,215,'Single SaaS platform · GitHub integration · RBAC · Audit logs · Free 5 users')}`,228),

  azure_pipelines: ()=>SVG(`
${B(20,60,110,44,'Code Push','GitHub · Azure Repos','gray')}
${A(130,82,208,82,'#0078d4')}
${B(208,44,165,76,'CI Stage','Build · Test · Lint','blue')}
${A(373,70,448,56,'#107c10')}${A(373,90,448,90,'#107c10')}${A(373,110,448,120,'#107c10')}
${B(448,38,155,38,'Dev slot deploy','auto on PR merge','green',7)}
${B(448,80,155,38,'Staging deploy','approval gate','amber',7)}
${B(448,118,155,38,'Prod deploy','manual approval','teal',7)}
${A(603,57,670,57,'#0078d4')}${A(603,99,670,99,'#0078d4')}${A(603,137,670,137,'#0078d4')}
${B(670,38,95,38,'App Service','','gray',7)}
${B(670,80,95,38,'AKS / ACR','','gray',7)}
${B(670,118,95,38,'Azure Infra','Bicep/TF','gray',7)}
${N(20,208,'YAML pipelines · Matrix builds · Environments · Approval gates · Self-hosted agents')}`,220),

  azure_repos: ()=>SVG(`
${B(20,80,120,44,'Developer','git push / PR','gray')}
${A(140,102,218,102,'#107c10')}
${B(218,60,175,90,'Azure Repos','Managed Git hosting','green')}
${A(393,80,468,65,'#107c10')}${A(393,102,468,102,'#107c10')}${A(393,124,468,140,'#107c10')}
${B(468,48,180,40,'Branch policies','Require PR + reviewer','green',7)}
${B(468,92,180,40,'Protected branches','No direct push to main','teal',7)}
${B(468,132,180,40,'Pipeline trigger','On push/merge → CI','blue',7)}
${N(20,208,'Unlimited private repos · PR comments · TFVC support · Mirror from GitHub')}`,220),

  azure_artifacts: ()=>SVG(`
${B(20,80,120,44,'Developer / CI','Publish package','gray')}
${A(140,102,220,102,'#9333ea')}
${B(220,60,175,90,'Azure Artifacts','Universal package registry','purple')}
${A(395,80,470,65,'#9333ea')}${A(395,102,470,102,'#9333ea')}${A(395,124,470,138,'#9333ea')}
${B(470,48,175,38,'NuGet · npm · Maven','Language packages','purple',7)}
${B(470,90,175,38,'Universal Packages','Any binary artifact','blue',7)}
${B(470,128,175,38,'Upstream sources','PyPI · npmjs proxy','teal',7)}
${N(20,208,'2 GB free · Upstream caching · Retention policies · SBOM · Feed permissions')}`,220),

  azure_acr: ()=>SVG(`
${B(20,80,120,44,'CI Pipeline','docker push','gray')}
${A(140,102,218,102,'#0078d4')}
${B(218,60,175,90,'Azure Container Registry','Docker + Helm + OCI','blue')}
${A(393,80,468,65,'#0078d4')}${A(393,102,468,102,'#0078d4')}${A(393,124,468,138,'#0078d4')}
${B(468,48,185,38,'Geo-replication','Multi-region mirror','teal',7)}
${B(468,90,185,38,'Tasks (ACR Tasks)','Build + test in cloud','green',7)}
${B(468,128,185,38,'Vulnerability scan','Microsoft Defender','red',7)}
${N(20,208,'OCI-compliant · Private · Helm chart storage · Quarantine · Webhooks')}`,220),

  azure_ghactions: ()=>SVG(`
${B(20,80,120,44,'Code Push / PR','GitHub repository','gray')}
${A(140,102,218,102,'#30363d')}
${B(218,55,175,95,'GitHub Actions','CI/CD · Automation','gray')}
${A(393,80,468,65,'#0078d4')}${A(393,102,468,102,'#0078d4')}${A(393,124,468,138,'#0078d4')}
${B(468,48,185,38,'Azure login action','OIDC federated auth','blue',7)}
${B(468,90,185,38,'Deploy to App Svc','azure/webapps-deploy','green',7)}
${B(468,128,185,38,'AKS set-context','Kubernetes deploy','teal',7)}
${N(20,208,'2000 free min/month · OIDC to Azure (no secrets) · Self-hosted runners on VMs/AKS')}`,220),

  azure_monitor: ()=>SVG(`
${B(20,55,130,44,'Apps / Infra','Metrics · Logs · Traces','gray')}
${A(150,77,225,90,'#1060c0')}
${B(225,55,175,90,'Azure Monitor','Unified observability','blue')}
${A(400,72,475,55,'#1060c0')}${A(400,92,475,92,'#1060c0')}${A(400,112,475,128,'#1060c0')}
${B(475,38,175,38,'Log Analytics','KQL queries · Workbooks','teal',7)}
${B(475,80,175,38,'Metrics + Alerts','Thresholds · Action groups','green',7)}
${B(475,120,175,38,'App Insights','APM · Traces · Live metrics','purple',7)}
${N(20,208,'KQL · Dashboards · Workbooks · 90-day retention · Smart detection · Alerts → PagerDuty')}`,220),

  azure_appinsights: ()=>SVG(`
${B(20,70,130,44,'Application','SDK instrumented','gray')}
${A(150,92,225,105,'#0891b2')}
${B(225,68,175,90,'Application Insights','APM · Distributed tracing','teal')}
${A(400,85,475,68,'#0891b2')}${A(400,105,475,105,'#0891b2')}${A(400,125,475,138,'#0891b2')}
${B(475,50,175,38,'Request · Dependency','Trace every call','teal',7)}
${B(475,92,175,38,'Availability tests','Ping from 5 regions','green',7)}
${B(475,132,175,38,'Smart detection','ML anomaly alerts','purple',7)}
${N(20,208,'Auto-instrument .NET · Node · Java · Python · Browser SDK · OpenTelemetry · Live Metrics')}`,220),

  azure_keyvault: ()=>SVG(`
${B(20,80,130,44,'App / Pipeline','Managed Identity auth','gray')}
${A(150,102,225,102,'#b45309')}
${B(225,60,175,90,'Azure Key Vault','Secrets · Keys · Certs','amber')}
${A(400,80,475,65,'#b45309')}${A(400,102,475,102,'#b45309')}${A(400,124,475,138,'#b45309')}
${B(475,48,175,38,'Secrets','API keys · conn strings','amber',7)}
${B(475,90,175,38,'Certificates','TLS · auto-renew','green',7)}
${B(475,130,175,38,'Keys (HSM)','Encryption · signing','blue',7)}
${N(20,208,'No-secret auth via Managed Identity · Soft-delete · RBAC · Purge protection · HSM tier')}`,220),

  // AWS
  aws_codepipeline: ()=>SVG(`
${B(20,60,110,44,'Code Push','GitHub · CodeCommit · S3','gray')}
${A(130,82,208,82,'#e07000')}
${B(208,44,165,76,'CodePipeline','CI/CD orchestrator','amber')}
${A(373,70,445,56,'#107c10')}${A(373,90,445,90,'#107c10')}${A(373,110,445,120,'#107c10')}
${B(445,38,155,38,'Source stage','GitHub · ECR trigger','green',7)}
${B(445,80,155,38,'Build stage','CodeBuild · Jenkins','amber',7)}
${B(445,118,155,38,'Deploy stage','CodeDeploy · ECS · CF','teal',7)}
${A(600,57,665,57,'#0078d4')}${A(600,99,665,99,'#0078d4')}${A(600,137,665,137,'#0078d4')}
${B(665,38,100,38,'EC2 / ECS','','gray',7)}
${B(665,80,100,38,'Lambda / S3','','gray',7)}
${B(665,118,100,38,'CloudFormation','','gray',7)}
${N(20,208,'Free 1 pipeline · Visual editor · Manual approval · Cross-region · EventBridge triggers')}`,220),

  aws_codebuild: ()=>SVG(`
${B(20,80,120,44,'Source','GitHub · S3 · CodeCommit','gray')}
${A(140,102,218,102,'#c86800')}
${B(218,58,175,90,'AWS CodeBuild','Managed build service','amber')}
${A(393,80,468,65,'#c86800')}${A(393,102,468,102,'#c86800')}${A(393,124,468,138,'#c86800')}
${B(468,48,175,38,'buildspec.yml','Build commands · env vars','amber',7)}
${B(468,90,175,38,'Managed images','Ubuntu · Amazon Linux · ARM','green',7)}
${B(468,128,175,38,'Output → S3 / ECR','Artifacts + Docker image','teal',7)}
${N(20,208,'Pay per build minute · Concurrent builds · Custom Docker env · VPC support · Caching')}`,220),

  aws_codedeploy: ()=>SVG(`
${B(20,80,120,44,'Artifact','S3 bucket / ECR image','gray')}
${A(140,102,218,102,'#a05000')}
${B(218,58,175,90,'AWS CodeDeploy','Automated deployment','amber')}
${A(393,80,468,60,'#a05000')}${A(393,102,468,102,'#a05000')}${A(393,125,468,140,'#a05000')}
${B(468,42,175,38,'EC2 / On-premises','Rolling · Blue/Green','green',7)}
${B(468,84,175,38,'Lambda','Traffic shifting','teal',7)}
${B(468,126,175,38,'ECS','Blue/Green via ALB','blue',7)}
${N(20,208,'AppSpec YAML · Pre/post deployment hooks · Rollback on failure · CloudWatch alarms trigger')}`,220),

  aws_codecommit: ()=>SVG(`
${B(20,80,120,44,'Developer','git push / pull','gray')}
${A(140,102,218,102,'#886000')}
${B(218,60,175,90,'AWS CodeCommit','Managed Git hosting','amber')}
${A(393,80,468,65,'#886000')}${A(393,102,468,102,'#886000')}${A(393,124,468,138,'#886000')}
${B(468,48,180,38,'IAM-based auth','No SSH key mgmt','amber',7)}
${B(468,90,180,38,'Triggers','SNS · Lambda on push','teal',7)}
${B(468,128,180,38,'Approval rules','PR merge policies','green',7)}
${N(20,208,'⚠ New customers not accepted (Jan 2024) — use GitHub / GitLab / Bitbucket instead')}`,220),

  aws_ecr: ()=>SVG(`
${B(20,80,120,44,'CI Pipeline','docker push','gray')}
${A(140,102,218,102,'#d47000')}
${B(218,60,175,90,'Amazon ECR','Docker + OCI registry','amber')}
${A(393,80,468,65,'#d47000')}${A(393,102,468,102,'#d47000')}${A(393,124,468,138,'#d47000')}
${B(468,48,185,38,'ECR Public Gallery','Public image sharing','teal',7)}
${B(468,90,185,38,'Image scanning','Inspector · CVE scan','red',7)}
${B(468,128,185,38,'Lifecycle policies','Auto-delete old tags','green',7)}
${N(20,208,'50 GB free (private) · Pull-through cache · Cross-region replication · KMS encryption')}`,220),

  aws_codecatalyst: ()=>SVG(`
${B(20,80,120,44,'Dev Team','Code + issues','gray')}
${A(140,102,218,102,'#2d3748')}
${B(218,55,175,95,'CodeCatalyst','Unified dev platform','gray')}
${A(393,78,468,62,'#2d3748')}${A(393,102,468,102,'#2d3748')}${A(393,125,468,140,'#2d3748')}
${B(468,45,180,38,'Issues + Backlogs','Project management','teal',7)}
${B(468,87,180,38,'Source repos + CI/CD','Built-in pipelines','green',7)}
${B(468,128,180,38,'Dev Environments','Cloud IDE / VS Code','blue',7)}
${N(20,208,'AWS answer to GitHub / Azure DevOps · Free tier · Amazon Q integration (AI coding)')}`,220),

  aws_cloudwatch: ()=>SVG(`
${B(20,55,130,44,'AWS Services','Metrics auto-published','gray')}
${A(150,77,225,90,'#2563eb')}
${B(225,55,175,90,'Amazon CloudWatch','Unified observability','blue')}
${A(400,72,475,55,'#2563eb')}${A(400,92,475,92,'#2563eb')}${A(400,112,475,128,'#2563eb')}
${B(475,38,175,38,'Metrics + Alarms','Auto-scaling triggers','green',7)}
${B(475,80,175,38,'Logs Insights','Query log groups','teal',7)}
${B(475,120,175,38,'Container Insights','EKS · ECS APM','purple',7)}
${N(20,208,'Dashboards · Anomaly detection · Contributor Insights · Synthetics (canary) · X-Ray traces')}`,220),

  aws_secrets: ()=>SVG(`
${B(20,80,130,44,'App / Lambda','IAM role auth','gray')}
${A(150,102,225,102,'#c03000')}
${B(225,60,175,90,'Secrets Manager','Managed secrets + rotation','red')}
${A(400,80,475,65,'#c03000')}${A(400,102,475,102,'#c03000')}${A(400,124,475,138,'#c03000')}
${B(475,48,175,38,'Automatic rotation','Lambda-based rotate','red',7)}
${B(475,90,175,38,'Cross-account share','Resource policy','amber',7)}
${B(475,130,175,38,'SSM Param Store','Simpler/cheaper alt','gray',7)}
${N(20,208,'RDS auto-rotate · 30-day free trial · $0.40/secret/month · KMS-encrypted · Audit via CloudTrail')}`,220),

  // GCP
  gcp_cloudbuild: ()=>SVG(`
${B(20,80,120,44,'Code Push','GitHub · Cloud Source · Bitbucket','gray')}
${A(140,102,220,102,'#2878e8')}
${B(220,58,175,90,'Cloud Build','Managed CI · Build + push','blue')}
${A(395,80,470,65,'#2878e8')}${A(395,102,470,102,'#2878e8')}${A(395,124,470,138,'#2878e8')}
${B(470,48,175,38,'cloudbuild.yaml','Build steps config','blue',7)}
${B(470,90,175,38,'Build triggers','On push · PR · schedule','green',7)}
${B(470,128,175,38,'Push → Artifact Reg','Docker + packages','teal',7)}
${N(20,208,'120 free build-minutes/day · Parallel steps · Private pool (VPC) · Vulnerability scanning')}`,220),

  gcp_clouddeploy: ()=>SVG(`
${B(20,80,120,44,'Cloud Build','Built artifact / image','gray')}
${A(140,102,218,102,'#0891b2')}
${B(218,58,175,90,'Cloud Deploy','Managed CD pipeline','teal')}
${A(393,80,468,60,'#0891b2')}${A(393,102,468,102,'#0891b2')}${A(393,125,468,140,'#0891b2')}
${B(468,42,175,38,'Dev → Staging','Auto-promote','green',7)}
${B(468,84,175,38,'Manual approval','Promote gate','amber',7)}
${B(468,126,175,38,'Prod rollout','Canary · Blue/Green','teal',7)}
${N(20,208,'Delivery pipeline YAML · GKE · Cloud Run · GCE targets · Rollback · Audit trail')}`,220),

  gcp_artifactreg: ()=>SVG(`
${B(20,80,120,44,'CI Pipeline','Push artifact','gray')}
${A(140,102,218,102,'#0284c7')}
${B(218,58,175,90,'Artifact Registry','Multi-format registry','blue')}
${A(393,80,468,62,'#0284c7')}${A(393,102,468,102,'#0284c7')}${A(393,124,468,138,'#0284c7')}
${B(468,44,180,38,'Docker · Helm · OCI','Container images','blue',7)}
${B(468,86,180,38,'Maven · npm · PyPI','Language packages','green',7)}
${B(468,126,180,38,'VPC-SC + IAM','Private + fine-grained','teal',7)}
${N(20,208,'Replaces Container Registry · Regional · CMEK · Vulnerability scanning · Remote repos')}`,220),

  gcp_sourcerepos: ()=>SVG(`
${B(20,80,120,44,'Developer','git push / pull','gray')}
${A(140,102,218,102,'#059669')}
${B(218,60,175,90,'Cloud Source Repos','Managed Git hosting','green')}
${A(393,80,468,65,'#059669')}${A(393,102,468,102,'#059669')}${A(393,124,468,138,'#059669')}
${B(468,48,180,38,'Mirror from GitHub','Auto sync','green',7)}
${B(468,90,180,38,'IAM auth','Fine-grained access','teal',7)}
${B(468,128,180,38,'Cloud Build trigger','On push → CI','blue',7)}
${N(20,208,'50 GB free · Up to 50 repos · Code search · Mirror GitHub/Bitbucket · IAM-integrated')}`,220),

  gcp_monitoring: ()=>SVG(`
${B(20,55,130,44,'GCP Services','Auto metrics ingestion','gray')}
${A(150,77,225,90,'#1a73e8')}
${B(225,55,175,90,'Cloud Monitoring','Unified observability','blue')}
${A(400,72,475,55,'#1a73e8')}${A(400,92,475,92,'#1a73e8')}${A(400,112,475,128,'#1a73e8')}
${B(475,38,175,38,'Metrics + Alerting','Policies → PagerDuty','green',7)}
${B(475,80,175,38,'Uptime checks','External probing','teal',7)}
${B(475,120,175,38,'Cloud Trace / Profiler','Distributed tracing','purple',7)}
${N(20,208,'Cloud Logging + Trace + Profiler + Error Reporting = Cloud Operations Suite · OpenTelemetry')}`,220),

  gcp_secretmgr: ()=>SVG(`
${B(20,80,130,44,'App / Cloud Run','Service account auth','gray')}
${A(150,102,225,102,'#0369a1')}
${B(225,60,175,90,'Secret Manager','Managed secrets store','blue')}
${A(400,80,475,65,'#0369a1')}${A(400,102,475,102,'#0369a1')}${A(400,124,475,138,'#0369a1')}
${B(475,48,175,38,'Versioned secrets','Rotate safely','blue',7)}
${B(475,90,175,38,'IAM + VPC-SC','Fine-grained access','teal',7)}
${B(475,130,175,38,'Audit via Cloud Log','Every access logged','green',7)}
${N(20,208,'CMEK · Global or regional · Pub/Sub notifications on rotation · 6 free versions/secret')}`,220),
};

// ── SERVICE CATALOGUE ──
const SVC = {
  // AZURE
  azure_devops: {
    cl:'azure',ic:'🔄',nm:'Azure DevOps',
    tl:'Boards · Repos · Pipelines · Test Plans · Artifacts — all-in-one',
    tg:['All-in-one','CI/CD','Project mgmt'],
    ds:'Integrated suite of DevOps services. Boards for Agile planning, Repos for Git hosting, Pipelines for CI/CD, Test Plans for manual/automated testing, and Artifacts for package management.',
    dk:'azure_devops',
    ft:['Boards: Kanban · Scrum · Epics · Sprints','Repos: unlimited private Git repos','Pipelines: YAML CI/CD · multi-stage','Test Plans: manual + automated testing','Artifacts: NuGet · npm · Maven · Python','GitHub integration (Actions + Repos)','Free for 5 users + public projects','Extensible via 1000+ marketplace extensions'],
    uw:['Teams wanting a single DevOps platform','Scrum / Kanban Agile planning','Enterprise CI/CD on Azure','Migrating from Jenkins + Jira'],
    nf:'GitHub-native teams (use GitHub + Actions), pure Kubernetes GitOps (use Flux/Argo).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/devops/'
  },
  azure_pipelines: {
    cl:'azure',ic:'🔄',nm:'Azure Pipelines',
    tl:'YAML CI/CD · Multi-stage · Approval gates · Any cloud · Any language',
    tg:['CI/CD','YAML','Multi-stage'],
    ds:'Cloud-agnostic CI/CD with YAML pipeline definitions. Supports multi-stage pipelines with environments, approval gates, and deployment strategies (rolling, blue-green, canary).',
    dk:'azure_pipelines',
    ft:['YAML pipeline-as-code','Multi-stage pipelines (CI + CD)','Environments with approval gates','Matrix builds (parallel jobs)','Self-hosted and Microsoft-hosted agents','GitHub · Bitbucket · ADO repo triggers','Deployment strategies: rolling · blue-green','Free: 1800 min/month (public) · 10 parallel jobs'],
    uw:['CI/CD for apps on any cloud','Multi-environment deployment with gates','Matrix testing across OS/runtime versions','Enterprise audit + compliance pipelines'],
    nf:'Lightweight GitHub-only projects (use GitHub Actions), GitOps declarative (use Flux/ArgoCD).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/devops/pipelines/'
  },
  azure_repos: {
    cl:'azure',ic:'📁',nm:'Azure Repos',
    tl:'Managed Git · Branch policies · PR reviews · TFVC support',
    tg:['Source control','Git','PR workflows'],
    ds:'Managed Git repositories with branch policies, PR workflows, code reviews, and optional TFVC. Unlimited private repos free for all team sizes.',
    dk:'azure_repos',
    ft:['Unlimited private Git repositories','Branch policies (required reviewers · CI pass)','Protected branch rules','Pull request threads and comments','Semantic code search','TFVC (legacy centralized VCS)','Mirror from/to GitHub','Web-based code editor'],
    uw:['Teams within Azure DevOps ecosystem','Git repos needing strong branch protection','Migrating from TFVC to Git','Enterprise code review workflows'],
    nf:'GitHub-first teams (use GitHub Repos), open-source projects (GitHub is better known).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/devops/repos/'
  },
  azure_artifacts: {
    cl:'azure',ic:'📦',nm:'Azure Artifacts',
    tl:'NuGet · npm · Maven · Python · Universal packages · Upstream sources',
    tg:['Package registry','NuGet/npm/Maven','Upstream proxy'],
    ds:'Universal package management supporting NuGet, npm, Maven, Python, and Universal Packages. Upstream sources proxy and cache from npmjs, PyPI, Maven Central, and NuGet.org.',
    dk:'azure_artifacts',
    ft:['NuGet · npm · Maven · Python · Universal','Upstream sources (npmjs · PyPI · Maven Central)','Feed-level permissions','SBOM (software bill of materials)','Retention policies (auto-delete old versions)','2 GB free storage','Semantic versioning enforcement','Promotion across feeds'],
    uw:['Internal NuGet/npm package sharing','Proxying public registries for reliability','Multi-language monorepo artifact management','Compliance-grade artifact traceability'],
    nf:'Docker image registry (use ACR), external open-source publishing (use NuGet.org directly).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/devops/artifacts/'
  },
  azure_acr: {
    cl:'azure',ic:'🐳',nm:'Azure Container Registry',
    tl:'Docker · Helm · OCI · Geo-replication · ACR Tasks · Vulnerability scan',
    tg:['Container registry','Docker/Helm','OCI'],
    ds:'Private, managed OCI-compliant container registry. Supports Docker images, Helm charts, and OCI artifacts. ACR Tasks for cloud-based builds; geo-replication for global pull performance.',
    dk:'azure_acr',
    ft:['Docker · Helm · OCI artifact storage','Geo-replication (multi-region mirrors)','ACR Tasks (build + test in cloud)','Vulnerability scanning (Microsoft Defender)','Quarantine policy (block before scan)','Content trust (image signing)','Webhooks for CD triggers','Private endpoint support'],
    uw:['Storing Docker images for AKS/Container Apps','Helm chart distribution across regions','Air-gapped environments (no Docker Hub)','Enterprises needing vulnerability-gated deploys'],
    nf:'Public image distribution (use Docker Hub), non-container artifact storage (use Azure Artifacts).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/container-registry/'
  },
  azure_ghactions: {
    cl:'azure',ic:'⚡',nm:'GitHub Actions on Azure',
    tl:'GitHub-native CI/CD · OIDC to Azure · Marketplace actions · Free minutes',
    tg:['CI/CD','GitHub-native','OIDC auth'],
    ds:'GitHub Actions provides GitHub-native CI/CD workflows triggered by any GitHub event. OIDC federated credentials authenticate to Azure without storing secrets. Thousands of marketplace actions for Azure services.',
    dk:'azure_ghactions',
    ft:['YAML workflow files in .github/workflows','OIDC federated auth to Azure (no secrets stored)','2000 free min/month (GitHub Free)','azure/login · azure/webapps-deploy actions','Matrix builds (parallel jobs)','Self-hosted runners on Azure VMs/AKS','Reusable workflows and composite actions','GitHub Environments with protection rules'],
    uw:['GitHub-hosted projects deploying to Azure','Open-source projects with free CI minutes','Teams preferring GitHub-first workflow','OIDC-based secretless Azure deployments'],
    nf:'Azure DevOps-centric enterprises (use Azure Pipelines), non-GitHub repos (use Azure Pipelines).',
    nt:'💡 Use OIDC federated credentials instead of client secrets — no secret rotation needed.',
    doc:'https://docs.github.com/en/actions'
  },
  azure_monitor: {
    cl:'azure',ic:'📊',nm:'Azure Monitor',
    tl:'Unified observability · Metrics · Logs · Alerts · Workbooks · KQL',
    tg:['Monitoring','Logs/Metrics','Alerting'],
    ds:'Comprehensive monitoring platform. Collects metrics and logs from all Azure resources automatically. Log Analytics workspace for KQL queries, Alerts for threshold/smart detection, Workbooks for interactive dashboards.',
    dk:'azure_monitor',
    ft:['Auto-collection from all Azure resources','Log Analytics (KQL query engine)','Metrics explorer + dashboards','Alerts: static · dynamic · smart detection','Action groups (email · SMS · PagerDuty · Webhook)','Workbooks (interactive reports)','VM Insights · Network Insights · Container Insights','90-day log retention (configurable to 2 years)'],
    uw:['Unified Azure infrastructure monitoring','KQL log analysis across all resources','PagerDuty/OpsGenie alert routing','Cost monitoring and budget alerts'],
    nf:'Application-level APM traces (use Application Insights), third-party infra (use Grafana/Datadog).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/azure-monitor/'
  },
  azure_appinsights: {
    cl:'azure',ic:'📊',nm:'Application Insights',
    tl:'APM · Distributed tracing · Live metrics · Availability tests · OpenTelemetry',
    tg:['APM','Distributed tracing','OpenTelemetry'],
    ds:'Application Performance Monitoring built on Azure Monitor. Auto-instruments .NET, Node, Java, Python apps. Distributed tracing, dependency tracking, live metrics stream, and availability tests from 5 global regions.',
    dk:'azure_appinsights',
    ft:['Auto-instrumentation (.NET · Node · Java · Python)','Distributed traces (end-to-end map)','Dependency tracking (SQL · HTTP · queues)','Live Metrics Stream (sub-second)','Availability tests (5 global locations)','Browser SDK (JS user timing)','Smart detection (ML anomalies)','OpenTelemetry SDK support'],
    uw:['Application request/dependency tracing','Frontend + backend correlated traces','Proactive anomaly detection','SLA-based availability monitoring'],
    nf:'Infrastructure metrics (use Azure Monitor Metrics), log aggregation without APM (use Log Analytics).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview'
  },
  azure_keyvault: {
    cl:'azure',ic:'🔑',nm:'Azure Key Vault',
    tl:'Secrets · Keys · Certificates · Managed Identity auth · HSM tier',
    tg:['Secrets management','PKI','HSM'],
    ds:'Centralised secrets, encryption keys, and certificate store. Apps authenticate via Managed Identity — no credentials in code. FIPS 140-2 Level 2 HSM (Premium tier) and Level 3 via Managed HSM.',
    dk:'azure_keyvault',
    ft:['Secrets (API keys · connection strings)','Keys (RSA · EC · symmetric)','Certificates (TLS · auto-renewal via DigiCert/Let\'s Encrypt)','Managed Identity auth (no secrets in code)','Soft-delete + purge protection','RBAC + access policies','Audit logs via Azure Monitor','HSM: FIPS 140-2 L2 (Premium) · L3 (Managed HSM)'],
    uw:['Storing app secrets and DB connection strings','TLS certificate lifecycle management','Envelope encryption key management','CI/CD pipelines accessing secrets securely'],
    nf:'Config management at scale (use App Configuration), SSH key management (use separate tooling).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/key-vault/'
  },
  // AWS
  aws_codepipeline: {
    cl:'aws',ic:'🔄',nm:'AWS CodePipeline',
    tl:'CI/CD orchestrator · Visual pipeline · Manual approval · EventBridge triggers',
    tg:['CI/CD','Orchestration','Managed'],
    ds:'Fully managed CI/CD orchestration service. Visual pipeline with source, build, test, and deploy stages. Integrates with CodeBuild, CodeDeploy, Lambda, ECS, CloudFormation, and third-party tools.',
    dk:'aws_codepipeline',
    ft:['Visual pipeline editor','Source: GitHub · Bitbucket · ECR · S3','Build: CodeBuild · Jenkins','Deploy: CodeDeploy · ECS · Lambda · CloudFormation','Manual approval actions','Parallel and sequential stages','EventBridge triggers (cross-pipeline)','Free 1 active pipeline/month'],
    uw:['AWS-native application CI/CD','Blue-green deployments on EC2/ECS','Infrastructure pipeline with CloudFormation','Cross-account and cross-region deployments'],
    nf:'GitHub-hosted projects (use GitHub Actions), complex workflow orchestration (use Step Functions).',
    nt:null,
    doc:'https://docs.aws.amazon.com/codepipeline/'
  },
  aws_codebuild: {
    cl:'aws',ic:'🔨',nm:'AWS CodeBuild',
    tl:'Managed build service · buildspec.yml · Docker · ARM · Pay-per-minute',
    tg:['Build','CI','Managed'],
    ds:'Fully managed build service. Scales automatically — no build servers to manage. Runs buildspec.yml commands, produces artifacts to S3, and pushes Docker images to ECR. Pay per build minute.',
    dk:'aws_codebuild',
    ft:['buildspec.yml (commands + phases + artifacts)','Managed build environments (Ubuntu · Amazon Linux · Windows · ARM)','Custom Docker build environment','VPC support (private resource access)','Build caching (S3 · local)','Concurrent builds (auto-scale)','GitHub/Bitbucket source webhooks','Pay per build minute (100 min free/month)'],
    uw:['Compiling and testing application code','Building and pushing Docker images to ECR','Running integration tests in isolated env','Triggered by CodePipeline or GitHub Actions'],
    nf:'Long-running CI jobs >8h (use self-hosted runners), complex orchestration (use CodePipeline + Step Functions).',
    nt:null,
    doc:'https://docs.aws.amazon.com/codebuild/'
  },
  aws_codedeploy: {
    cl:'aws',ic:'🚀',nm:'AWS CodeDeploy',
    tl:'Automated deploy · EC2 · Lambda · ECS · Blue/Green · AppSpec YAML',
    tg:['CD','Deployment','Blue/Green'],
    ds:'Automated deployment service for EC2, on-premises servers, Lambda functions, and ECS services. AppSpec YAML defines deployment hooks (BeforeInstall, AfterInstall, ApplicationStart, ValidateService).',
    dk:'aws_codedeploy',
    ft:['EC2 / on-premises rolling deployments','Lambda traffic shifting (linear · canary)','ECS blue/green via ALB target group swap','AppSpec YAML lifecycle hooks','CloudWatch alarm rollback','Auto-rollback on deployment failure','Deployment groups with health checks','Free (pay only for EC2/Lambda used)'],
    uw:['Zero-downtime EC2 application deployments','Lambda canary and linear traffic shifting','ECS blue/green with instant rollback','Automated on-premises server updates'],
    nf:'Container image deployments (use ECR + ECS task definition update), Kubernetes (use kubectl/Helm/ArgoCD).',
    nt:null,
    doc:'https://docs.aws.amazon.com/codedeploy/'
  },
  aws_codecommit: {
    cl:'aws',ic:'📁',nm:'AWS CodeCommit',
    tl:'Managed Git · IAM auth · ⚠ Closed to new customers Jan 2024',
    tg:['Source control','Git','Legacy'],
    ds:'AWS-managed private Git service with IAM authentication. Note: AWS closed CodeCommit to new customers in January 2024. Existing customers continue to have access.',
    dk:'aws_codecommit',
    ft:['Private Git repositories','IAM-based authentication (HTTPS + SSH)','Encryption at rest (KMS) + in transit','SNS/Lambda triggers on repository events','Approval rule templates (PR policies)','Cross-region replication','Pull request reviews and comments','Integration with CodeBuild, CodeDeploy, CodePipeline'],
    uw:['Existing CodeCommit customers only','IAM-integrated AWS-native Git'],
    nf:'All new projects — use GitHub, GitLab, or Bitbucket. AWS recommends migration for new workloads.',
    nt:'⚠️ Closed to new customers since January 2024. New workloads should use GitHub, GitLab, or Bitbucket.',
    doc:'https://docs.aws.amazon.com/codecommit/'
  },
  aws_ecr: {
    cl:'aws',ic:'🐳',nm:'Amazon ECR',
    tl:'Docker · OCI · Public Gallery · Image scanning · Lifecycle policies',
    tg:['Container registry','Docker/OCI','Managed'],
    ds:'Fully managed Docker and OCI container registry. Private registries per account, public gallery for sharing. Inspector integration for vulnerability scanning. Pull-through cache from Docker Hub, ECR Public, and Quay.',
    dk:'aws_ecr',
    ft:['Private repositories (per AWS account/region)','ECR Public (share images publicly)','Pull-through cache (Docker Hub · Quay · GitHub)','Image scanning (Inspector · Basic)','Lifecycle policies (auto-delete old images)','Cross-region replication','Immutable image tags','50 GB free storage (private)'],
    uw:['Docker images for ECS, EKS, Lambda containers','Helm chart storage (OCI artifacts)','Secure private alternative to Docker Hub','Air-gapped environments via pull-through cache'],
    nf:'Multi-cloud registry (use Docker Hub or GitHub Container Registry), Helm-first (use OCI-compliant Artifact Registry).',
    nt:null,
    doc:'https://docs.aws.amazon.com/ecr/'
  },
  aws_codecatalyst: {
    cl:'aws',ic:'🔄',nm:'Amazon CodeCatalyst',
    tl:'Unified dev platform · Issues · Repos · CI/CD · Dev Environments · Amazon Q',
    tg:['All-in-one','CI/CD','AI-assisted'],
    ds:'AWS unified software development service combining project management, source repositories, CI/CD workflows, and cloud dev environments. Amazon Q provides AI-assisted coding and pull request reviews.',
    dk:'aws_codecatalyst',
    ft:['Issues and backlogs (project tracking)','Built-in Git source repositories','CI/CD workflow definitions','Cloud Dev Environments (VS Code · JetBrains · browser)','Amazon Q integration (AI code reviews)','Blueprints (project templates)','Free tier available','Cross-account AWS deployment'],
    uw:['Teams wanting AWS-native GitHub/Azure DevOps alternative','Greenfield AWS projects with AI coding assistance','Dev environments in the cloud (no local setup)'],
    nf:'Mature GitHub ecosystems (use GitHub), complex enterprise workflows (use Azure DevOps).',
    nt:null,
    doc:'https://docs.aws.amazon.com/codecatalyst/'
  },
  aws_cloudwatch: {
    cl:'aws',ic:'📊',nm:'Amazon CloudWatch',
    tl:'Unified observability · Metrics · Logs · Alarms · Synthetics · X-Ray',
    tg:['Monitoring','Logs/Metrics','Alerting'],
    ds:'AWS unified monitoring service. All AWS services publish metrics automatically. CloudWatch Logs Insights for log analysis. Alarms trigger auto-scaling and SNS notifications. Synthetics for canary monitoring.',
    dk:'aws_cloudwatch',
    ft:['Auto-collected metrics from all AWS services','Logs Insights (query log groups with SQL-like syntax)','Alarms (static · anomaly detection · composite)','Container Insights (EKS · ECS APM)','Lambda Insights (function metrics)','Synthetics (canary website monitors)','Contributor Insights (top-N analysis)','Cross-account observability'],
    uw:['AWS infrastructure and service monitoring','Auto-scaling triggers based on custom metrics','Log analysis across all Lambda/ECS/EC2 logs','SLA-based uptime monitoring with Synthetics'],
    nf:'Application traces (use AWS X-Ray), third-party infrastructure (use Datadog/Grafana).',
    nt:null,
    doc:'https://docs.aws.amazon.com/cloudwatch/'
  },
  aws_secrets: {
    cl:'aws',ic:'🔑',nm:'AWS Secrets Manager',
    tl:'Managed secrets · Auto-rotation · RDS integration · Cross-account · KMS',
    tg:['Secrets management','Auto-rotation','KMS'],
    ds:'Fully managed secrets store with automatic rotation. Native rotation for RDS, Redshift, DocumentDB, and custom Lambda rotation. Fine-grained access with IAM resource policies and cross-account sharing.',
    dk:'aws_secrets',
    ft:['Automatic secret rotation (Lambda-based)','Native RDS · Redshift · DocumentDB rotation','Cross-account secret sharing','KMS encryption (AWS-managed or CMK)','Resource-based policies','VPC endpoint support','Audit via CloudTrail','$0.40/secret/month (first 30 days free)'],
    uw:['RDS/Aurora credentials with auto-rotation','API keys and OAuth tokens for apps','Cross-account secret distribution','Compliance-grade secret audit logging'],
    nf:'Simple non-sensitive config (use SSM Parameter Store — free), SSH keys (use separate key mgmt).',
    nt:'💡 For non-sensitive config values, AWS Systems Manager Parameter Store is free and simpler.',
    doc:'https://docs.aws.amazon.com/secretsmanager/'
  },
  // GCP
  gcp_cloudbuild: {
    cl:'gcp',ic:'🔨',nm:'Cloud Build',
    tl:'Managed CI · cloudbuild.yaml · 120 free min/day · Private pool · VPC',
    tg:['CI/CD','Build','Managed'],
    ds:'Fully managed CI/CD build service on GCP. Executes build steps in parallel or sequentially using Docker containers. Triggers from GitHub, Bitbucket, Cloud Source Repos, or Pub/Sub.',
    dk:'gcp_cloudbuild',
    ft:['cloudbuild.yaml step definitions','Parallel and sequential build steps','GitHub · Bitbucket · Cloud Source triggers','120 free build-minutes/day','Private pools (VPC-connected workers)','Vulnerability scanning (Artifact Analysis)','Build artifacts to Artifact Registry / GCS','Approval gates (manual review)'],
    uw:['Building and pushing container images on GCP','Running tests and linting on PR push','Infrastructure-as-code pipeline (Terraform/Bicep)','Multi-step build pipelines on GCP'],
    nf:'Complex multi-environment CD (use Cloud Deploy), GitHub-hosted repos (GitHub Actions often simpler).',
    nt:null,
    doc:'https://cloud.google.com/build/docs'
  },
  gcp_clouddeploy: {
    cl:'gcp',ic:'🚀',nm:'Cloud Deploy',
    tl:'Managed CD · Delivery pipeline · GKE · Cloud Run · Approval gates · Canary',
    tg:['CD','Delivery pipeline','Managed'],
    ds:'Fully managed continuous delivery service defining promotion pipelines across environments. Targets include GKE, Cloud Run, GCE, and Anthos clusters. Supports canary, blue/green, and rolling strategies.',
    dk:'gcp_clouddeploy',
    ft:['Delivery pipeline YAML (targets + stages)','GKE · Cloud Run · Anthos · GCE targets','Approval gates between stages','Canary and blue/green deploy strategies','Automatic rollback on failure','Full audit trail (Cloud Logging)','Skaffold-based rendering','Deployment metrics and DORA tracking'],
    uw:['Multi-environment GKE/Cloud Run promotions','Auditable production deployments on GCP','Progressive delivery (canary) on Cloud Run','Compliance-grade deploy traceability'],
    nf:'Kubernetes-native GitOps (use ArgoCD/Flux), non-GCP targets (use spinnaker or Jenkins).',
    nt:null,
    doc:'https://cloud.google.com/deploy/docs'
  },
  gcp_artifactreg: {
    cl:'gcp',ic:'📦',nm:'Artifact Registry',
    tl:'Docker · Helm · Maven · npm · PyPI · Regional · VPC-SC · Vulnerability scan',
    tg:['Package registry','Multi-format','Regional'],
    ds:'GCPs universal artifact registry replacing Container Registry. Supports Docker, Helm, Maven, npm, PyPI, and Apt/Yum. Regional storage, VPC Service Controls, and integrated vulnerability scanning.',
    dk:'gcp_artifactreg',
    ft:['Docker · Helm · Maven · npm · Python (PyPI)','Apt · Yum · Go module proxy','Regional and multi-region repositories','VPC Service Controls (data exfil protection)','CMEK encryption','Vulnerability scanning (Container Analysis)','Remote repositories (proxy Docker Hub / npm / PyPI)','IAM-based fine-grained access'],
    uw:['Docker image storage for GKE/Cloud Run','Private npm/PyPI/Maven for teams','Multi-format monorepo artifact management','Secure proxying of public registries'],
    nf:'Public image distribution (use Docker Hub / GitHub Packages), Container Registry (deprecated — migrate to Artifact Registry).',
    nt:'💡 Container Registry is deprecated. Migrate to Artifact Registry for all new and existing GCP projects.',
    doc:'https://cloud.google.com/artifact-registry/docs'
  },
  gcp_sourcerepos: {
    cl:'gcp',ic:'📁',nm:'Cloud Source Repositories',
    tl:'Managed Git · Mirror GitHub/Bitbucket · IAM auth · Cloud Build trigger',
    tg:['Source control','Git','IAM-integrated'],
    ds:'Fully managed private Git repositories on GCP with IAM authentication. Can mirror from GitHub or Bitbucket. Integrated with Cloud Build for automatic CI triggers on push.',
    dk:'gcp_sourcerepos',
    ft:['Unlimited private Git repositories','Mirror from GitHub / Bitbucket (auto-sync)','IAM-based authentication','Cloud Build trigger on push/tag','Semantic code search','50 GB free · 50 repos per project','Regexable log viewer','Pub/Sub push notifications on events'],
    uw:['GCP-native projects needing simple Git hosting','Mirroring GitHub repos to GCP for build triggers','Air-gapped environments needing GCP-hosted Git','Teams using IAM-only auth'],
    nf:'GitHub-first teams (use GitHub directly), advanced PR workflows (use GitHub/GitLab).',
    nt:'💡 For most teams, GitHub or GitLab is a better choice. Cloud Source Repositories is best when you need GCP-native IAM auth or are already in a GCP-only environment.',
    doc:'https://cloud.google.com/source-repositories/docs'
  },
  gcp_monitoring: {
    cl:'gcp',ic:'📊',nm:'Cloud Monitoring',
    tl:'Metrics · Alerting · Uptime checks · Trace · Profiler · Cloud Operations Suite',
    tg:['Monitoring','Observability','Alerting'],
    ds:'GCPs unified observability platform (formerly Stackdriver). Auto-ingests metrics from all GCP services. Includes Cloud Logging, Cloud Trace, Cloud Profiler, and Error Reporting under the Cloud Operations Suite.',
    dk:'gcp_monitoring',
    ft:['Auto-collected GCP metrics','Alerting policies (threshold · ratio · MQL)','Uptime checks (external probing from 6 regions)','Dashboards and Metrics Explorer','Cloud Logging (Log-based metrics · Log Router)','Cloud Trace (distributed tracing · OpenTelemetry)','Cloud Profiler (CPU · heap · thread profiling)','PagerDuty · Slack · Webhook notifications'],
    uw:['GCP service and infrastructure monitoring','SLA-based uptime alerting','Distributed trace analysis (Cloud Trace)','Production profiling without overhead'],
    nf:'Application-level APM without GCP (use Datadog/New Relic), log-only analysis (use BigQuery + Log Export).',
    nt:null,
    doc:'https://cloud.google.com/monitoring/docs'
  },
  gcp_secretmgr: {
    cl:'gcp',ic:'🔑',nm:'Secret Manager',
    tl:'Managed secrets · Versioned · IAM · CMEK · Pub/Sub rotation events',
    tg:['Secrets management','Versioned','CMEK'],
    ds:'Fully managed secret store for API keys, passwords, and certificates. Versioned secrets with atomic rotation. Pub/Sub notifications on secret events. VPC Service Controls for data exfiltration protection.',
    dk:'gcp_secretmgr',
    ft:['Named and versioned secrets','Automatic replication (global or regional)','IAM-based fine-grained access','CMEK encryption (Cloud KMS)','Pub/Sub notifications on create/update/delete','VPC Service Controls integration','Audit logs (Cloud Audit Logs)','6 free secret versions per secret'],
    uw:['Storing API keys and DB credentials on GCP','Rotation with Pub/Sub → Cloud Function trigger','Cloud Run / GKE secret injection via env vars','Compliance-grade secret audit trail'],
    nf:'Config values (use Cloud Runtime Configuration or environment vars), SSH keys (use OS Login).',
    nt:null,
    doc:'https://cloud.google.com/secret-manager/docs'
  },
};

// ── DECISION TREES ──
const TREE = {
  azure: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What DevOps challenge are you trying to solve?',
      h:'Different teams have different primary needs — source control, CI/CD pipelines, container registries, monitoring, or secrets.',
      two:false,
      opts:[
        {ic:'🔄',lb:'End-to-end DevOps platform (all-in-one)',ds:'Planning · Git · CI/CD · testing · packages in one place',cr:'All-in-one platform',nx:'R_devops'},
        {ic:'🚀',lb:'CI/CD pipeline only',ds:'Build, test, and deploy automatically on code push',cr:'CI/CD',nx:'q2_cicd'},
        {ic:'🐳',lb:'Container image registry',ds:'Store and distribute Docker images and Helm charts',cr:'Container registry',nx:'R_acr'},
        {ic:'📊',lb:'Monitoring, alerting, and tracing',ds:'Observe app health, set alerts, trace distributed requests',cr:'Monitoring',nx:'q2_monitor'},
        {ic:'🔑',lb:'Secrets and key management',ds:'Store API keys, TLS certs, encryption keys securely',cr:'Secrets',nx:'R_keyvault'},
      ]},
    nodes: {
      q2_cicd: {id:'q2_cicd',ey:'Step 2 of 4',q:'Where is your source code hosted?',
        h:'GitHub Actions is native to GitHub. Azure Pipelines works with any Git provider.',
        two:true,
        opts:[
          {ic:'🐙',lb:'GitHub',ds:'Use GitHub Actions — OIDC to Azure, marketplace actions',cr:'GitHub',nx:'R_ghactions'},
          {ic:'📁',lb:'Azure Repos or other Git',ds:'Use Azure Pipelines — YAML, multi-stage, approval gates',cr:'Other Git',nx:'R_pipelines'},
        ]},
      q2_monitor: {id:'q2_monitor',ey:'Step 2 of 4',q:'Are you monitoring infrastructure or application code?',
        h:'Azure Monitor covers infrastructure metrics and logs. Application Insights adds APM, distributed traces, and browser monitoring.',
        two:true,
        opts:[
          {ic:'📊',lb:'Infrastructure metrics and logs',ds:'VMs, App Services, AKS — resource-level monitoring',cr:'Infrastructure',nx:'R_monitor'},
          {ic:'🔍',lb:'Application performance and traces',ds:'Request rates, latency, dependencies, exceptions, traces',cr:'APM / traces',nx:'R_appinsights'},
        ]},
    },
    results: {
      R_devops:     {k:'azure_devops',     w:'Azure DevOps is the all-in-one platform covering Boards (Agile planning), Repos (Git), Pipelines (CI/CD), Test Plans, and Artifacts. Free for 5 users and public projects — the Azure-native equivalent of GitHub Enterprise.'},
      R_pipelines:  {k:'azure_pipelines',  w:'Azure Pipelines supports YAML multi-stage CI/CD with environments, approval gates, and matrix builds. Works with GitHub, Bitbucket, and Azure Repos. Free 1800 min/month on public repos, 10 parallel jobs on Microsoft-hosted agents.'},
      R_ghactions:  {k:'azure_ghactions',  w:'GitHub Actions is the best CI/CD choice for GitHub-hosted repos. Use OIDC federated credentials to authenticate to Azure without storing secrets. The azure/login, azure/webapps-deploy, and aks-set-context actions cover most Azure deployment scenarios.'},
      R_acr:        {k:'azure_acr',        w:'Azure Container Registry is the right private container registry for Azure workloads. Push Docker images from CI/CD, pull into AKS/Container Apps/App Service. ACR Tasks build images in the cloud; geo-replication mirrors images globally.'},
      R_monitor:    {k:'azure_monitor',    w:'Azure Monitor collects metrics and logs from every Azure resource automatically. Use Log Analytics with KQL for powerful log queries, set Alerts on thresholds, and build Workbooks for team dashboards. Integrates with PagerDuty, Slack, and OpsGenie.'},
      R_appinsights:{k:'azure_appinsights',w:'Application Insights is the right choice for application-level observability. It auto-instruments .NET, Node, Java, and Python apps — tracking every request, dependency call, and exception. Distributed traces correlate across microservices. 5 GB/month free.'},
      R_keyvault:   {k:'azure_keyvault',   w:'Azure Key Vault stores secrets, encryption keys, and TLS certificates. Apps authenticate via Managed Identity — no credentials in code or pipelines. Soft-delete and purge protection prevent accidental data loss. HSM tier available for FIPS 140-2 Level 2/3.'},
    },
  },
  aws: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What DevOps challenge are you trying to solve?',
      h:'AWS has native services for each stage of the DevOps lifecycle — source, build, deploy, registry, monitor, and secrets.',
      two:false,
      opts:[
        {ic:'🔄',lb:'Full CI/CD pipeline orchestration',ds:'Source → Build → Test → Deploy across AWS services',cr:'CI/CD',nx:'q2_cicd'},
        {ic:'🔨',lb:'Build service only',ds:'Compile, test, and produce artifacts without managing servers',cr:'Build',nx:'R_codebuild'},
        {ic:'🐳',lb:'Container image registry',ds:'Store and distribute Docker/OCI images on AWS',cr:'Container registry',nx:'R_ecr'},
        {ic:'📊',lb:'Monitoring, alerting, and log analysis',ds:'CloudWatch metrics, alarms, log queries, canary tests',cr:'Monitoring',nx:'R_cloudwatch'},
        {ic:'🔑',lb:'Secrets and credential management',ds:'Store and auto-rotate API keys, DB passwords',cr:'Secrets',nx:'R_secrets'},
      ]},
    nodes: {
      q2_cicd: {id:'q2_cicd',ey:'Step 2 of 4',q:'Do you need a full unified dev platform or just CI/CD?',
        h:'CodeCatalyst is AWS\'s all-in-one dev platform (like GitHub/Azure DevOps). CodePipeline + CodeBuild is modular CI/CD.',
        two:true,
        opts:[
          {ic:'🔄',lb:'Modular CI/CD (CodePipeline + CodeBuild)',ds:'Compose pipeline stages with AWS services',cr:'Modular CI/CD',nx:'R_codepipeline'},
          {ic:'🌐',lb:'Unified platform (issues + repos + CI/CD)',ds:'CodeCatalyst — AWS answer to GitHub/Azure DevOps',cr:'Unified platform',nx:'R_codecatalyst'},
        ]},
    },
    results: {
      R_codepipeline: {k:'aws_codepipeline', w:'AWS CodePipeline orchestrates your CI/CD stages — source (GitHub/ECR/S3), build (CodeBuild), and deploy (CodeDeploy/ECS/Lambda/CloudFormation). Manual approval actions add governance gates. Free for 1 active pipeline per month.'},
      R_codebuild:    {k:'aws_codebuild',    w:'AWS CodeBuild is a fully managed build service — no Jenkins or build server to maintain. Define build commands in buildspec.yml, output artifacts to S3, and push Docker images to ECR. 100 build minutes free per month. Pay per minute after that.'},
      R_ecr:          {k:'aws_ecr',          w:'Amazon ECR is the right private container registry for AWS workloads. 50 GB free storage. Pull-through cache mirrors Docker Hub, ECR Public, and Quay images. Inspector integration scans images for CVEs automatically on push.'},
      R_cloudwatch:   {k:'aws_cloudwatch',   w:'Amazon CloudWatch collects metrics from every AWS service automatically. Use Logs Insights for log analysis, Alarms for scaling triggers and SNS notifications, and Synthetics for canary website monitoring. Container Insights adds EKS/ECS APM.'},
      R_secrets:      {k:'aws_secrets',      w:'AWS Secrets Manager is the right choice for credentials needing automatic rotation — especially RDS, Redshift, and DocumentDB passwords. For non-sensitive config values, use SSM Parameter Store (free). Both encrypt with KMS and audit via CloudTrail.'},
      R_codecatalyst: {k:'aws_codecatalyst', w:'Amazon CodeCatalyst is AWS\'s unified developer platform — issues, source repos, CI/CD workflows, and cloud dev environments in one place. Amazon Q provides AI-assisted code reviews and suggestions. Free tier available for small teams.'},
    },
  },
  gcp: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What DevOps challenge are you trying to solve?',
      h:'GCP has Cloud Build for CI, Cloud Deploy for CD, Artifact Registry for packages, Cloud Monitoring for observability, and Secret Manager for secrets.',
      two:false,
      opts:[
        {ic:'🔄',lb:'CI/CD pipeline (build + deploy)',ds:'Build code, test it, push images, promote across environments',cr:'CI/CD',nx:'q2_cicd'},
        {ic:'📦',lb:'Artifact and container registry',ds:'Store Docker, npm, Maven, PyPI packages on GCP',cr:'Registry',nx:'R_artifactreg'},
        {ic:'📊',lb:'Monitoring, alerting, and tracing',ds:'GCP metrics, alerts, uptime checks, distributed traces',cr:'Monitoring',nx:'R_monitoring'},
        {ic:'🔑',lb:'Secrets and credentials',ds:'Store API keys, DB passwords, TLS certs securely',cr:'Secrets',nx:'R_secretmgr'},
        {ic:'📁',lb:'Source code repository',ds:'Git hosting on GCP with IAM auth and Cloud Build triggers',cr:'Source control',nx:'R_sourcerepos'},
      ]},
    nodes: {
      q2_cicd: {id:'q2_cicd',ey:'Step 2 of 4',q:'Is CI (build) or CD (deploy to environments) your primary need?',
        h:'Cloud Build handles CI — compiling, testing, and building images. Cloud Deploy handles CD — promoting builds across dev, staging, and prod with approval gates.',
        two:true,
        opts:[
          {ic:'🔨',lb:'CI — Build and test (Cloud Build)',ds:'Compile · test · push image · 120 free min/day',cr:'CI / Build',nx:'R_cloudbuild'},
          {ic:'🚀',lb:'CD — Promote across environments (Cloud Deploy)',ds:'Delivery pipeline · GKE/Cloud Run · approval gates · canary',cr:'CD / Deploy',nx:'R_clouddeploy'},
        ]},
    },
    results: {
      R_cloudbuild:  {k:'gcp_cloudbuild',  w:'Cloud Build is GCPs managed CI service. Define build steps in cloudbuild.yaml — each step runs in a Docker container. 120 free build-minutes/day. Private pools connect to your VPC. Integrated vulnerability scanning pushes results to Artifact Registry.'},
      R_clouddeploy: {k:'gcp_clouddeploy', w:'Cloud Deploy manages continuous delivery pipelines across environments. Define targets (GKE cluster, Cloud Run service, GCE instance group) and promotion rules in a delivery pipeline YAML. Approval gates, canary strategies, and full audit trails are built in.'},
      R_artifactreg: {k:'gcp_artifactreg', w:'Artifact Registry is GCPs universal package store — Docker, Helm, Maven, npm, PyPI, and Apt/Yum in one service. Regional storage keeps images close to GKE clusters. Remote repositories proxy and cache Docker Hub, npmjs, and PyPI for reliability and speed.'},
      R_monitoring:  {k:'gcp_monitoring',  w:'Cloud Monitoring is GCPs observability hub. All GCP services publish metrics automatically. Set alerting policies, create uptime checks from 6 global regions, and build dashboards. The full Cloud Operations Suite adds Logging, Trace, Profiler, and Error Reporting.'},
      R_secretmgr:   {k:'gcp_secretmgr',   w:'Secret Manager stores versioned secrets with IAM-based access control. Applications running on Cloud Run, GKE, and Compute Engine access secrets via the API or mounted as environment variables. Pub/Sub notifications enable rotation-triggered Cloud Functions.'},
      R_sourcerepos: {k:'gcp_sourcerepos', w:'Cloud Source Repositories provides managed private Git with IAM auth and automatic Cloud Build triggers. Best for GCP-only environments or mirroring GitHub/Bitbucket repos into GCP for build triggers. 50 GB free per project.'},
    },
  },
};

// ── COMPARE HTML ──
const COMPARE_HTML = `
<div style="margin-bottom:1.25rem">
  <h2 class="section-title">Cross-Cloud DevOps Comparison</h2>
  <p class="section-sub">Equivalent DevOps services across Azure, AWS, and GCP — covering CI/CD, registries, monitoring, and secrets.</p>
</div>

<div class="cmp-wrap"><div class="cmp-head"><h3>All-in-One DevOps Platforms</h3><p>Unified source · planning · CI/CD · packages in a single product</p></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>All-in-one platform</td><td>Azure DevOps</td><td>Amazon CodeCatalyst</td><td>— (use GitHub + GCP services)</td></tr>
<tr><td>Issue / backlog tracking</td><td>✓ Azure Boards (Kanban · Scrum)</td><td>✓ CodeCatalyst Issues</td><td>✗ (use Jira / GitHub Issues)</td></tr>
<tr><td>Git hosting</td><td>✓ Azure Repos (unlimited private)</td><td>✓ CodeCatalyst Repos / ✗ CodeCommit (closed)</td><td>✓ Cloud Source Repositories</td></tr>
<tr><td>Free tier</td><td>Free for 5 users + public projects</td><td>Free tier (limited)</td><td>No all-in-one; individual services free</td></tr>
<tr><td>AI coding assistant</td><td>GitHub Copilot (separate)</td><td>✓ Amazon Q in CodeCatalyst</td><td>Gemini Code Assist (separate)</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>CI/CD Pipelines</h3><p>Build, test, and deploy automation</p></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>CI/CD pipeline</td><td>Azure Pipelines / GitHub Actions</td><td>CodePipeline + CodeBuild + CodeDeploy</td><td>Cloud Build + Cloud Deploy</td></tr>
<tr><td>Build config format</td><td>YAML (azure-pipelines.yml)</td><td>buildspec.yml (build) + pipeline JSON</td><td>cloudbuild.yaml</td></tr>
<tr><td>Free CI minutes</td><td>1800 min/month (public) · 10 parallel jobs</td><td>100 min/month (CodeBuild) · 1 pipeline free</td><td>120 min/day (Cloud Build)</td></tr>
<tr><td>Approval gates</td><td>✓ Environments + approvals</td><td>✓ Manual approval action</td><td>✓ Cloud Deploy approval gate</td></tr>
<tr><td>GitHub Actions support</td><td>✓ Native + Azure marketplace actions</td><td>✓ GitHub Actions OIDC to AWS</td><td>✓ GitHub Actions OIDC to GCP</td></tr>
<tr><td>Self-hosted agents/runners</td><td>✓ Self-hosted agents (VM · AKS)</td><td>✓ Self-hosted runners (EC2 · EKS)</td><td>✓ Private pools (VPC-connected)</td></tr>
<tr><td>Deployment strategies</td><td>Rolling · Blue-green · Canary (Pipelines)</td><td>Rolling · Blue-green · Canary (CodeDeploy)</td><td>Rolling · Blue-green · Canary (Cloud Deploy)</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Container &amp; Artifact Registries</h3><p>Docker images, Helm charts, language packages</p></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Container registry</td><td>Azure Container Registry (ACR)</td><td>Amazon ECR</td><td>Artifact Registry (replaces Container Registry)</td></tr>
<tr><td>Language packages</td><td>Azure Artifacts (NuGet · npm · Maven · PyPI)</td><td>CodeArtifact (npm · Maven · PyPI · NuGet)</td><td>Artifact Registry (npm · Maven · PyPI)</td></tr>
<tr><td>Free storage</td><td>ACR Basic: 10 GB · Artifacts: 2 GB</td><td>ECR: 50 GB · CodeArtifact: 2 GB</td><td>0.5 GB free then $0.10/GB</td></tr>
<tr><td>Vulnerability scanning</td><td>✓ Microsoft Defender for Containers</td><td>✓ Inspector (ECR image scanning)</td><td>✓ Container Analysis (Artifact Registry)</td></tr>
<tr><td>Geo-replication</td><td>✓ ACR geo-replication (Standard+)</td><td>✓ ECR cross-region replication</td><td>✓ Multi-region repositories</td></tr>
<tr><td>Public registry</td><td>✗ (use Docker Hub)</td><td>✓ ECR Public Gallery</td><td>✗ (use Docker Hub)</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Monitoring &amp; Observability</h3><p>Metrics, logs, traces, alerting</p></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Metrics + dashboards</td><td>Azure Monitor Metrics</td><td>Amazon CloudWatch Metrics</td><td>Cloud Monitoring</td></tr>
<tr><td>Log analysis</td><td>Log Analytics (KQL)</td><td>CloudWatch Logs Insights</td><td>Cloud Logging + Log-based metrics</td></tr>
<tr><td>APM / distributed tracing</td><td>Application Insights (auto-instrument)</td><td>AWS X-Ray</td><td>Cloud Trace + Cloud Profiler</td></tr>
<tr><td>Uptime / synthetic monitoring</td><td>App Insights availability tests</td><td>CloudWatch Synthetics (canary)</td><td>Cloud Monitoring uptime checks</td></tr>
<tr><td>Alert routing</td><td>Action Groups (email · SMS · PagerDuty · Webhook)</td><td>SNS + CloudWatch Alarms</td><td>Alerting policies → PagerDuty · Slack · Webhook</td></tr>
<tr><td>Free tier</td><td>5 GB logs/month · 1M metrics API calls</td><td>10 custom metrics · 5 GB log ingestion</td><td>Varies by resource (GCP services free)</td></tr>
<tr><td>OpenTelemetry</td><td>✓ OTEL SDK + App Insights exporter</td><td>✓ OTEL via X-Ray + CloudWatch OTEL</td><td>✓ Google Cloud OTEL Collector</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Secrets &amp; Key Management</h3></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Secrets store</td><td>Azure Key Vault</td><td>AWS Secrets Manager</td><td>GCP Secret Manager</td></tr>
<tr><td>Simple config / non-secret</td><td>Azure App Configuration</td><td>SSM Parameter Store (free)</td><td>Cloud Runtime Configuration / Env vars</td></tr>
<tr><td>Auto rotation</td><td>✓ Key Vault (custom rotation via Function)</td><td>✓ Secrets Manager (RDS/Redshift native)</td><td>✓ Pub/Sub → Cloud Function trigger</td></tr>
<tr><td>Encryption key management</td><td>✓ Key Vault Keys (RSA · EC · symmetric)</td><td>✓ AWS KMS (CMKs)</td><td>✓ Cloud KMS (symmetric · asymmetric · HSM)</td></tr>
<tr><td>HSM tier</td><td>✓ Premium SKU + Managed HSM</td><td>✓ AWS CloudHSM</td><td>✓ Cloud HSM (via Cloud KMS)</td></tr>
<tr><td>Cost</td><td>~$0.03/10K ops (Standard)</td><td>$0.40/secret/month</td><td>$0.06/10K ops · 6 free versions/secret</td></tr>
</tbody></table></div></div>`;

return { META, ICONS, DIAG, SVC, TREE, COMPARE_HTML };
})();
