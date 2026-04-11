// ═══════════════════════════════════════════════════════
// TOPIC MODULE: App Hosting & Compute
// Azure:  App Service, Functions, Static Web Apps, Logic Apps,
//         Container Apps, API Management
// AWS:    Elastic Beanstalk, Lambda, Amplify, Step Functions,
//         App Runner, API Gateway, EventBridge
// GCP:    App Engine, Cloud Functions, Firebase Hosting,
//         Workflows, Cloud Run, Cloud Endpoints/Apigee
// ═══════════════════════════════════════════════════════

window.TOPIC_COMPUTE = (function() {

const META = {
  id: 'compute',
  label: 'App Hosting & Compute',
  icon: '⚙️',
  desc: 'App Service, Functions, serverless, workflow automation — right hosting for every workload',
  clouds: ['azure','aws','gcp'],
  views: ['tree','gallery','compare'],
  heroTitle: 'Which App Hosting service fits your workload?',
  heroSub: 'Web apps · Serverless functions · Static sites · Workflows · Containers',
  chips: {
    azure: ['🌐 App Service','⚡ Azure Functions','📄 Static Web Apps','🔗 Logic Apps','📦 Container Apps','🔌 API Management'],
    aws:   ['🌐 Elastic Beanstalk','⚡ Lambda','📄 Amplify','🔗 Step Functions','📦 App Runner','🔌 API Gateway'],
    gcp:   ['🌐 App Engine','⚡ Cloud Functions','📄 Firebase Hosting','🔗 Workflows','📦 Cloud Run','🔌 Apigee'],
  },
};

// ── SVG HELPERS ──
function B(x,y,w,h,lb,sb,col,rx=9){
  const F={blue:'#ebf4fc',teal:'#e0f7fa',green:'#e8f5e8',amber:'#fff8ed',red:'#fce8e9',gray:'#f3f7fb',purple:'#f3e8fd',indigo:'#eef0fb',orange:'#fff3e0',pink:'#fce8f3'};
  const S={blue:'#0078d4',teal:'#00b4d8',green:'#107c10',amber:'#e07000',red:'#a4262c',gray:'#a0b8cc',purple:'#7b2fbe',indigo:'#4b5ae4',orange:'#e65100',pink:'#c2185b'};
  const TX={blue:'#004578',teal:'#006478',green:'#0a5007',amber:'#5a3000',red:'#6b0c0e',gray:'#3a5068',purple:'#4a1580',indigo:'#1e2580',orange:'#4e1f00',pink:'#6a0030'};
  const f=F[col]||F.blue,s=S[col]||S.blue,t=TX[col]||TX.blue;
  const cy=sb?y+h/2-7:y+h/2;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width="1.5"/>
<text x="${x+w/2}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="'DM Sans',sans-serif" font-size="14" font-weight="600" fill="${t}">${lb}</text>
${sb?`<text x="${x+w/2}" y="${y+h/2+11}" text-anchor="middle" dominant-baseline="central" font-family="'DM Sans',sans-serif" font-size="12" fill="${t}" opacity=".8">${sb}</text>`:''}`;}

function A(x1,y1,x2,y2,col='#0078d4'){
  const id='ma'+Math.abs(x1*3+y1*7+x2*11+y2*17);
  return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round"/></marker></defs>
<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="2" class="fa" marker-end="url(#${id})"/>`;}

function N(x,y,t){return `<text x="${x}" y="${y}" font-family="'DM Sans',sans-serif" font-size="13" fill="#6a8ba4">${t}</text>`;}
function L(x,y,t,c='#6a8ba4'){return `<text x="${x}" y="${y}" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="11.5" fill="${c}">${t}</text>`;}
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
// App Service / Beanstalk / App Engine — browser window
const BROWSER = `<rect x="14" y="18" width="44" height="36" rx="5" fill="white" opacity=".92"/>
<rect x="14" y="18" width="44" height="10" rx="5" fill="rgba(255,255,255,0.5)"/>
<rect x="14" y="23" width="44" height="5" fill="rgba(255,255,255,0.5)"/>
<circle cx="21" cy="23" r="2.5" fill="rgba(0,0,0,.18)"/>
<circle cx="28" cy="23" r="2.5" fill="rgba(0,0,0,.14)"/>
<rect x="33" y="20.5" width="22" height="5" rx="2.5" fill="rgba(0,0,0,.12)"/>
<rect x="18" y="32" width="36" height="3" rx="1.5" fill="rgba(0,0,0,.15)"/>
<rect x="18" y="39" width="28" height="3" rx="1.5" fill="rgba(0,0,0,.12)"/>
<rect x="18" y="46" width="20" height="3" rx="1.5" fill="rgba(0,0,0,.10)"/>`;

// Functions / Lambda / Cloud Functions — lightning bolt
const BOLT = `<path d="M42 14 L26 38 L36 38 L30 58 L50 32 L40 32 Z" fill="white" opacity=".95"/>`;

// Static Web Apps / Amplify / Firebase Hosting — HTML file
const STATICPAGE = `<path d="M20 14 L20 58 Q20 61 23 61 L49 61 Q52 61 52 58 L52 26 L40 14Z" fill="white" opacity=".9"/>
<path d="M40 14 L40 26 L52 26" fill="none" stroke="rgba(0,0,0,.15)" stroke-width="1.5" stroke-linejoin="round"/>
<rect x="26" y="34" width="20" height="3" rx="1.5" fill="rgba(0,0,0,.18)"/>
<rect x="26" y="41" width="16" height="3" rx="1.5" fill="rgba(0,0,0,.14)"/>
<text x="36" y="25" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(0,0,0,.3)" font-weight="700">&lt;/&gt;</text>`;

// Logic Apps / Step Functions / Workflows — flowchart
const FLOW = `<rect x="24" y="14" width="24" height="12" rx="4" fill="white" opacity=".9"/>
<line x1="36" y1="26" x2="36" y2="32" stroke="white" stroke-width="2.2" opacity=".8"/>
<path d="M24 32 L36 44 L48 32Z" fill="white" opacity=".85"/>
<line x1="36" y1="44" x2="36" y2="50" stroke="white" stroke-width="2.2" opacity=".7"/>
<rect x="24" y="50" width="24" height="10" rx="4" fill="white" opacity=".75"/>`;

// Container Apps / App Runner / Cloud Run — container/cube
const CONTAINER = `<path d="M36 14 L52 23 L52 41 L36 50 L20 41 L20 23Z" fill="white" opacity=".9"/>
<path d="M36 14 L36 50" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<path d="M20 23 L52 23" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<path d="M36 50 L52 41" stroke="rgba(0,0,0,.12)" stroke-width="1.2"/>`;

// API Management / API Gateway / Apigee — plug/connector
const APIGATE = `<rect x="20" y="18" width="32" height="20" rx="4" fill="white" opacity=".9"/>
<rect x="27" y="12" width="5" height="8" rx="2.5" fill="white" opacity=".85"/>
<rect x="40" y="12" width="5" height="8" rx="2.5" fill="white" opacity=".85"/>
<path d="M20 38 L20 48 Q20 56 28 56 L44 56 Q52 56 52 48 L52 38Z" fill="white" opacity=".72"/>
<circle cx="36" cy="46" r="4" fill="rgba(0,0,0,.18)"/>`;

// EventBridge / Event Grid — broadcast waves
const EVENTBUS = `<circle cx="36" cy="36" r="8" fill="white" opacity=".9"/>
<path d="M20 36 Q20 24 36 22" fill="none" stroke="white" stroke-width="2.2" opacity=".7" stroke-linecap="round"/>
<path d="M52 36 Q52 24 36 22" fill="none" stroke="white" stroke-width="2.2" opacity=".7" stroke-linecap="round"/>
<path d="M14 36 Q14 18 36 15" fill="none" stroke="white" stroke-width="2" opacity=".5" stroke-linecap="round"/>
<path d="M58 36 Q58 18 36 15" fill="none" stroke="white" stroke-width="2" opacity=".5" stroke-linecap="round"/>
<line x1="36" y1="44" x2="24" y2="56" stroke="white" stroke-width="2" opacity=".7" stroke-linecap="round"/>
<line x1="36" y1="44" x2="36" y2="58" stroke="white" stroke-width="2" opacity=".65" stroke-linecap="round"/>
<line x1="36" y1="44" x2="48" y2="56" stroke="white" stroke-width="2" opacity=".7" stroke-linecap="round"/>`;

const ICONS = {
  // ── AZURE ──
  'azure_appservice':  gi('azAppSvc',  '#004578','#0078d4', BROWSER),
  'azure_functions':   gi('azFn',      '#5c0080','#9333ea', BOLT),
  'azure_staticweb':   gi('azStatic',  '#003060','#0050b3', STATICPAGE),
  'azure_logicapps':   gi('azLogic',   '#0a5c8a','#0ea5e9', FLOW),
  'azure_containerapps':gi('azCA',     '#004578','#0284c7', CONTAINER),
  'azure_apim':        gi('azAPIM2',   '#4a0080','#7c3aed', APIGATE),
  // ── AWS ──
  'aws_beanstalk':     gi('awsEB',     '#7a4200','#e07000', BROWSER),
  'aws_lambda':        gi('awsLambda', '#6a3800','#d47000', BOLT),
  'aws_amplify':       gi('awsAmplify','#6b2080','#a855f7', STATICPAGE),
  'aws_stepfunctions': gi('awsStep',   '#0a5c8a','#0284c7', FLOW),
  'aws_apprunner':     gi('awsAR',     '#7a4200','#c26000', CONTAINER),
  'aws_apigateway':    gi('awsAPIG',   '#7a2000','#b45309', APIGATE),
  'aws_eventbridge':   gi('awsEB2',    '#1a5080','#2563eb', EVENTBUS),
  // ── GCP ──
  'gcp_appengine':     gi('gcpAE',     '#0d3b8c','#2878e8', BROWSER),
  'gcp_functions':     gi('gcpFn',     '#0d4060','#0891b2', BOLT),
  'gcp_firebase':      gi('gcpFB',     '#7a3000','#ea580c', STATICPAGE),
  'gcp_workflows':     gi('gcpWF',     '#0d3b8c','#1565c0', FLOW),
  'gcp_cloudrun':      gi('gcpCR',     '#0d3b8c','#1a73e8', CONTAINER),
  'gcp_apigee':        gi('gcpApigee', '#0d4060','#0369a1', APIGATE),
};

// ── DIAGRAMS ──
const DIAG = {
  // AZURE
  azure_appservice: ()=>SVG(`
${B(20,55,110,44,'Internet','Browser / Client','gray')}
${A(130,77,210,77,'#0078d4')}
${B(210,38,185,110,'Azure App Service','PaaS · Web/API/Mobile','blue')}
${B(420,22,170,40,'Deployment Slots','staging → swap → prod','teal',7)}
${B(420,68,170,40,'Auto-scale','Scale out / up rules','green',7)}
${B(420,114,170,40,'VNet Integration','Private backend access','blue',7)}
${A(590,42,665,55,'#107c10')}
${A(590,88,665,88,'#107c10')}
${A(590,134,665,120,'#107c10')}
${B(665,38,95,40,'SQL / Cosmos','Backend DB','gray',7)}
${B(665,78,95,40,'Storage / Cache','','gray',7)}
${B(665,110,95,40,'Key Vault / AI','','gray',7)}
${N(20,210,'Node · .NET · Python · Java · PHP · Ruby · Docker · up to 14-day deployment slots')}`,225),

  azure_functions: ()=>SVG(`
${B(20,50,120,40,'Trigger','HTTP · Timer · Event · Queue','gray')}
${A(140,70,220,100,'#9333ea')}
${B(220,65,180,90,'Azure Functions','Serverless · Event-driven','purple')}
${B(425,28,155,38,'Consumption plan','Pay-per-execution','green',7)}
${B(425,72,155,38,'Premium plan','Pre-warmed · VNet','purple',7)}
${B(425,116,155,38,'Dedicated plan','App Service plan','blue',7)}
${A(580,47,650,65,'#107c10')}
${A(580,91,650,100,'#107c10')}
${A(580,135,650,135,'#107c10')}
${B(650,50,110,38,'Blob / Queue','Output binding','gray',7)}
${B(650,86,110,38,'Cosmos DB','','gray',7)}
${B(650,122,110,38,'Service Bus','','gray',7)}
${N(20,210,'Durable Functions · Bindings (in + out) · 400K GB-s/month free · Cold start on Consumption')}`,225),

  azure_staticweb: ()=>SVG(`
${B(20,80,110,44,'Browser','Global users','gray')}
${A(130,102,215,102,'#0050b3')}
${B(215,60,185,90,'Static Web Apps','CDN + API + Auth + CI/CD','blue')}
${A(400,80,475,65,'#0078d4')}
${A(400,102,475,108,'#00b4d8')}
${B(475,48,175,40,'Azure CDN Edge','Static assets (HTML/JS/CSS)','teal',7)}
${B(475,94,175,40,'Functions API','Managed serverless backend','purple',7)}
${B(475,140,175,40,'GitHub / ADO CI/CD','Auto-deploy on push','green',7)}
${N(20,210,'Free tier available · GitHub Actions built-in · Auth providers · Custom domains · Preview envs')}`,225),

  azure_logicapps: ()=>SVG(`
${B(20,80,110,44,'Trigger','HTTP · Schedule · Event','gray')}
${A(130,102,212,102,'#0ea5e9')}
${B(212,55,175,96,'Logic App','Low-code workflow','teal')}
${A(387,78,462,65,'#0ea5e9')}
${A(387,102,462,105,'#0ea5e9')}
${A(387,125,462,140,'#0ea5e9')}
${B(462,48,175,40,'400+ Connectors','Salesforce · SAP · Office 365','green',7)}
${B(462,92,175,40,'Condition / Loop','Built-in control flow','blue',7)}
${B(462,134,175,40,'Service Bus / Event Hub','Enterprise messaging','amber',7)}
${N(20,210,'Standard (single-tenant VNet) · Consumption (multi-tenant) · 400+ connectors · SOAP/REST/EDI')}`,225),

  azure_containerapps: ()=>SVG(`
${B(20,75,115,44,'Internet / VNet','HTTP or event trigger','gray')}
${A(135,97,215,97,'#0284c7')}
${B(215,55,185,90,'Container Apps','Managed Kubernetes · KEDA','blue')}
${A(400,75,475,58,'#107c10')}
${A(400,97,475,97,'#107c10')}
${A(400,120,475,137,'#107c10')}
${B(475,40,180,40,'Revision-based deploy','Blue-green · canary','green',7)}
${B(475,86,180,40,'KEDA auto-scale','HTTP · queue · custom','teal',7)}
${B(475,128,180,40,'Dapr integration','Service mesh sidecar','purple',7)}
${N(20,210,'No Kubernetes knowledge needed · Microservices · Scale to zero · Internal/external ingress')}`,225),

  azure_apim: ()=>SVG(`
${B(20,80,115,44,'API Clients','Web · Mobile · B2B','gray')}
${A(135,102,218,102,'#7c3aed')}
${B(218,58,175,90,'API Management','Gateway · Auth · Rate limit','purple')}
${A(393,80,468,63,'#7c3aed')}
${A(393,102,468,102,'#7c3aed')}
${A(393,124,468,140,'#7c3aed')}
${B(468,46,185,40,'Backend API 1','App Service / Function','blue',7)}
${B(468,88,185,40,'Backend API 2','AKS / Container App','blue',7)}
${B(468,128,185,40,'Backend API 3','Logic App / External','amber',7)}
${N(20,210,'JWT/OAuth2 · Rate limiting · Caching · Analytics · Dev portal · Multi-region gateway')}`,225),

  // AWS
  aws_beanstalk: ()=>SVG(`
${B(20,55,110,44,'Internet','Browser / Client','gray')}
${A(130,77,212,77,'#e07000')}
${B(212,38,190,110,'Elastic Beanstalk','PaaS · Managed runtime','amber')}
${B(425,22,170,40,'Environment Tiers','Web server / Worker','green',7)}
${B(425,68,170,40,'Managed updates','OS patches, platform','teal',7)}
${B(425,114,170,40,'Blue/Green deploy','Swap environment URLs','amber',7)}
${A(595,42,665,55,'#107c10')}
${A(595,88,665,88,'#107c10')}
${A(595,134,665,122,'#107c10')}
${B(665,38,95,40,'RDS / Aurora','','gray',7)}
${B(665,78,95,40,'S3 / ElastiCache','','gray',7)}
${B(665,110,95,40,'SQS / SNS','','gray',7)}
${N(20,210,'Node · .NET · Python · Java · PHP · Ruby · Go · Docker · Auto-scales EC2 under the hood')}`,225),

  aws_lambda: ()=>SVG(`
${B(20,50,120,40,'Trigger','API GW · S3 · SQS · EventBridge','gray')}
${A(140,70,220,100,'#d47000')}
${B(220,65,180,90,'AWS Lambda','Serverless · Event-driven','amber')}
${B(425,28,155,38,'Provisioned Concurrency','No cold start','green',7)}
${B(425,72,155,38,'Lambda URLs','Direct HTTPS endpoint','teal',7)}
${B(425,116,155,38,'Layers','Shared dependencies','amber',7)}
${A(580,47,650,65,'#107c10')}
${A(580,91,650,100,'#107c10')}
${A(580,135,650,135,'#107c10')}
${B(650,50,110,38,'DynamoDB / RDS','','gray',7)}
${B(650,86,110,38,'S3 / SQS','','gray',7)}
${B(650,122,110,38,'SNS / EventBridge','','gray',7)}
${N(20,210,'15 min max · 10 GB RAM · 1M requests/month free · Cold start 100ms–1s (Python/Node fastest)')}`,225),

  aws_amplify: ()=>SVG(`
${B(20,80,110,44,'Browser','Global users','gray')}
${A(130,102,215,102,'#a855f7')}
${B(215,60,185,90,'AWS Amplify','CDN + CI/CD + Auth + API','purple')}
${A(400,80,475,65,'#e07000')}
${A(400,102,475,108,'#6a3800')}
${B(475,48,175,40,'CloudFront CDN','Static assets worldwide','teal',7)}
${B(475,94,175,40,'Lambda / AppSync','Serverless backend','amber',7)}
${B(475,140,175,40,'GitHub CI/CD','Deploy on every push','green',7)}
${N(20,210,'Free tier · Cognito auth · GraphQL/REST · Feature flags · PR preview environments')}`,225),

  aws_stepfunctions: ()=>SVG(`
${B(20,80,115,44,'Trigger','API · EventBridge · Lambda','gray')}
${A(135,102,215,102,'#0284c7')}
${B(215,55,180,96,'Step Functions','State machine · Orchestration','blue')}
${A(395,78,472,62,'#0284c7')}
${A(395,102,472,102,'#0284c7')}
${A(395,126,472,140,'#0284c7')}
${B(472,44,180,40,'Express / Standard','Different durability','green',7)}
${B(472,88,180,40,'SDK integrations','S3 · DynamoDB · 220+ APIs','teal',7)}
${B(472,130,180,40,'Parallel / Map states','Fan-out orchestration','amber',7)}
${N(20,210,'Visual workflow designer · Error handling · Retry logic · Human approval steps · Distributed sagas')}`,225),

  aws_apprunner: ()=>SVG(`
${B(20,75,115,44,'Internet','HTTPS traffic','gray')}
${A(135,97,215,97,'#c26000')}
${B(215,55,185,90,'App Runner','Container PaaS · Auto-scale','amber')}
${A(400,72,475,58,'#107c10')}
${A(400,97,475,97,'#107c10')}
${A(400,122,475,135,'#107c10')}
${B(475,40,180,40,'Source: ECR / GitHub','Auto-build + deploy','green',7)}
${B(475,84,180,40,'Auto-scale','0 → N containers','teal',7)}
${B(475,124,180,40,'VPC Connector','Private resource access','blue',7)}
${N(20,210,'No ECS/Kubernetes knowledge · HTTPS auto-provisioned · Observability built-in · Pay per second')}`,225),

  aws_apigateway: ()=>SVG(`
${B(20,80,115,44,'API Clients','Web · Mobile · B2B','gray')}
${A(135,102,218,102,'#b45309')}
${B(218,58,175,90,'API Gateway','REST · HTTP · WebSocket','amber')}
${A(393,80,468,63,'#b45309')}
${A(393,102,468,102,'#b45309')}
${A(393,124,468,140,'#b45309')}
${B(468,46,185,40,'Lambda integration','Serverless backend','amber',7)}
${B(468,88,185,40,'HTTP proxy','Any HTTP backend','blue',7)}
${B(468,128,185,40,'WAF · Throttling · Auth','Edge protection','green',7)}
${N(20,210,'REST API · HTTP API (50% cheaper) · WebSocket API · Caching · Usage plans · VPC Link')}`,225),

  aws_eventbridge: ()=>SVG(`
${B(20,68,120,40,'Event Sources','SaaS · AWS Services · Custom','gray')}
${A(140,88,218,110,'#2563eb')}
${B(218,78,178,68,'EventBridge','Serverless event bus','blue')}
${A(396,90,472,72,'#2563eb')}
${A(396,104,472,104,'#2563eb')}
${A(396,118,472,136,'#2563eb')}
${B(472,54,175,40,'Lambda / Step Fn','Event consumer','amber',7)}
${B(472,98,175,40,'SQS / SNS','Queue or fan-out','green',7)}
${B(472,138,175,40,'100+ SaaS sources','Salesforce · Zendesk…','teal',7)}
${N(20,205,'Content-based routing · Schema registry · Replay · Archive · Pipes (source→target)')}`,218),

  // GCP
  gcp_appengine: ()=>SVG(`
${B(20,55,110,44,'Internet','Browser / Client','gray')}
${A(130,77,212,77,'#2878e8')}
${B(212,38,190,110,'App Engine','PaaS · Standard / Flexible','blue')}
${B(425,22,170,40,'Standard env','Fast scale · free tier','green',7)}
${B(425,68,170,40,'Flexible env','Custom runtimes · VMs','teal',7)}
${B(425,114,170,40,'Traffic splitting','A/B · canary versions','blue',7)}
${A(595,42,665,55,'#107c10')}
${A(595,88,665,88,'#107c10')}
${A(595,134,665,122,'#107c10')}
${B(665,38,95,40,'Cloud SQL','','gray',7)}
${B(665,78,95,40,'Cloud Storage','','gray',7)}
${B(665,110,95,40,'Memorystore','','gray',7)}
${N(20,210,'Node · Python · Java · Go · PHP · Ruby · .NET · Scale to zero (Standard) · Free daily quota')}`,225),

  gcp_functions: ()=>SVG(`
${B(20,50,120,40,'Trigger','HTTP · Pub/Sub · Eventarc · Storage','gray')}
${A(140,70,220,100,'#0891b2')}
${B(220,65,180,90,'Cloud Functions','Serverless · Event-driven','teal')}
${B(425,28,155,38,'Gen 2 (Cloud Run)','Longer timeout · VPC','green',7)}
${B(425,72,155,38,'Gen 1','Legacy · simpler','blue',7)}
${B(425,116,155,38,'Concurrency (Gen 2)','Multiple req per instance','teal',7)}
${A(580,47,650,65,'#107c10')}
${A(580,91,650,100,'#107c10')}
${A(580,135,650,135,'#107c10')}
${B(650,50,110,38,'Firestore / BigQuery','','gray',7)}
${B(650,86,110,38,'Cloud Storage','','gray',7)}
${B(650,122,110,38,'Pub/Sub · Eventarc','','gray',7)}
${N(20,210,'2M invocations/month free · Gen 2 is Cloud Run under the hood · 60 min timeout · No cold start opt')}`,225),

  gcp_firebase: ()=>SVG(`
${B(20,80,110,44,'Browser','Global users','gray')}
${A(130,102,215,102,'#ea580c')}
${B(215,60,185,90,'Firebase Hosting','CDN + CI/CD + Auth','orange')}
${A(400,80,475,65,'#ea580c')}
${A(400,102,475,108,'#0891b2')}
${B(475,48,175,40,'Global CDN','Static assets worldwide','teal',7)}
${B(475,94,175,40,'Cloud Functions / Run','Dynamic backend','blue',7)}
${B(475,140,175,40,'GitHub CI/CD','Deploy on push','green',7)}
${N(20,210,'Free tier · Firebase Auth · Firestore · Preview channels per PR · Custom domains · SSL auto')}`,225),

  gcp_workflows: ()=>SVG(`
${B(20,80,115,44,'Trigger','HTTP · Cloud Scheduler · Eventarc','gray')}
${A(135,102,215,102,'#1565c0')}
${B(215,55,180,96,'Cloud Workflows','Serverless orchestration','blue')}
${A(395,78,472,62,'#1565c0')}
${A(395,102,472,102,'#1565c0')}
${A(395,126,472,140,'#1565c0')}
${B(472,44,180,40,'HTTP steps','Call any REST API','green',7)}
${B(472,88,180,40,'Connectors','GCP service shortcuts','teal',7)}
${B(472,130,180,40,'Parallel branches','Fan-out execution','blue',7)}
${N(20,210,'YAML/JSON syntax · 5000 steps · Retry + error handling · Sub-workflows · Audit logging')}`,225),

  gcp_cloudrun: ()=>SVG(`
${B(20,75,115,44,'Internet / Eventarc','HTTP or event trigger','gray')}
${A(135,97,215,97,'#1a73e8')}
${B(215,55,185,90,'Cloud Run','Managed containers · Serverless','blue')}
${A(400,72,475,58,'#107c10')}
${A(400,97,475,97,'#107c10')}
${A(400,122,475,135,'#107c10')}
${B(475,40,180,40,'Any container image','From Artifact Registry','green',7)}
${B(475,84,180,40,'Scale 0 → N','Per-request billing','teal',7)}
${B(475,124,180,40,'VPC / Sidecar / GPU','Cloud Run Jobs','purple',7)}
${N(20,210,'Scale to zero · Concurrency up to 1000 req/instance · gRPC · WebSocket · Cloud Run Jobs')}`,225),

  gcp_apigee: ()=>SVG(`
${B(20,80,115,44,'API Clients','Web · Mobile · Partners','gray')}
${A(135,102,218,102,'#0369a1')}
${B(218,58,175,90,'Apigee API Platform','Enterprise API gateway','blue')}
${A(393,80,468,63,'#0369a1')}
${A(393,102,468,102,'#0369a1')}
${A(393,124,468,140,'#0369a1')}
${B(468,46,185,40,'Analytics & Monetisation','API revenue & reporting','teal',7)}
${B(468,88,185,40,'Rate limit / OAuth / JWT','Security policies','green',7)}
${B(468,128,185,40,'Backend: GKE / Run / ext.','Any HTTP backend','blue',7)}
${N(20,210,'Enterprise-grade · Hybrid deployment · Developer portal · Microgateway · 100+ policy steps')}`,225),
};

// ── SERVICE CATALOGUE ──
const SVC = {
  // ── AZURE ──
  azure_appservice: {
    cl:'azure',ic:'🌐',nm:'Azure App Service',
    tl:'PaaS · Web/API/Mobile · .NET · Node · Python · Java · Docker',
    tg:['PaaS','Web/API','Multi-runtime'],
    ds:'Fully managed PaaS for web apps, RESTful APIs, and mobile backends. Supports multiple runtimes and Windows/Linux. Built-in CI/CD, autoscaling, and deployment slots.',
    dk:'azure_appservice',
    ft:['Deployment slots (blue-green · staging)','Built-in autoscale (CPU/mem/schedule)','VNet Integration (private backends)','Custom domains + managed TLS','CI/CD: GitHub Actions · Azure DevOps','Hybrid connections (on-prem)','App Service Plan shared across apps','Diagnostic logging + App Insights'],
    uw:['Web frontends and REST APIs','Lift-and-shift web apps to PaaS','APIs fronting SQL / Cosmos / AI','Mobile backends (Easy Auth)','Apps needing deployment slot swaps'],
    nf:'Serverless event-driven (use Functions), containerised microservices (use Container Apps).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/app-service/'
  },
  azure_functions: {
    cl:'azure',ic:'⚡',nm:'Azure Functions',
    tl:'Serverless · Event-driven · Consumption / Premium / Dedicated',
    tg:['Serverless','Event-driven','Bindings'],
    ds:'Serverless compute triggered by HTTP, timers, queues, Cosmos DB, Event Hubs, and more. Rich input/output bindings eliminate boilerplate. Durable Functions adds stateful orchestration.',
    dk:'azure_functions',
    ft:['12+ trigger types (HTTP · Queue · Timer · Blob · Event Hub)','Input/output bindings (no SDK boilerplate)','Durable Functions (stateful orchestration)','Consumption plan (scale to 0 · pay-per-exec)','Premium plan (pre-warmed · VNet · no cold start)','Flex Consumption plan (new · VNet + scale-to-0)','400K GB-s free/month','Deployment via zip · container · Bicep'],
    uw:['Event-driven background processing','HTTP APIs at low/variable traffic','Data transformation pipelines','Scheduled jobs (Timer trigger)','Fan-out / fan-in with Durable Functions'],
    nf:'Long-running apps (use App Service), complex multi-step orchestration (use Logic Apps).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/azure-functions/'
  },
  azure_staticweb: {
    cl:'azure',ic:'📄',nm:'Azure Static Web Apps',
    tl:'Static hosting · CDN · Managed Functions API · GitHub CI/CD',
    tg:['Static hosting','CDN','Serverless API'],
    ds:'Fully managed hosting for static frontends (React, Vue, Angular, Blazor) with an integrated serverless API backend (Azure Functions) and automatic GitHub/ADO CI/CD.',
    dk:'azure_staticweb',
    ft:['Global CDN distribution','Integrated Azure Functions API','GitHub Actions / ADO auto-deploy','Pull request preview environments','Built-in auth (AAD · GitHub · Twitter · Google)','Custom domains + free TLS','Staging environments','Free tier available'],
    uw:['React · Vue · Angular · Blazor SPAs','Jamstack architectures','Docs sites and marketing pages','Apps with serverless API backend','Dev teams using GitHub for CI/CD'],
    nf:'Server-rendered apps (use App Service), complex APIs (use App Service + Functions separately).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/static-web-apps/'
  },
  azure_logicapps: {
    cl:'azure',ic:'🔗',nm:'Azure Logic Apps',
    tl:'Low-code workflow automation · 400+ connectors · Enterprise integration',
    tg:['Workflow','Low-code','400+ connectors'],
    ds:'Low-code workflow automation platform with 400+ built-in connectors. Consumption plan is multi-tenant pay-per-action; Standard plan is single-tenant with VNet and stateful/stateless workflows.',
    dk:'azure_logicapps',
    ft:['400+ connectors (Salesforce · SAP · ServiceNow · Office 365)','Consumption (serverless) + Standard (dedicated VNet)','Stateful and stateless workflows','Built-in EDI, B2B, and AS2/X12','Retry and error handling policies','Visual designer (portal + VS Code)','Integration with Service Bus / Event Hub','On-premises connector via data gateway'],
    uw:['Business process automation','Enterprise application integration (EAI)','B2B EDI workflows (AS2 / X12 / EDIFACT)','Approval and notification workflows','Data sync between SaaS systems'],
    nf:'High-volume compute (use Functions), custom code logic (use Functions or App Service).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/logic-apps/'
  },
  azure_containerapps: {
    cl:'azure',ic:'📦',nm:'Azure Container Apps',
    tl:'Managed Kubernetes · KEDA · Dapr · Scale to zero',
    tg:['Containers','Serverless','Microservices'],
    ds:'Managed environment for containerised microservices and APIs. Powered by Kubernetes and KEDA under the hood — no K8s expertise needed. Scale to zero, Dapr sidecar, and revision-based deployments.',
    dk:'azure_containerapps',
    ft:['Scale to zero (HTTP and event-driven)','KEDA autoscaling (HTTP · queue · custom)','Dapr integration (service mesh)','Revision-based blue-green / canary','Internal and external ingress','VNet integration (private)','Managed certificates + custom domains','Jobs for batch workloads'],
    uw:['Containerised microservices','Event-driven workers (scale from 0)','Background processing jobs','APIs needing canary/A-B releases','Teams graduating from Functions to containers'],
    nf:'Full Kubernetes control (use AKS), simple web app PaaS (use App Service).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/container-apps/'
  },
  azure_apim: {
    cl:'azure',ic:'🔌',nm:'Azure API Management',
    tl:'Enterprise API gateway · Auth · Rate limit · Dev portal · Multi-region',
    tg:['API gateway','Enterprise','Multi-region'],
    ds:'Comprehensive API management platform for publishing, securing, throttling, and monitoring APIs. Multi-region deployment, developer portal, and deep analytics.',
    dk:'azure_apim',
    ft:['JWT / OAuth2 / mTLS validation','Rate limiting and quotas','Response caching','API versioning and revisions','Developer portal (self-service)','Multi-region deployment','Synthetic GraphQL','Analytics and monitoring'],
    uw:['Publishing APIs to external partners','API monetisation and subscriptions','Securing multiple backend APIs centrally','Federated API gateway (multi-backend)','Regulatory API governance'],
    nf:'Single-API simple proxy (use App Service), serverless (use Functions with HTTP trigger).',
    nt:null,
    doc:'https://learn.microsoft.com/en-us/azure/api-management/'
  },
  // ── AWS ──
  aws_beanstalk: {
    cl:'aws',ic:'🌐',nm:'AWS Elastic Beanstalk',
    tl:'PaaS · Web server / Worker · Auto-manages EC2 · Multi-runtime',
    tg:['PaaS','Web/API','Multi-runtime'],
    ds:'PaaS that automatically handles capacity, load balancing, auto-scaling, and monitoring. You upload your code; Beanstalk provisions EC2, ALB, and Auto Scaling Groups.',
    dk:'aws_beanstalk',
    ft:['Managed EC2 · ALB · ASG provisioning','Blue/Green via swap environment URL','Rolling, immutable, and traffic-splitting deploys','Worker tier (SQS-backed background jobs)','Managed platform updates','Docker single/multi-container','Saved configurations','CloudWatch + X-Ray integration'],
    uw:['Lift-and-shift web apps to AWS PaaS','Teams wanting PaaS without Dockerfile','Web + worker tier combo workloads','Quick prototyping with auto-infra'],
    nf:'Granular EC2 control (use EC2/ECS), serverless (use Lambda), containers (use App Runner/ECS).',
    nt:'💡 Elastic Beanstalk is free — you pay only for the underlying EC2/RDS/ALB resources.',
    doc:'https://docs.aws.amazon.com/elastic-beanstalk/'
  },
  aws_lambda: {
    cl:'aws',ic:'⚡',nm:'AWS Lambda',
    tl:'Serverless · Event-driven · 15 min max · 10 GB RAM · 1M free/month',
    tg:['Serverless','Event-driven','Pay-per-use'],
    ds:'Event-driven serverless compute. Triggers from 200+ AWS services. Provisioned Concurrency eliminates cold starts. Lambda URLs provide a direct HTTPS endpoint without API Gateway.',
    dk:'aws_lambda',
    ft:['200+ event source triggers','Provisioned Concurrency (no cold start)','Lambda URLs (HTTPS endpoint)','Layers (shared libraries)','Container image support (up to 10 GB)','SnapStart (Java fast init)','Function URLs with streaming','1M requests/month + 400K GB-s free'],
    uw:['Event-driven backends (S3 · SQS · DynamoDB)','REST APIs behind API Gateway','Scheduled jobs (EventBridge cron)','Real-time file processing','Glue code between AWS services'],
    nf:'Long-running >15 min (use ECS/Fargate), stateful orchestration (use Step Functions).',
    nt:null,
    doc:'https://docs.aws.amazon.com/lambda/'
  },
  aws_amplify: {
    cl:'aws',ic:'📄',nm:'AWS Amplify',
    tl:'Full-stack hosting · CDN · Auth · API · CI/CD · Frontend-first',
    tg:['Static hosting','Full-stack','CDN'],
    ds:'Full-stack development platform for web and mobile apps. Amplify Hosting serves static assets via CloudFront. Amplify Studio provides visual UI builder with Figma integration.',
    dk:'aws_amplify',
    ft:['CloudFront CDN for static assets','GitHub / GitLab / Bitbucket CI/CD','PR preview environments','Cognito auth (social + enterprise)','AppSync GraphQL or REST backend','Feature flags','Amplify Studio (visual builder)','Free tier available'],
    uw:['React · Vue · Angular · Next.js SPAs','Jamstack and static sites','Mobile app backends (iOS · Android)','Full-stack apps without infra knowledge','Teams using GitHub for deployments'],
    nf:'Complex server-rendered backends (use Elastic Beanstalk/ECS), enterprise API mgmt (use API Gateway).',
    nt:null,
    doc:'https://docs.aws.amazon.com/amplify/'
  },
  aws_stepfunctions: {
    cl:'aws',ic:'🔗',nm:'AWS Step Functions',
    tl:'Serverless state machine · Visual workflow · 220+ SDK integrations',
    tg:['Workflow','Orchestration','State machine'],
    ds:'Visual state machine workflow service. Standard workflows for long-running durable workflows; Express workflows for high-volume short-duration. SDK integrations call 220+ AWS services directly without Lambda.',
    dk:'aws_stepfunctions',
    ft:['Visual Workflow Studio (drag-and-drop)','Standard workflows (up to 1 year)','Express workflows (high throughput)','220+ SDK service integrations','Parallel and Map states','Error handling with retry/catch','Human approval via API Gateway','Distributed sagas pattern'],
    uw:['Microservice orchestration','Order fulfilment / approval workflows','ETL pipelines','Human-in-the-loop workflows','Saga pattern for distributed transactions'],
    nf:'Simple event routing (use EventBridge), low-code 400+ connectors (use no-code tools).',
    nt:null,
    doc:'https://docs.aws.amazon.com/step-functions/'
  },
  aws_apprunner: {
    cl:'aws',ic:'📦',nm:'AWS App Runner',
    tl:'Container PaaS · Auto-scale · HTTPS auto · No ECS/K8s knowledge',
    tg:['Containers','PaaS','Auto-scale'],
    ds:'Fully managed container service. Point at an ECR image or GitHub repo; App Runner builds, deploys, scales, and load-balances automatically.',
    dk:'aws_apprunner',
    ft:['Source from ECR or GitHub','Auto-build and deploy on push','Automatic HTTPS provisioning','Scale 0 → N containers','VPC Connector (private resources)','Health checks built-in','Observability: CloudWatch + X-Ray','Pay per second of compute'],
    uw:['Containerised web apps without ECS/K8s','Microservices with simple HTTP interface','Teams new to containers on AWS','APIs needing fast auto-scale'],
    nf:'Full container orchestration (use ECS/EKS), serverless functions (use Lambda).',
    nt:null,
    doc:'https://docs.aws.amazon.com/apprunner/'
  },
  aws_apigateway: {
    cl:'aws',ic:'🔌',nm:'Amazon API Gateway',
    tl:'REST · HTTP · WebSocket APIs · Lambda proxy · Throttling · Auth',
    tg:['API gateway','REST/HTTP/WS','Managed'],
    ds:'Fully managed API gateway for REST, HTTP, and WebSocket APIs. HTTP API is 70% cheaper than REST API for most use cases. Integrates natively with Lambda, HTTP backends, and VPC Link.',
    dk:'aws_apigateway',
    ft:['REST API · HTTP API · WebSocket API','Lambda proxy integration (native)','Cognito and JWT authorisers','API keys and usage plans','Request/response transformation','VPC Link (private backends)','Caching (REST API only)','Custom domain names + ACM'],
    uw:['Lambda-backed REST APIs','WebSocket real-time APIs','API key management and throttling','Proxy to any HTTP backend','Protecting microservices with auth'],
    nf:'Enterprise API governance (use Apigee equivalent — use AWS API Gateway + WAF), SaaS connectors (use EventBridge).',
    nt:'💡 HTTP API is simpler and 70% cheaper than REST API — use REST API only if you need usage plans, caching, or request transformation.',
    doc:'https://docs.aws.amazon.com/apigateway/'
  },
  aws_eventbridge: {
    cl:'aws',ic:'🔗',nm:'Amazon EventBridge',
    tl:'Serverless event bus · 100+ SaaS sources · Content-based routing',
    tg:['Event bus','Serverless','SaaS integration'],
    ds:'Serverless event bus connecting AWS services, custom apps, and 100+ SaaS providers. Content-based filtering rules route events to Lambda, SQS, Step Functions, and more.',
    dk:'aws_eventbridge',
    ft:['100+ SaaS event sources (Salesforce · Zendesk · Stripe)','Content-based filtering rules','Schema registry and discovery','Archive and replay events','EventBridge Pipes (source → enrichment → target)','Scheduler (cron + rate)','Cross-account / cross-region','Dead-letter queues'],
    uw:['Decoupling microservices','SaaS event integration (Salesforce triggers Lambda)','Scheduled tasks (Scheduler)','Cross-account event routing','Audit and compliance event streaming'],
    nf:'Message queuing (use SQS), fan-out pub-sub (use SNS), long-running workflows (use Step Functions).',
    nt:null,
    doc:'https://docs.aws.amazon.com/eventbridge/'
  },
  // ── GCP ──
  gcp_appengine: {
    cl:'gcp',ic:'🌐',nm:'Google App Engine',
    tl:'PaaS · Standard / Flexible · Scale to zero · Free daily quota',
    tg:['PaaS','Web/API','Multi-runtime'],
    ds:'GCPs original PaaS. Standard environment scales to zero in seconds with a free daily quota. Flexible environment runs custom runtimes on managed VMs (no scale-to-zero).',
    dk:'gcp_appengine',
    ft:['Standard env: scale to 0 · free quota','Flexible env: custom Docker runtimes','Traffic splitting (A/B · canary)','Versions with gradual rollout','Managed SSL and custom domains','Cron jobs and task queues','IAP integration (identity-aware)','Cloud SQL Proxy built-in'],
    uw:['Web apps with variable/spiky traffic','Migrating App Engine legacy apps','APIs with free-tier requirements','Teams wanting GCP PaaS without containers'],
    nf:'New containerised projects (use Cloud Run), complex microservices (use GKE).',
    nt:'💡 For new projects, Cloud Run is generally preferred over App Engine — more flexible and same pricing model.',
    doc:'https://cloud.google.com/appengine/docs'
  },
  gcp_functions: {
    cl:'gcp',ic:'⚡',nm:'Cloud Functions',
    tl:'Serverless · Event-driven · Gen 2 (Cloud Run) · Eventarc triggers',
    tg:['Serverless','Event-driven','Eventarc'],
    ds:'Serverless functions triggered by HTTP, Pub/Sub, Eventarc, Cloud Storage, Firestore, and more. Gen 2 runs on Cloud Run infrastructure — longer timeouts, concurrency, and VPC.',
    dk:'gcp_functions',
    ft:['Gen 2: 60 min timeout · concurrency · VPC','Gen 1: simpler legacy (deprecated path)','Eventarc triggers (100+ Google event types)','Pub/Sub and Cloud Storage triggers','2M invocations/month free','Node · Python · Go · Java · .NET · Ruby · PHP','Min instances (avoid cold start)','Cloud Run under Gen 2'],
    uw:['Pub/Sub message processing','HTTP webhooks and lightweight APIs','Cloud Storage event reactions','Firestore triggers','Lightweight ETL on GCP'],
    nf:'Long-running tasks (use Cloud Run Jobs), complex orchestration (use Workflows), containers (use Cloud Run).',
    nt:null,
    doc:'https://cloud.google.com/functions/docs'
  },
  gcp_firebase: {
    cl:'gcp',ic:'📄',nm:'Firebase Hosting',
    tl:'Static hosting · Global CDN · Preview channels · Auth · Firestore',
    tg:['Static hosting','CDN','Firebase'],
    ds:'Production-grade hosting for web apps and static content. Global CDN, automatic SSL, and preview channels per branch. Deeply integrated with Firebase Auth, Firestore, and Cloud Functions.',
    dk:'gcp_firebase',
    ft:['Global CDN distribution','Automatic SSL (free)','Preview channels (per PR/branch)','GitHub Actions CI/CD','Firebase Auth (Google · Email · Phone · SAML)','Custom domains','Rewrites to Cloud Functions/Run','Free tier (10 GB storage · 360 MB/day)'],
    uw:['React · Vue · Angular · Flutter Web SPAs','Firebase-first app frontends','Mobile companion web portals','Jamstack with Firestore backend','Teams already using Firebase SDK'],
    nf:'Server-rendered apps (use App Engine or Cloud Run), enterprise API management (use Apigee).',
    nt:null,
    doc:'https://firebase.google.com/docs/hosting'
  },
  gcp_workflows: {
    cl:'gcp',ic:'🔗',nm:'Cloud Workflows',
    tl:'Serverless orchestration · HTTP steps · Connectors · Parallel branches',
    tg:['Workflow','Orchestration','Serverless'],
    ds:'Fully managed serverless workflow orchestration. Define steps in YAML/JSON to call HTTP APIs, GCP services, and run parallel branches. Built-in retry, error handling, and audit logging.',
    dk:'gcp_workflows',
    ft:['HTTP step calls (any REST API)','GCP service connectors (shortcuts)','Parallel branches (fan-out/fan-in)','Sub-workflows (reusable steps)','Up to 5000 steps per workflow','Retry and error handling policies','Eventarc and Cloud Scheduler triggers','Audit logs (Cloud Logging)'],
    uw:['Multi-step API orchestration on GCP','ETL pipeline coordination','Approval and notification sequences','Parallel data processing jobs','Microservice saga coordination'],
    nf:'Low-code no-code (use AppSheet/Looker Studio), complex business rules (use custom service + Cloud Run).',
    nt:null,
    doc:'https://cloud.google.com/workflows/docs'
  },
  gcp_cloudrun: {
    cl:'gcp',ic:'📦',nm:'Cloud Run',
    tl:'Managed containers · Scale to zero · Any language · gRPC · Jobs',
    tg:['Containers','Serverless','Scale to zero'],
    ds:'Fully managed serverless container platform. Run any containerised workload. Scale to zero, pay per request. Cloud Run Jobs for batch workloads. GPU support for AI/ML inference.',
    dk:'gcp_cloudrun',
    ft:['Scale to zero (per-request billing)','Up to 1000 concurrent requests/instance','gRPC · WebSocket · HTTP/2','VPC egress + ingress controls','Cloud Run Jobs (batch/scheduled)','GPU support (NVIDIA L4/A100)','Sidecar containers','Artifact Registry integration'],
    uw:['Containerised web APIs and microservices','ML model serving (with GPU)','Event-driven containers (Eventarc/Pub/Sub)','Batch jobs (Cloud Run Jobs)','Teams graduating from Functions to containers'],
    nf:'Full Kubernetes control (use GKE), PaaS without containers (use App Engine).',
    nt:null,
    doc:'https://cloud.google.com/run/docs'
  },
  gcp_apigee: {
    cl:'gcp',ic:'🔌',nm:'Apigee API Platform',
    tl:'Enterprise API gateway · Analytics · Monetisation · Hybrid · Dev portal',
    tg:['API gateway','Enterprise','Hybrid'],
    ds:'Google\'s enterprise API management platform. Full lifecycle API management with analytics, monetisation, developer portal, and hybrid/multi-cloud deployment via Apigee hybrid.',
    dk:'gcp_apigee',
    ft:['100+ policy steps (transform · validate · route)','OAuth2 · JWT · SAML · mTLS security','API analytics and monetisation','Developer portal (self-service)','Apigee hybrid (on-prem + GCP)','Microgateway for lightweight deploy','Traffic management and caching','Multi-environment promotion'],
    uw:['Enterprise API programme with partner/dev ecosystem','API monetisation and subscription management','Regulatory API governance','Hybrid on-prem + cloud API exposure','Large-scale API analytics'],
    nf:'Simple Lambda/function proxy (use Cloud Endpoints), internal microservice mesh (use Traffic Director).',
    nt:'💡 Cloud Endpoints is a lightweight alternative for simpler API management on GCP without full Apigee.',
    doc:'https://cloud.google.com/apigee/docs'
  },
};

// ── DECISION TREES ──
const TREE = {
  azure: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What best describes what you are building?',
      h:'PaaS hosts traditional web/API apps. Serverless runs code only on events. Static hosting serves pre-built HTML/JS/CSS. Workflow automation connects apps without code.',
      two:false,
      opts:[
        {ic:'🌐',lb:'Web app or REST API',ds:'HTTP server running continuously — Node, .NET, Python, Java',cr:'Web/API app',nx:'q2_web'},
        {ic:'⚡',lb:'Event-driven or serverless function',ds:'Code triggered by HTTP, queues, timers, events — no idle cost',cr:'Serverless',nx:'R_functions'},
        {ic:'📄',lb:'Static website / SPA / Jamstack',ds:'Pre-built HTML + JS — React, Vue, Angular, Blazor',cr:'Static site',nx:'R_staticweb'},
        {ic:'🔗',lb:'Workflow / integration / automation',ds:'Connect apps and services with little or no code',cr:'Workflow',nx:'R_logicapps'},
      ]},
    nodes: {
      q2_web: {id:'q2_web',ey:'Step 2 of 4',q:'Do you want to manage containers or use a runtime PaaS?',
        h:'App Service manages runtimes for you (Node, .NET, Python…). Container Apps lets you bring your own Docker image and scale to zero.',
        two:true,
        opts:[
          {ic:'☁️',lb:'Runtime PaaS — no Docker required',ds:'Pick a language runtime; Azure manages OS/patching',cr:'Runtime PaaS',nx:'R_appservice'},
          {ic:'📦',lb:'Container-based — bring your own image',ds:'Docker image; KEDA auto-scale; Dapr sidecar; scale to 0',cr:'Containers',nx:'R_containerapps'},
        ]},
    },
    results: {
      R_appservice:    {k:'azure_appservice',   w:'Azure App Service is the right PaaS for web apps and REST APIs. Supports .NET, Node, Python, Java, PHP, and Docker on Windows/Linux. Built-in deployment slots for blue-green, autoscaling, VNet integration, and CI/CD.'},
      R_functions:     {k:'azure_functions',    w:'Azure Functions is ideal for event-driven serverless workloads. Triggered by HTTP, queues, timers, Blob events, and more. Consumption plan scales to zero; Premium adds VNet and pre-warmed instances. Durable Functions handles stateful orchestration.'},
      R_staticweb:     {k:'azure_staticweb',    w:'Azure Static Web Apps is purpose-built for SPAs and Jamstack. It globally distributes your built HTML/JS/CSS via CDN, provides an integrated Azure Functions API backend, and auto-deploys from GitHub or Azure DevOps on every push.'},
      R_logicapps:     {k:'azure_logicapps',    w:'Azure Logic Apps is the right choice for workflow automation and integration. With 400+ connectors (Salesforce, SAP, Office 365, Service Bus), you can automate business processes visually. Standard plan adds VNet and stateful/stateless workflows.'},
      R_containerapps: {k:'azure_containerapps',w:'Azure Container Apps runs containerised workloads without managing Kubernetes. KEDA autoscaling handles HTTP and event-driven scale-to-zero, Dapr provides service mesh, and revision-based deployments enable canary rollouts.'},
    },
  },
  aws: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What best describes what you are building?',
      h:'PaaS for traditional apps, Lambda for serverless, Amplify for static/SPAs, Step Functions for workflow orchestration.',
      two:false,
      opts:[
        {ic:'🌐',lb:'Web app or REST API',ds:'HTTP server — Node, Python, Java, .NET, Ruby, Go, Docker',cr:'Web/API app',nx:'q2_web'},
        {ic:'⚡',lb:'Event-driven or serverless function',ds:'Code triggered by events — S3, SQS, API Gateway, EventBridge',cr:'Serverless',nx:'R_lambda'},
        {ic:'📄',lb:'Static website / SPA / Jamstack',ds:'Pre-built HTML + JS — React, Vue, Angular, Next.js',cr:'Static site',nx:'R_amplify'},
        {ic:'🔗',lb:'Workflow / orchestration / automation',ds:'Coordinate multiple services and APIs in a state machine',cr:'Workflow',nx:'R_stepfunctions'},
      ]},
    nodes: {
      q2_web: {id:'q2_web',ey:'Step 2 of 4',q:'Do you want a managed runtime or container PaaS?',
        h:'Elastic Beanstalk manages EC2 runtimes for you. App Runner builds and runs containers automatically without ECS or Kubernetes knowledge.',
        two:true,
        opts:[
          {ic:'☁️',lb:'Runtime PaaS — no container needed',ds:'Elastic Beanstalk: manages EC2, ALB, ASG for you',cr:'Runtime PaaS',nx:'R_beanstalk'},
          {ic:'📦',lb:'Container-based — bring your Docker image',ds:'App Runner: build from ECR/GitHub, auto-scale, auto-HTTPS',cr:'Containers',nx:'R_apprunner'},
        ]},
    },
    results: {
      R_beanstalk:     {k:'aws_beanstalk',     w:'AWS Elastic Beanstalk manages the underlying EC2, ALB, and Auto Scaling for your web app. Upload your code in Node, Python, Java, .NET, PHP, Ruby, or Docker; Beanstalk provisions and scales the infrastructure automatically.'},
      R_lambda:        {k:'aws_lambda',        w:'AWS Lambda is the right serverless choice. Triggered by 200+ AWS services — S3, SQS, DynamoDB, API Gateway, EventBridge. Provisioned Concurrency eliminates cold starts. Lambda URLs provide a direct HTTPS endpoint without API Gateway.'},
      R_amplify:       {k:'aws_amplify',       w:'AWS Amplify Hosting is purpose-built for SPAs and Jamstack. It distributes static assets via CloudFront, auto-deploys from GitHub/GitLab on every push, and provides PR preview environments. Amplify Studio adds visual UI building with Figma integration.'},
      R_stepfunctions: {k:'aws_stepfunctions', w:'AWS Step Functions orchestrates multi-step workflows as visual state machines. Standard workflows run up to 1 year; Express workflows handle high-volume short-duration tasks. 220+ SDK integrations let you call AWS services directly without Lambda.'},
      R_apprunner:     {k:'aws_apprunner',     w:'AWS App Runner runs containerised apps without ECS or Kubernetes knowledge. Point at an ECR image or GitHub repo; App Runner builds, deploys, and auto-scales. HTTPS is provisioned automatically and you pay per second of compute.'},
    },
  },
  gcp: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What best describes what you are building?',
      h:'App Engine for PaaS, Cloud Functions for serverless, Firebase Hosting for static, Workflows for orchestration, Cloud Run for containers.',
      two:false,
      opts:[
        {ic:'🌐',lb:'Web app or REST API',ds:'HTTP server — Node, Python, Java, Go, .NET, Ruby, PHP',cr:'Web/API app',nx:'q2_web'},
        {ic:'⚡',lb:'Event-driven or serverless function',ds:'Code triggered by Pub/Sub, HTTP, Eventarc, Storage',cr:'Serverless',nx:'R_functions'},
        {ic:'📄',lb:'Static website / SPA / Jamstack',ds:'Pre-built HTML + JS — React, Vue, Angular, Flutter Web',cr:'Static site',nx:'R_firebase'},
        {ic:'🔗',lb:'Workflow / orchestration / automation',ds:'Coordinate GCP services and HTTP APIs in YAML steps',cr:'Workflow',nx:'R_workflows'},
      ]},
    nodes: {
      q2_web: {id:'q2_web',ey:'Step 2 of 4',q:'Do you prefer PaaS runtime or container-based hosting?',
        h:'App Engine manages runtimes (no Docker needed). Cloud Run is containerised, scales to zero, and supports gRPC/WebSocket.',
        two:true,
        opts:[
          {ic:'☁️',lb:'Runtime PaaS — no Docker required',ds:'App Engine: managed runtime, scale to zero, free quota',cr:'Runtime PaaS',nx:'R_appengine'},
          {ic:'📦',lb:'Container-based — bring your image',ds:'Cloud Run: any container, scale to zero, per-request billing',cr:'Containers',nx:'R_cloudrun'},
        ]},
    },
    results: {
      R_appengine: {k:'gcp_appengine',  w:'Google App Engine is GCPs PaaS. Standard environment scales to zero with a free daily quota — ideal for variable-traffic apps. Flexible environment runs custom Docker runtimes on managed VMs. Traffic splitting enables gradual version rollouts.'},
      R_functions: {k:'gcp_functions',  w:'Cloud Functions is GCPs serverless compute. Gen 2 runs on Cloud Run infrastructure — longer timeouts (60 min), per-instance concurrency, and VPC access. Triggered by Pub/Sub, Eventarc, HTTP, Cloud Storage, and Firestore events. 2M invocations/month free.'},
      R_firebase:  {k:'gcp_firebase',   w:'Firebase Hosting is purpose-built for web SPAs and static sites. Global CDN, automatic free SSL, and preview channels per branch. GitHub Actions CI/CD deploys on every push. Deeply integrated with Firebase Auth, Firestore, and Cloud Functions.'},
      R_workflows: {k:'gcp_workflows',  w:'Cloud Workflows orchestrates multi-step processes across GCP services and any HTTP API. Define steps in YAML/JSON, use built-in connectors for GCP services, run parallel branches, and handle errors with retry policies. Triggered by Eventarc or Cloud Scheduler.'},
      R_cloudrun:  {k:'gcp_cloudrun',   w:'Cloud Run is GCPs flagship container-as-a-service. Runs any containerised workload, scales to zero, and charges per request. Supports gRPC, WebSocket, HTTP/2, and GPU for ML inference. Cloud Run Jobs handle batch/scheduled workloads.'},
    },
  },
};

// ── COMPARE HTML ──
const COMPARE_HTML = `
<div style="margin-bottom:1.25rem">
  <h2 class="section-title">Cross-Cloud App Hosting Comparison</h2>
  <p class="section-sub">Equivalent app hosting, serverless, static, and workflow services across Azure, AWS, and GCP.</p>
</div>

<div class="cmp-wrap"><div class="cmp-head"><h3>PaaS Web App Hosting</h3><p>Managed runtimes — upload code, platform handles OS, scaling, networking</p></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Primary PaaS service</td><td>Azure App Service</td><td>Elastic Beanstalk</td><td>App Engine</td></tr>
<tr><td>Runtimes</td><td>.NET · Node · Python · Java · PHP · Ruby · Docker</td><td>Node · Python · Java · .NET · PHP · Ruby · Go · Docker</td><td>Node · Python · Java · Go · PHP · Ruby · .NET · Docker</td></tr>
<tr><td>Scale to zero</td><td>✗ (min 1 instance on Basic+)</td><td>✗ (min 1 EC2)</td><td>✓ Standard env only</td></tr>
<tr><td>Deployment slots / versions</td><td>✓ Up to 20 slots (Standard+)</td><td>✓ Swap environment URLs</td><td>✓ Traffic splitting across versions</td></tr>
<tr><td>VNet integration</td><td>✓ VNet Integration (Standard+)</td><td>✓ VPC (via ASG/ALB)</td><td>✓ VPC egress (Flexible env)</td></tr>
<tr><td>Free tier</td><td>F1 (shared, 60 min/day CPU)</td><td>Free EC2 t2.micro/t3.micro (1 yr)</td><td>Standard env: free daily quota</td></tr>
<tr><td>Managed TLS</td><td>✓ Managed + custom cert</td><td>✓ ACM (free)</td><td>✓ Managed + custom cert</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Serverless Functions</h3><p>Event-driven compute — pay per execution, scale to zero</p></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Primary service</td><td>Azure Functions</td><td>AWS Lambda</td><td>Cloud Functions</td></tr>
<tr><td>Max execution timeout</td><td>Unlimited (Premium/Dedicated) · 10 min (Consumption)</td><td>15 minutes</td><td>60 min (Gen 2) · 9 min (Gen 1)</td></tr>
<tr><td>Max memory</td><td>14 GB (Premium)</td><td>10 GB</td><td>32 GB (Gen 2)</td></tr>
<tr><td>Free tier</td><td>400K GB-s + 1M executions/month</td><td>400K GB-s + 1M requests/month</td><td>2M invocations/month + 400K GB-s</td></tr>
<tr><td>VNet access</td><td>✓ Premium plan / Flex Consumption</td><td>✓ VPC Lambda</td><td>✓ Gen 2 (VPC egress)</td></tr>
<tr><td>Cold start avoidance</td><td>Premium: pre-warmed instances</td><td>Provisioned Concurrency</td><td>Min instances setting</td></tr>
<tr><td>Stateful orchestration</td><td>✓ Durable Functions</td><td>✓ Step Functions</td><td>✓ Cloud Workflows</td></tr>
<tr><td>Container support</td><td>✓ Docker image deploy</td><td>✓ Container image (10 GB)</td><td>✓ Gen 2 = Cloud Run</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Static Site &amp; Frontend Hosting</h3><p>Pre-built HTML/JS/CSS — SPAs, Jamstack, docs sites</p></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Primary service</td><td>Azure Static Web Apps</td><td>AWS Amplify Hosting</td><td>Firebase Hosting</td></tr>
<tr><td>CDN</td><td>✓ Azure CDN built-in</td><td>✓ CloudFront built-in</td><td>✓ Google CDN built-in</td></tr>
<tr><td>Serverless API backend</td><td>✓ Integrated Azure Functions</td><td>✓ Lambda / AppSync</td><td>✓ Cloud Functions / Cloud Run</td></tr>
<tr><td>CI/CD source</td><td>GitHub · Azure DevOps</td><td>GitHub · GitLab · Bitbucket · CodeCommit</td><td>GitHub (Actions) · manual deploy</td></tr>
<tr><td>PR preview environments</td><td>✓ Built-in preview URLs</td><td>✓ Built-in preview URLs</td><td>✓ Preview channels</td></tr>
<tr><td>Auth providers</td><td>AAD · GitHub · Twitter · Google</td><td>Cognito (Google · FB · Apple · SAML)</td><td>Firebase Auth (Google · Email · Phone · SAML)</td></tr>
<tr><td>Free tier</td><td>✓ Free plan (100 GB bandwidth)</td><td>✓ Free tier (15 GB/month)</td><td>✓ Free (10 GB storage · 360 MB/day)</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Workflow Orchestration &amp; Integration</h3><p>Multi-step automation, state machines, low-code connectors</p></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Feature</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Primary service</td><td>Azure Logic Apps</td><td>AWS Step Functions</td><td>Cloud Workflows</td></tr>
<tr><td>No/low-code</td><td>✓ Visual designer (400+ connectors)</td><td>✗ Code/YAML (some visual)</td><td>✗ YAML definition</td></tr>
<tr><td>Code-first state machine</td><td>✓ Standard workflows (code)</td><td>✓ ASL JSON/YAML</td><td>✓ YAML/JSON steps</td></tr>
<tr><td>Max duration</td><td>Unlimited (Standard)</td><td>1 year (Standard) · 5 min (Express)</td><td>1 year</td></tr>
<tr><td>SaaS connectors</td><td>✓ 400+ (Salesforce · SAP · ServiceNow)</td><td>✓ 220+ SDK integrations</td><td>✓ HTTP steps + GCP connectors</td></tr>
<tr><td>Human approval steps</td><td>✓ Built-in approval actions</td><td>✓ Via API Gateway callback</td><td>✓ Via HTTP callback step</td></tr>
<tr><td>EDI / B2B</td><td>✓ AS2 · X12 · EDIFACT built-in</td><td>✗ (use B2B services separately)</td><td>✗</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Container PaaS &amp; API Gateway</h3></div>
<div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Category</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Container PaaS (no K8s)</td><td>Azure Container Apps</td><td>AWS App Runner</td><td>Cloud Run</td></tr>
<tr><td>Scale to zero</td><td>✓ KEDA-based</td><td>✓ (pauses after idle)</td><td>✓ Per-request billing</td></tr>
<tr><td>API Gateway</td><td>Azure API Management</td><td>Amazon API Gateway</td><td>Apigee / Cloud Endpoints</td></tr>
<tr><td>Enterprise API features</td><td>✓ (developer portal · monetisation)</td><td>Partial (usage plans · keys)</td><td>✓ Apigee (full enterprise)</td></tr>
<tr><td>Event bus</td><td>Azure Event Grid / Service Bus</td><td>Amazon EventBridge</td><td>Cloud Pub/Sub / Eventarc</td></tr>
</tbody></table></div></div>`;

return { META, ICONS, DIAG, SVC, TREE, COMPARE_HTML };
})();
