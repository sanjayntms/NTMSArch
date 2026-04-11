// ═══════════════════════════════════════════════════════
// TOPIC MODULE: Databases
// Azure: Azure SQL, Cosmos DB, MySQL, PostgreSQL, Maria DB, SQL MI
// AWS:   RDS (SQL Server/MySQL/PostgreSQL/MariaDB), Aurora, DynamoDB, DocumentDB, Keyspaces
// GCP:   Cloud SQL (MySQL/PostgreSQL/SQL Server), Spanner, Firestore, Bigtable (ref), AlloyDB
// ═══════════════════════════════════════════════════════

window.TOPIC_DB = (function() {

const META = {
  id: 'db',
  label: 'Databases',
  icon: '🗃️',
  desc: 'Relational, NoSQL, in-memory, globally distributed — pick the right engine',
  clouds: ['azure','aws','gcp'],
  views: ['tree','gallery','compare'],
  heroTitle: 'Which Cloud Database is right for your workload?',
  heroSub: 'SQL · NoSQL · NewSQL · Relational · Document · Wide-column · Graph',
  chips: {
    azure: ['🔷 Azure SQL DB','🌍 Cosmos DB','🐬 Azure MySQL','🐘 Azure PostgreSQL','🏢 SQL Managed Instance','🔴 Azure Cache for Redis'],
    aws:   ['🔷 RDS','⚡ Aurora','🌍 DynamoDB','📄 DocumentDB','🏎️ ElastiCache','🔵 Redshift'],
    gcp:   ['🔷 Cloud SQL','🌍 Spanner','📄 Firestore','🏎️ AlloyDB','⚡ Memorystore','🔵 BigQuery'],
  },
};

// ── SVG HELPERS ──
function B(x,y,w,h,lb,sb,col,rx=9){const F={blue:'#ebf4fc',teal:'#e0f7fa',green:'#e8f5e8',amber:'#fff8ed',red:'#fce8e9',gray:'#f3f7fb',purple:'#f3e8fd',indigo:'#eef0fb',orange:'#fff3e0'};const S={blue:'#0078d4',teal:'#00b4d8',green:'#107c10',amber:'#e07000',red:'#a4262c',gray:'#a0b8cc',purple:'#7b2fbe',indigo:'#4b5ae4',orange:'#e65100'};const TX={blue:'#004578',teal:'#006478',green:'#0a5007',amber:'#5a3000',red:'#6b0c0e',gray:'#3a5068',purple:'#4a1580',indigo:'#1e2580',orange:'#4e1f00'};const f=F[col]||F.blue,s=S[col]||S.blue,t=TX[col]||TX.blue;const cy=sb?y+h/2-7:y+h/2;return`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width="1.5"/><text x="${x+w/2}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="'DM Sans',sans-serif" font-size="14" font-weight="600" fill="${t}">${lb}</text>${sb?`<text x="${x+w/2}" y="${y+h/2+11}" text-anchor="middle" dominant-baseline="central" font-family="'DM Sans',sans-serif" font-size="12" fill="${t}" opacity=".8">${sb}</text>`:''}`;}
function A(x1,y1,x2,y2,col='#0078d4'){const id='m'+Math.abs(x1*3+y1*7+x2*11+y2*13);return`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round"/></marker></defs><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="2" class="fa" marker-end="url(#${id})"/>`;}
function N(x,y,t){return`<text x="${x}" y="${y}" font-family="'DM Sans',sans-serif" font-size="13" fill="#6a8ba4">${t}</text>`;}
function SVG(c,h=268){return`<svg viewBox="0 0 780 ${h}" xmlns="http://www.w3.org/2000/svg">${c}</svg>`;}

// ── GLOSSY ICON BUILDER ──
function gi(iid,bg1,bg2,shape){return`<svg width="80" height="80" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 6px 18px ${bg1}70)"><defs><radialGradient id="gb_${iid}" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="${bg2}"/><stop offset="100%" stop-color="${bg1}"/></radialGradient><radialGradient id="gs_${iid}" cx="42%" cy="18%" r="62%"><stop offset="0%" stop-color="rgba(255,255,255,0.62)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs><rect x="4" y="5" width="64" height="63" rx="16" fill="url(#gb_${iid})"/><rect x="4" y="5" width="64" height="35" rx="16" fill="url(#gs_${iid})" opacity="0.75"/><rect x="4" y="28" width="64" height="12" fill="url(#gs_${iid})" opacity="0.22"/>${shape}<rect x="4" y="5" width="64" height="63" rx="16" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/></svg>`;}

// Reusable SVG shapes for icons
const CYL = `<ellipse cx="36" cy="22" rx="17" ry="5.5" fill="rgba(255,255,255,0.35)"/><rect x="19" y="22" width="34" height="22" fill="rgba(255,255,255,0.85)"/><ellipse cx="36" cy="44" rx="17" ry="5.5" fill="white"/><ellipse cx="36" cy="22" rx="17" ry="5.5" fill="white"/>`;
const CYL2 = `<ellipse cx="36" cy="19" rx="17" ry="5" fill="rgba(255,255,255,0.35)"/><rect x="19" y="19" width="34" height="8" fill="rgba(255,255,255,0.85)"/><ellipse cx="36" cy="27" rx="17" ry="5" fill="white"/><ellipse cx="36" cy="19" rx="17" ry="5" fill="white"/><ellipse cx="36" cy="33" rx="17" ry="5" fill="rgba(255,255,255,0.35)"/><rect x="19" y="33" width="34" height="8" fill="rgba(255,255,255,0.85)"/><ellipse cx="36" cy="41" rx="17" ry="5" fill="white"/><ellipse cx="36" cy="33" rx="17" ry="5" fill="white"/>`;
const GLOBE = `<circle cx="36" cy="36" r="17" fill="none" stroke="white" stroke-width="2.5"/><ellipse cx="36" cy="36" rx="8.5" ry="17" fill="none" stroke="white" stroke-width="1.7" opacity=".6"/><line x1="19" y1="36" x2="53" y2="36" stroke="white" stroke-width="1.5" opacity=".55"/><line x1="21" y1="27" x2="51" y2="27" stroke="white" stroke-width="1.3" opacity=".42"/><line x1="21" y1="45" x2="51" y2="45" stroke="white" stroke-width="1.3" opacity=".42"/>`;
const DOC = `<path d="M20 16 L20 56 Q20 59 23 59 L49 59 Q52 59 52 56 L52 26 L42 16Z" fill="white" opacity=".9"/><path d="M42 16 L42 26 L52 26" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/><rect x="26" y="32" width="18" height="2.5" rx="1.2" fill="rgba(0,0,0,.2)"/><rect x="26" y="38" width="22" height="2.5" rx="1.2" fill="rgba(0,0,0,.2)"/><rect x="26" y="44" width="14" height="2.5" rx="1.2" fill="rgba(0,0,0,.2)"/>`;
const LIGHTNING = `<path d="M42-18 L28 4 L37 4 L30 22 L46-4 L37-4Z" fill="white" transform="translate(0,14)"/>`;
const TABLE = `<rect x="13" y="18" width="46" height="36" rx="4" fill="white" opacity=".92"/><line x1="13" y1="28" x2="59" y2="28" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/><line x1="13" y1="38" x2="59" y2="38" stroke="rgba(0,0,0,.12)" stroke-width="1.2"/><line x1="13" y1="48" x2="59" y2="48" stroke="rgba(0,0,0,.10)" stroke-width="1.2"/><line x1="30" y1="18" x2="30" y2="54" stroke="rgba(0,0,0,.12)" stroke-width="1.2"/>`;
const GRAPH = `<circle cx="36" cy="22" r="6" fill="white"/><circle cx="20" cy="42" r="5.5" fill="white" opacity=".9"/><circle cx="52" cy="42" r="5.5" fill="white" opacity=".9"/><circle cx="36" cy="52" r="5" fill="white" opacity=".8"/><line x1="36" y1="28" x2="22" y2="37" stroke="white" stroke-width="2.2" opacity=".8"/><line x1="36" y1="28" x2="50" y2="37" stroke="white" stroke-width="2.2" opacity=".8"/><line x1="24" y1="46" x2="33" y2="48" stroke="white" stroke-width="2" opacity=".65"/><line x1="48" y1="46" x2="39" y2="48" stroke="white" stroke-width="2" opacity=".65"/>`;
const CACHE = `<circle cx="36" cy="36" r="17" fill="white" opacity=".9"/><circle cx="36" cy="36" r="10" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="2.5"/><line x1="36" y1="19" x2="36" y2="26" stroke="rgba(0,0,0,.25)" stroke-width="2"/><line x1="36" y1="46" x2="36" y2="53" stroke="rgba(0,0,0,.25)" stroke-width="2"/><line x1="19" y1="36" x2="26" y2="36" stroke="rgba(0,0,0,.25)" stroke-width="2"/><line x1="46" y1="36" x2="53" y2="36" stroke="rgba(0,0,0,.25)" stroke-width="2"/><circle cx="36" cy="36" r="4" fill="rgba(0,0,0,.25)"/>`;

const ICONS = {
  // ── AZURE ──
  'azure_sql':        gi('azSQL',    '#004578','#0078d4', CYL),
  'azure_sqlmi':      gi('azSQLmi',  '#002855','#005a9e', CYL2),
  'azure_cosmos':     gi('azCosmos', '#003060','#0091da', GLOBE),
  'azure_mysql':      gi('azMySQL',  '#00694a','#00a86b', CYL),
  'azure_postgres':   gi('azPG',     '#2d3a8c','#4b5ae4', CYL),
  'azure_mariadb':    gi('azMaria',  '#5c0030','#a02050', CYL),
  'azure_redis':      gi('azRedis',  '#7a0000','#c0392b', CACHE),
  // ── AWS ──
  'aws_rds':          gi('awsRDS',   '#7a4200','#e07000', CYL),
  'aws_aurora':       gi('awsAur',   '#6a3800','#d47000', LIGHTNING),
  'aws_dynamodb':     gi('awsDyn',   '#1a4080','#2e6db4', TABLE),
  'aws_documentdb':   gi('awsDoc',   '#7a4200','#c06000', DOC),
  'aws_keyspaces':    gi('awsKeys',  '#5a4200','#9a7200', TABLE),
  'aws_elasticache':  gi('awsElC',   '#7a2000','#c03000', CACHE),
  'aws_redshift':     gi('awsRS',    '#1a2060','#2840a0', CYL),
  // ── GCP ──
  'gcp_cloudsql':     gi('gcpSQL',   '#0d3b8c','#2878e8', CYL),
  'gcp_spanner':      gi('gcpSpan',  '#0d4060','#0891b2', GLOBE),
  'gcp_firestore':    gi('gcpFS',    '#0d3b8c','#1a73e8', DOC),
  'gcp_alloydb':      gi('gcpAlloy', '#0a3060','#1060c0', LIGHTNING),
  'gcp_memorystore':  gi('gcpMem',   '#083060','#1050a0', CACHE),
  'gcp_bigtable':     gi('gcpBT2',   '#0d2f6e','#1a5cb0', TABLE),
  'gcp_bigquery':     gi('gcpBQ',    '#0a2850','#0d47a1', TABLE),
};

// ── DIAGRAMS ──
const DIAG = {
  // AZURE
  azure_sql: ()=>SVG(`${B(20,60,130,46,'App / Service','App Svc · AKS · VM','gray')}${A(150,83,228,83,'#0078d4')}${B(228,45,200,110,'Azure SQL Database','Managed PaaS · Serverless','blue')}${B(460,30,170,42,'Geo-Replication','Active + readable replicas','teal',7)}${B(460,78,170,42,'Auto-backups','7–35 day retention','green',7)}${B(460,126,170,42,'Elastic Pool','Share DTUs/vCores','blue',7)}${N(20,202,'vCore or DTU · Serverless · Always Encrypted · Defender for SQL · Up to 4 TB')}`,215),
  azure_sqlmi: ()=>SVG(`${B(20,60,130,46,'App / VM','Inside VNet','gray')}${A(150,83,228,83,'#004578')}${B(228,45,205,110,'SQL Managed Instance','Full SQL Server compat · VNet','blue')}${B(460,30,170,42,'SSRS / SSAS / SSIS','Full SQL Server features','teal',7)}${B(460,78,170,42,'VNet Injection','Private endpoint only','green',7)}${B(460,126,170,42,'AG / Failover Groups','HA + DR','blue',7)}${N(20,202,'100% compat with SQL Server · Lift-and-shift · CLR / SQL Agent / linked servers')}`,215),
  azure_cosmos: ()=>SVG(`${B(20,55,130,46,'App / SDK','Multi-region clients','gray')}${A(150,78,228,110,'#0091da')}${B(228,55,180,120,'Cosmos DB','Multi-model · Multi-master','blue')}${B(440,28,155,38,'SQL API','JSON documents','teal',7)}${B(440,70,155,38,'MongoDB API','Wire-compatible','green',7)}${B(440,112,155,38,'Cassandra API','CQL compatible','amber',7)}${B(440,154,155,38,'Gremlin / Table','Graph / KV','purple',7)}${B(615,55,140,120,'Global Region','Auto-replicated','blue')}${N(20,215,'<10ms p99 · 99.999% SLA · 5 consistency levels · Multi-write regions')}`,230),
  azure_mysql: ()=>SVG(`${B(20,60,130,46,'App / Service','LAMP · PHP · Python','gray')}${A(150,83,228,83,'#00a86b')}${B(228,45,195,110,'Azure DB for MySQL','Flexible Server','green')}${B(450,30,160,42,'Zone-redundant HA','Standby in diff zone','teal',7)}${B(450,78,160,42,'Read Replicas','Up to 5 · cross-region','green',7)}${B(450,126,160,42,'Auto-backup','1–35 day PITR','blue',7)}${N(20,202,'MySQL 5.7 / 8.0 · Flexible Server · Zone-redundant HA · 16 TB max storage')}`,215),
  azure_postgres: ()=>SVG(`${B(20,60,130,46,'App / Service','Django · Rails · Go','gray')}${A(150,83,228,83,'#4b5ae4')}${B(228,45,195,110,'Azure DB for PostgreSQL','Flexible Server','indigo')}${B(450,30,160,42,'Zone-redundant HA','Standby in diff zone','teal',7)}${B(450,78,160,42,'Read Replicas','Up to 5 · cross-region','green',7)}${B(450,126,160,42,'pgvector extension','AI embedding storage','purple',7)}${N(20,202,'PostgreSQL 11–16 · pgvector · Citus (Hyperscale) · 64 TB max storage')}`,215),
  azure_mariadb: ()=>SVG(`${B(20,70,130,46,'App / Service','LAMP stack','gray')}${A(150,93,228,93,'#a02050')}${B(228,55,195,90,'Azure DB for MariaDB','Managed MariaDB 10.2–10.6','red')}${B(450,45,160,42,'Zone-redundant HA','Auto failover','teal',7)}${B(450,95,160,42,'Read Replicas','Up to 5 replicas','green',7)}${N(20,185,'MariaDB 10.2–10.6 · General Purpose & Business Critical tiers · 16 TB')}`,200),
  azure_redis: ()=>SVG(`${B(20,70,120,46,'App / API','Cache-aside pattern','gray')}${A(140,93,225,93,'#c0392b')}${B(225,55,180,90,'Azure Cache for Redis','In-memory · Managed','red')}${A(405,78,475,63,'#107c10')}${A(405,100,475,115,'#107c10')}${B(475,45,180,42,'Cache Hit','< 1ms response','green',7)}${B(475,105,180,42,'Cache Miss → DB','Fallback to source','amber',7)}${N(20,185,'Redis 6/7 · Sub-ms latency · 120 GB max · Geo-replication · Enterprise tier')}`,200),
  // AWS
  aws_rds: ()=>SVG(`${B(20,60,130,46,'App / EC2 / Lambda','','gray')}${A(150,83,228,83,'#e07000')}${B(228,45,195,110,'Amazon RDS','Managed relational DB','amber')}${B(445,28,170,38,'MySQL 5.7 / 8.0','','green',7)}${B(445,70,170,38,'PostgreSQL 12–16','','indigo',7)}${B(445,112,170,38,'SQL Server · Oracle','','blue',7)}${B(445,154,170,38,'MariaDB · Db2','','amber',7)}${N(20,210,'Multi-AZ standby · 6 engine choices · Auto backups · Performance Insights')}`,225),
  aws_aurora: ()=>SVG(`${B(20,60,130,46,'App / Lambda','','gray')}${A(150,83,228,83,'#d47000')}${B(228,48,195,106,'Amazon Aurora','MySQL/PG compat · 5× faster','amber')}${B(445,30,165,40,'Aurora Serverless v2','Auto-scale compute','green',7)}${B(445,75,165,40,'Global Database','< 1s cross-region repl','teal',7)}${B(445,120,165,40,'6 copies · 3 AZs','Quorum-based storage','blue',7)}${N(20,202,'Shared distributed storage · 15 read replicas · < 30s failover · 128 TB max')}`,218),
  aws_dynamodb: ()=>SVG(`${B(20,65,130,46,'App / Lambda','SDK / REST','gray')}${A(150,88,228,88,'#2e6db4')}${B(228,48,195,106,'Amazon DynamoDB','Managed NoSQL · Serverless','blue')}${B(445,30,165,40,'On-demand capacity','Pay-per-request','green',7)}${B(445,75,165,40,'Global Tables','Multi-region replication','teal',7)}${B(445,120,165,40,'DynamoDB Streams','Change data capture','purple',7)}${N(20,202,'Single-digit ms · No server mgmt · DAX cache · PITR · 400 KB item max')}`,218),
  aws_documentdb: ()=>SVG(`${B(20,65,130,46,'App / Service','MongoDB driver','gray')}${A(150,88,228,88,'#c06000')}${B(228,48,195,106,'Amazon DocumentDB','MongoDB compat · Managed','amber')}${B(445,30,165,40,'MongoDB 3.6/4.0/5.0','Wire-compatible API','green',7)}${B(445,75,165,40,'Cluster storage','Distributed · auto-grow','teal',7)}${B(445,120,165,40,'15 read replicas','Scale reads','blue',7)}${N(20,202,'JSON docs · Not all MongoDB ops · 64 TB max · Multi-AZ · Change streams')}`,218),
  aws_keyspaces: ()=>SVG(`${B(20,65,130,46,'App / Service','Cassandra driver','gray')}${A(150,88,228,88,'#9a7200')}${B(228,48,195,106,'Amazon Keyspaces','Managed Cassandra','amber')}${B(445,35,165,40,'CQL compatible','Cassandra Query Lang','green',7)}${B(445,82,165,40,'Serverless scaling','On-demand throughput','teal',7)}${B(445,130,165,40,'Multi-region','Server-side encryption','blue',7)}${N(20,202,'Serverless · CQL · No cluster ops · PITR · Auto-scaling · 99.99% SLA')}`,218),
  aws_elasticache: ()=>SVG(`${B(20,70,120,46,'App / EC2','Cache-aside','gray')}${A(140,93,225,93,'#c03000')}${B(225,55,180,90,'Amazon ElastiCache','Redis or Memcached','red')}${A(405,78,475,63,'#107c10')}${A(405,100,475,115,'#107c10')}${B(475,45,180,42,'Cache Hit','Sub-ms response','green',7)}${B(475,105,180,42,'Cache Miss → DB','Fallback pattern','amber',7)}${N(20,185,'Redis 6/7 or Memcached · Cluster mode · Global datastore · < 1ms')}`,200),
  aws_redshift: ()=>SVG(`${B(20,65,120,46,'BI Tools / SQL','Tableau · QuickSight','gray')}${A(140,88,228,88,'#2840a0')}${B(228,48,195,106,'Amazon Redshift','Data warehouse · OLAP','blue')}${B(445,30,165,40,'RA3 nodes','Managed storage · S3','teal',7)}${B(445,78,165,40,'Redshift Spectrum','Query S3 directly','green',7)}${B(445,126,165,40,'Serverless','No cluster needed','purple',7)}${N(20,202,'Columnar storage · MPP · 128 nodes · Petabyte scale · Concurrency Scaling')}`,218),
  // GCP
  gcp_cloudsql: ()=>SVG(`${B(20,60,130,46,'App / GKE / Cloud Run','','gray')}${A(150,83,228,83,'#2878e8')}${B(228,45,195,110,'Cloud SQL','Managed MySQL / PG / SQL Server','blue')}${B(445,28,165,38,'MySQL 5.7 / 8.0','','green',7)}${B(445,70,165,38,'PostgreSQL 9.6–15','','indigo',7)}${B(445,112,165,38,'SQL Server 2017–2022','','blue',7)}${N(20,202,'Automated backups · HA (regional) · Read replicas · IAM auth · 64 TB max')}`,215),
  gcp_spanner: ()=>SVG(`${B(20,55,130,46,'App / SDK','Multi-region','gray')}${A(150,78,228,108,'#0891b2')}${B(228,55,185,110,'Cloud Spanner','NewSQL · Global · Relational','teal')}${B(440,28,165,40,'Multi-region repl','Synchronous · 5 nines','green',7)}${B(440,72,165,40,'External consistency','Serialisable isolation','teal',7)}${B(440,116,165,40,'Auto-sharding','Horizontal scale','blue',7)}${B(440,160,165,40,'SQL + ACID + Scaling','','purple',7)}${N(20,215,'Unlimited scale · ANSI SQL · 99.999% SLA · TrueTime API · PITR')}`,228),
  gcp_firestore: ()=>SVG(`${B(20,65,130,46,'App / Mobile','Firebase SDK','gray')}${A(150,88,228,88,'#1a73e8')}${B(228,48,195,106,'Cloud Firestore','NoSQL document DB','blue')}${B(445,30,165,40,'Native mode','Real-time sync','green',7)}${B(445,78,165,40,'Datastore mode','Legacy compat','teal',7)}${B(445,126,165,40,'Offline support','Mobile first','purple',7)}${N(20,202,'Sub-ms reads · Real-time listeners · ACID transactions · Multi-region · 1 MiB per doc')}`,218),
  gcp_alloydb: ()=>SVG(`${B(20,60,130,46,'App / GKE','PostgreSQL driver','gray')}${A(150,83,228,83,'#1060c0')}${B(228,45,195,110,'AlloyDB for PostgreSQL','PostgreSQL compat · AI-ready','blue')}${B(445,28,165,40,'4× faster than RDS PG','Benchmark','green',7)}${B(445,78,165,40,'Columnar engine','HTAP · analytics','teal',7)}${B(445,126,165,40,'ML embeddings','pgvector built-in','purple',7)}${N(20,202,'100% PostgreSQL compat · AI assistant (Gemini) · 99.99% SLA · PITR')}`,218),
  gcp_memorystore: ()=>SVG(`${B(20,70,120,46,'App / GKE','Cache-aside','gray')}${A(140,93,225,93,'#1050a0')}${B(225,55,180,90,'Memorystore','Redis or Memcached','blue')}${A(405,78,475,63,'#107c10')}${A(405,100,475,115,'#107c10')}${B(475,45,180,42,'Cache Hit','Sub-ms response','green',7)}${B(475,105,180,42,'Cache Miss → DB','Fallback pattern','amber',7)}${N(20,185,'Managed Redis 6/7 or Memcached · 300 GB · VPC-native · HA replica')}`,200),
  gcp_bigquery: ()=>SVG(`${B(20,65,120,46,'BI Tools / SQL','Looker · DataStudio','gray')}${A(140,88,228,88,'#0d47a1')}${B(228,48,195,106,'BigQuery','Serverless data warehouse','blue')}${B(445,30,165,40,'Columnar storage','Dremel engine · MPP','teal',7)}${B(445,78,165,40,'BigQuery ML','Train models in SQL','green',7)}${B(445,126,165,40,'Omni / Datastream','Multi-cloud · CDC','purple',7)}${N(20,202,'Petabyte scale · Serverless · 10 GB/s query throughput · BQML · BI Engine')}`,218),
};

// ── SERVICE CATALOGUE ──
const SVC = {
  // ── AZURE ──
  azure_sql: {
    cl:'azure',ic:'🔷',nm:'Azure SQL Database',tl:'Managed PaaS · Serverless · Hyperscale · Up to 4 TB',tg:['Relational','PaaS','SQL Server'],
    ds:'Fully managed cloud database built on SQL Server. Offers Serverless (auto-pause), Hyperscale (up to 100 TB), and Business Critical tiers. No OS/infra management.',
    dk:'azure_sql',
    ft:['Serverless (auto-pause/resume)','Hyperscale (up to 100 TB)','Always Encrypted at rest + in transit','Microsoft Defender for SQL','Geo-replication & failover groups','Elastic pools (shared resources)','vCore & DTU pricing models','Intelligent Query Processing'],
    uw:['New cloud-native SQL Server apps','SaaS with elastic workloads','Analytics on relational data','Lift-and-shift friendly workloads'],
    nf:'Full SQL Server features (CLR, SQL Agent, linked servers) — use SQL Managed Instance.',
    nt:null,doc:'https://learn.microsoft.com/en-us/azure/azure-sql/database/'
  },
  azure_sqlmi: {
    cl:'azure',ic:'🏢',nm:'Azure SQL Managed Instance',tl:'Full SQL Server compat · VNet · CLR · SQL Agent',tg:['Relational','SQL Server','Full compat'],
    ds:'Near-100% SQL Server compatible PaaS. Ideal for lift-and-shift migrations where you need CLR, SQL Agent, linked servers, or cross-database queries.',
    dk:'azure_sqlmi',
    ft:['SQL Server Agent jobs','CLR assemblies','Linked servers','Cross-database queries','SSRS / SSIS / SSAS','VNet injection (private)','Failover groups','Log Replay Service (migration)'],
    uw:['Lift-and-shift SQL Server migrations','Apps needing SQL Agent / CLR','Legacy enterprise databases','High compatibility requirement'],
    nf:'Simple cloud-native apps (use Azure SQL DB), non-SQL workloads.',
    nt:'💡 Use Database Migration Service (DMS) for near-zero-downtime migrations from on-premises SQL Server.',
    doc:'https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/'
  },
  azure_cosmos: {
    cl:'azure',ic:'🌍',nm:'Azure Cosmos DB',tl:'Multi-model · Multi-master · 5 APIs · <10ms p99 globally',tg:['NoSQL','Multi-model','Global'],
    ds:'Globally distributed, multi-model database. Supports SQL (JSON), MongoDB, Cassandra, Gremlin (graph), and Table APIs with configurable consistency levels.',
    dk:'azure_cosmos',
    ft:['5 APIs: SQL, MongoDB, Cassandra, Gremlin, Table','5 consistency levels','Multi-region writes (multi-master)','< 10ms p99 globally','99.999% availability SLA','Serverless or provisioned throughput','HTAP with Synapse Link','Automatic and instant scaling'],
    uw:['Global apps needing low latency everywhere','IoT telemetry at scale','Real-time personalization','Gaming leaderboards & profiles','Multi-model flexibility'],
    nf:'Relational/ACID transactions at scale (use Azure SQL), simple key-value (use Redis).',
    nt:null,doc:'https://learn.microsoft.com/en-us/azure/cosmos-db/'
  },
  azure_mysql: {
    cl:'azure',ic:'🐬',nm:'Azure Database for MySQL',tl:'Managed MySQL 5.7 / 8.0 · Flexible Server · Zone HA',tg:['Relational','MySQL','Managed'],
    ds:'Fully managed MySQL Flexible Server. Zone-redundant HA, read replicas, and built-in backup. Ideal for LAMP stack and web application backends.',
    dk:'azure_mysql',
    ft:['MySQL 5.7 & 8.0','Flexible Server architecture','Zone-redundant HA (standby)','Up to 5 read replicas','Point-in-time restore (1–35 days)','16 TB max storage','Slow query log & audit logs','Private endpoint support'],
    uw:['LAMP stack web apps','WordPress / Drupal / Magento','Django or Laravel backends','Migrating on-prem MySQL'],
    nf:'Complex stored procedures needing SQL Server compat (use Azure SQL), global distribution (use Cosmos DB).',
    nt:null,doc:'https://learn.microsoft.com/en-us/azure/mysql/'
  },
  azure_postgres: {
    cl:'azure',ic:'🐘',nm:'Azure Database for PostgreSQL',tl:'Managed PostgreSQL 11–16 · pgvector · Hyperscale Citus',tg:['Relational','PostgreSQL','Managed'],
    ds:'Fully managed PostgreSQL Flexible Server with extensions including pgvector for AI workloads. Citus extension enables horizontal sharding (Hyperscale).',
    dk:'azure_postgres',
    ft:['PostgreSQL 11, 12, 13, 14, 15, 16','pgvector for AI/embedding workloads','Citus (Hyperscale horizontal sharding)','Zone-redundant HA','Up to 5 read replicas','64 TB max storage','PostGIS · timescaledb','Private endpoint + VNet integration'],
    uw:['Django / Rails / Go backends','AI apps needing vector search (pgvector)','Geospatial workloads (PostGIS)','Migrating on-prem PostgreSQL'],
    nf:'OLAP/analytics at petabyte scale (use Synapse / Azure SQL Hyperscale).',
    nt:null,doc:'https://learn.microsoft.com/en-us/azure/postgresql/'
  },
  azure_mariadb: {
    cl:'azure',ic:'💎',nm:'Azure Database for MariaDB',tl:'Managed MariaDB 10.2–10.6 · MySQL compatible',tg:['Relational','MariaDB','Managed'],
    ds:'Managed MariaDB service for existing MariaDB workloads. MySQL-compatible with additional storage engines. Recommended for lift-and-shift only.',
    dk:'azure_mariadb',
    ft:['MariaDB 10.2, 10.3, 10.6','MySQL wire-compatible','Zone-redundant HA','Read replicas (up to 5)','PITR 1–35 days','16 TB max storage'],
    uw:['Existing MariaDB lift-and-shift','LAMP apps using MariaDB specific features'],
    nf:'New workloads — prefer Azure MySQL Flexible Server or Azure PostgreSQL.',
    nt:'⚠️ Azure Database for MariaDB is on a retirement path. New projects should use Azure MySQL or PostgreSQL.',
    doc:'https://learn.microsoft.com/en-us/azure/mariadb/'
  },
  azure_redis: {
    cl:'azure',ic:'🔴',nm:'Azure Cache for Redis',tl:'In-memory · Sub-ms · Redis 6/7 · Geo-replication',tg:['In-memory','Cache','Redis'],
    ds:'Managed Redis cache for session state, query results, and pub/sub. Enterprise tier adds Active Geo-Replication and RediSearch/RedisBloom modules.',
    dk:'azure_redis',
    ft:['Redis 6 & 7','Sub-millisecond latency','120 GB max (Enterprise)','Geo-replication (Enterprise)','RediSearch / RedisJSON (Enterprise)','VNet injection','TLS encryption','Pub/Sub & Streams'],
    uw:['Session state caching','Database query result cache','Rate limiting & leaderboards','Real-time pub/sub messaging'],
    nf:'Durable persistent storage (use Azure SQL/Cosmos DB), full-text search (use Cognitive Search).',
    nt:null,doc:'https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/'
  },
  // ── AWS ──
  aws_rds: {
    cl:'aws',ic:'🔷',nm:'Amazon RDS',tl:'Managed relational · MySQL · PostgreSQL · SQL Server · Oracle',tg:['Relational','Multi-engine','Managed'],
    ds:'Fully managed relational database service supporting MySQL, PostgreSQL, MariaDB, SQL Server, Oracle, and IBM Db2. Multi-AZ for HA, read replicas for scaling.',
    dk:'aws_rds',
    ft:['MySQL 5.7 / 8.0','PostgreSQL 11–16','SQL Server 2017–2022','Oracle 19c / 21c','MariaDB 10.x · IBM Db2','Multi-AZ standby (auto failover)','Read replicas (up to 15)','Performance Insights','RDS Proxy (connection pooling)'],
    uw:['Lift-and-shift relational databases','Web app OLTP backends','Multi-engine flexibility','SQL Server / Oracle on managed infra'],
    nf:'MySQL/PostgreSQL at extreme performance (use Aurora), serverless NoSQL (use DynamoDB).',
    nt:null,doc:'https://docs.aws.amazon.com/rds/'
  },
  aws_aurora: {
    cl:'aws',ic:'⚡',nm:'Amazon Aurora',tl:'MySQL/PG compatible · 5× faster · Serverless v2 · Global DB',tg:['Relational','High-perf','Serverless'],
    ds:'AWS-rebuilt relational database, MySQL and PostgreSQL-compatible. Distributed storage (6 copies across 3 AZs), Aurora Serverless v2 for auto-scaling, and Global Database for cross-region replication.',
    dk:'aws_aurora',
    ft:['MySQL & PostgreSQL compat','5× faster than MySQL, 3× than PG','Serverless v2 (instant auto-scale)','Global Database (< 1s cross-region)','6 copies across 3 AZs','15 low-latency read replicas','< 30 second failover','Backtrack (undo changes)','Aurora Machine Learning (Bedrock/SageMaker)'],
    uw:['High-throughput OLTP workloads','Multi-region active-active','Variable workloads (Serverless v2)','MySQL/PG migration needing more scale'],
    nf:'Legacy SQL Server / Oracle features (use RDS), simple small-scale MySQL (RDS MySQL is cheaper).',
    nt:null,doc:'https://docs.aws.amazon.com/aurora/'
  },
  aws_dynamodb: {
    cl:'aws',ic:'🌍',nm:'Amazon DynamoDB',tl:'Managed NoSQL · Serverless · Single-digit ms · Global Tables',tg:['NoSQL','Key-value','Serverless'],
    ds:'Fully managed, serverless key-value and document database. Single-digit millisecond performance at any scale. Global Tables for multi-region active-active replication.',
    dk:'aws_dynamodb',
    ft:['On-demand & provisioned capacity','Global Tables (multi-region)','DynamoDB Streams (CDC)','DAX (in-memory cache, microseconds)','PITR (35 days)','Transactions (ACID)','TTL for item expiry','PartiQL (SQL-compatible queries)'],
    uw:['Serverless web/mobile backends','Gaming (leaderboards, sessions)','IoT device state at scale','Shopping cart, user profiles','High-velocity event logging'],
    nf:'Complex joins / relational queries (use RDS/Aurora), full-text search (use OpenSearch).',
    nt:null,doc:'https://docs.aws.amazon.com/dynamodb/'
  },
  aws_documentdb: {
    cl:'aws',ic:'📄',nm:'Amazon DocumentDB',tl:'MongoDB-compatible · Managed · JSON documents',tg:['NoSQL','Document','MongoDB compat'],
    ds:'MongoDB-compatible document database. Separates compute from storage. Compatible with MongoDB 3.6, 4.0, and 5.0 drivers.',
    dk:'aws_documentdb',
    ft:['MongoDB 3.6 / 4.0 / 5.0 compat','JSON document storage','Distributed storage (auto-grow to 64 TB)','Up to 15 read replicas','Continuous backup & PITR','VPC-native (private)','TLS encryption in transit'],
    uw:['Existing MongoDB workloads on AWS','JSON document storage at scale','Content management systems','Catalog and inventory data'],
    nf:'Not fully MongoDB-compatible (check unsupported ops), real-time triggers (use DynamoDB Streams).',
    nt:'⚠️ Not all MongoDB operations are supported. Verify compatibility before migrating.',
    doc:'https://docs.aws.amazon.com/documentdb/'
  },
  aws_keyspaces: {
    cl:'aws',ic:'🔑',nm:'Amazon Keyspaces',tl:'Managed Cassandra · CQL · Serverless · No cluster ops',tg:['NoSQL','Cassandra','Wide-column'],
    ds:'Serverless, managed Apache Cassandra-compatible database. CQL-compatible. No cluster provisioning, auto-scales on demand.',
    dk:'aws_keyspaces',
    ft:['Apache Cassandra CQL compatible','Serverless (on-demand scaling)','99.99% SLA (multi-AZ)','Server-side encryption (KMS)','PITR (up to 35 days)','VPC endpoints','IAM-based access control'],
    uw:['Cassandra workload lift-and-shift','High-volume time-series data','IoT telemetry storage','Inventory tracking at scale'],
    nf:'Full Cassandra feature set (some ops unsupported), real-time analytics (use Redshift/Athena).',
    nt:null,doc:'https://docs.aws.amazon.com/keyspaces/'
  },
  aws_elasticache: {
    cl:'aws',ic:'🏎️',nm:'Amazon ElastiCache',tl:'Managed Redis / Memcached · Sub-ms · Cluster mode',tg:['In-memory','Cache','Redis / Memcached'],
    ds:'Managed in-memory caching with Redis or Memcached. Redis Cluster mode supports horizontal sharding. Global Datastore enables cross-region active-active Redis.',
    dk:'aws_elasticache',
    ft:['Redis 6 / 7 or Memcached','Cluster mode (horizontal sharding)','Global Datastore (multi-region)','Sub-millisecond latency','Encryption at rest + in transit','Auto failover (Redis)','IAM auth (Redis 7+)'],
    uw:['Database query caching','Session store','Real-time leaderboards','Pub/Sub with Redis'],
    nf:'Persistent primary storage (use DynamoDB/RDS), full-text search (use OpenSearch).',
    nt:null,doc:'https://docs.aws.amazon.com/elasticache/'
  },
  aws_redshift: {
    cl:'aws',ic:'🔵',nm:'Amazon Redshift',tl:'Data warehouse · Columnar · MPP · Serverless · Petabyte scale',tg:['Data warehouse','OLAP','Columnar'],
    ds:'Managed columnar data warehouse for OLAP analytics. Redshift Spectrum queries S3 directly. Serverless option removes cluster management.',
    dk:'aws_redshift',
    ft:['Columnar storage (Parquet-like)','Massively parallel processing (MPP)','Redshift Serverless','Spectrum (query S3 in-place)','RA3 nodes (managed storage)','Concurrency Scaling','Data sharing across clusters','ML (CREATE MODEL in SQL)'],
    uw:['Business intelligence & reporting','ETL pipeline destination','Historical analytics at petabyte scale','Unified data lakehouse query'],
    nf:'OLTP transactional workloads (use RDS/Aurora), real-time streaming (use Kinesis + Flink).',
    nt:null,doc:'https://docs.aws.amazon.com/redshift/'
  },
  // ── GCP ──
  gcp_cloudsql: {
    cl:'gcp',ic:'🔷',nm:'Cloud SQL',tl:'Managed MySQL / PostgreSQL / SQL Server · Regional HA',tg:['Relational','Multi-engine','Managed'],
    ds:'Fully managed relational database for MySQL, PostgreSQL, and SQL Server on GCP. Regional HA with automatic failover, read replicas, and IAM authentication.',
    dk:'gcp_cloudsql',
    ft:['MySQL 5.7 / 8.0','PostgreSQL 9.6–15','SQL Server 2017 / 2019 / 2022','Regional HA (auto failover)','Read replicas (cross-region)','IAM database authentication','Point-in-time recovery','64 TB max storage','Private IP (VPC-native)'],
    uw:['GCP-native web/app backends','Lift-and-shift MySQL/PG/MSSQL','Django / Rails / Spring on GKE','Standard relational workloads on GCP'],
    nf:'Horizontal scale beyond one instance (use Spanner), extreme PostgreSQL perf (use AlloyDB).',
    nt:null,doc:'https://cloud.google.com/sql/docs'
  },
  gcp_spanner: {
    cl:'gcp',ic:'🌍',nm:'Cloud Spanner',tl:'NewSQL · Globally distributed · 99.999% · ACID at scale',tg:['NewSQL','Global','Relational + Scale'],
    ds:'Horizontally scalable, globally distributed relational database. Combines full ACID transactions and SQL semantics with unlimited horizontal scaling. TrueTime API ensures external consistency.',
    dk:'gcp_spanner',
    ft:['ANSI SQL + ACID + horizontal scale','99.999% SLA (multi-region config)','Synchronous global replication','TrueTime external consistency','Automatic sharding','PostgreSQL interface (Spanner PG)','PITR (7 days)','Managed backups + CMEK'],
    uw:['Global financial / gaming systems','Multi-region active-active OLTP','Large-scale inventory management','Workloads outgrowing sharded MySQL/PG'],
    nf:'Simple single-region apps (use Cloud SQL), NoSQL/document (use Firestore).',
    nt:'💡 Spanner PG dialect lets you use PostgreSQL drivers — no proprietary SDK required.',
    doc:'https://cloud.google.com/spanner/docs'
  },
  gcp_firestore: {
    cl:'gcp',ic:'📄',nm:'Cloud Firestore',tl:'NoSQL document · Real-time · Mobile-first · Multi-region',tg:['NoSQL','Document','Real-time'],
    ds:'Managed NoSQL document database. Native mode for new apps (real-time sync, offline mobile), Datastore mode for legacy Datastore apps. Sub-millisecond reads.',
    dk:'gcp_firestore',
    ft:['Native mode (real-time listeners)','Datastore mode (legacy compat)','Sub-ms document reads','ACID transactions','Mobile offline support (Firebase SDK)','Multi-region replication','Server-side timestamps','Collection group queries'],
    uw:['Mobile / web real-time apps (Firebase)','User profiles and settings','Chat / collaborative apps','Catalog data with real-time updates'],
    nf:'Relational joins (use Cloud SQL), wide-column analytics (use Bigtable), OLAP (use BigQuery).',
    nt:null,doc:'https://cloud.google.com/firestore/docs'
  },
  gcp_alloydb: {
    cl:'gcp',ic:'🏎️',nm:'AlloyDB for PostgreSQL',tl:'100% PostgreSQL compat · 4× faster · AI-ready · HTAP',tg:['Relational','PostgreSQL','High-perf'],
    ds:'Google-built, 100% PostgreSQL-compatible database. Columnar engine for analytics, pgvector for AI embeddings, and Gemini-assisted DBA features. 4× faster than standard RDS PostgreSQL benchmarks.',
    dk:'gcp_alloydb',
    ft:['100% PostgreSQL compatible','4× faster than RDS PostgreSQL (TPC-C)','Columnar engine (HTAP)','pgvector built-in (AI embeddings)','Gemini (AI assistant for DBAs)','99.99% SLA','Managed backups + PITR','AlloyDB Omni (on-prem / other clouds)'],
    uw:['PostgreSQL workloads needing more performance','AI apps with vector similarity search','HTAP (transactional + analytical)','Migrating from Aurora/RDS PostgreSQL'],
    nf:'Non-PostgreSQL engines (use Cloud SQL), unlimited global scale (use Spanner).',
    nt:null,doc:'https://cloud.google.com/alloydb/docs'
  },
  gcp_memorystore: {
    cl:'gcp',ic:'🏎️',nm:'Memorystore',tl:'Managed Redis / Memcached · Sub-ms · VPC-native',tg:['In-memory','Cache','Redis / Memcached'],
    ds:'Fully managed in-memory data store for Redis and Memcached on GCP. VPC-native, encrypted, and integrated with IAM.',
    dk:'gcp_memorystore',
    ft:['Redis 6 / 7 or Memcached','Sub-millisecond latency','300 GB max (Redis)','High availability replica','VPC-native (private IP)','TLS encryption','IAM-based access control','Redis Cluster (preview)'],
    uw:['Database query caching on GCP','Session store for GKE apps','Real-time rate limiting','Pub/Sub with Redis on GCP'],
    nf:'Persistent primary storage (use Cloud SQL/Spanner), full-text search (use Vertex AI Search).',
    nt:null,doc:'https://cloud.google.com/memorystore/docs'
  },
  gcp_bigquery: {
    cl:'gcp',ic:'🔵',nm:'BigQuery',tl:'Serverless data warehouse · OLAP · ML · Petabyte scale',tg:['Data warehouse','OLAP','Serverless'],
    ds:'Serverless, highly scalable data warehouse. Dremel query engine, columnar storage, built-in ML (BQML), and BigQuery Omni for multi-cloud querying.',
    dk:'gcp_bigquery',
    ft:['Serverless (no infra to manage)','Dremel columnar MPP engine','BigQuery ML (train in SQL)','Omni (query AWS S3 / Azure ADLS)','BI Engine (sub-second BI queries)','Streaming ingestion (Pub/Sub)','Row-level security','10 GB/s query throughput'],
    uw:['Business intelligence & reporting','ETL pipeline destination on GCP','Ad-hoc large-scale analytics','ML model training on structured data'],
    nf:'OLTP transactional workloads (use Cloud SQL/Spanner), real-time sub-ms queries (use Bigtable).',
    nt:null,doc:'https://cloud.google.com/bigquery/docs'
  },
};

// ── DECISION TREES ──
const TREE = {
  azure: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What is the primary nature of your data?',h:'Relational data has a defined schema with tables and relationships. NoSQL is schema-flexible. In-memory stores data in RAM for sub-ms access.',two:false,
      opts:[
        {ic:'📋',lb:'Relational / SQL',ds:'Tables, relationships, ACID transactions, SQL queries',cr:'Relational',nx:'q2_rel'},
        {ic:'🌐',lb:'NoSQL — flexible / global / multi-model',ds:'JSON docs, key-value, graph, column — no fixed schema',cr:'NoSQL',nx:'R_cosmos'},
        {ic:'⚡',lb:'In-memory cache',ds:'Sub-millisecond latency, session state, leaderboards',cr:'In-memory',nx:'R_redis'},
      ]},
    nodes: {
      q2_rel: {id:'q2_rel',ey:'Step 2 of 4',q:'Which SQL engine do you need?',h:'Azure SQL is SQL Server-based. MySQL and PostgreSQL are open-source. Choose based on your existing stack or migration source.',two:false,
        opts:[
          {ic:'🔷',lb:'SQL Server (T-SQL)',ds:'Microsoft SQL Server syntax and features',cr:'SQL Server',nx:'q3_sql'},
          {ic:'🐬',lb:'MySQL',ds:'MySQL 5.7 or 8.0 — LAMP stack, web apps',cr:'MySQL',nx:'R_mysql'},
          {ic:'🐘',lb:'PostgreSQL',ds:'PostgreSQL 11–16 — advanced types, extensions, AI/vector',cr:'PostgreSQL',nx:'R_postgres'},
          {ic:'💎',lb:'MariaDB',ds:'Existing MariaDB workload only',cr:'MariaDB',nx:'R_mariadb'},
        ]},
      q3_sql: {id:'q3_sql',ey:'Step 3 of 4',q:'Do you need full SQL Server feature compatibility?',h:'Azure SQL DB covers 95%+ of use cases. SQL Managed Instance covers CLR, SQL Agent, linked servers, SSIS — used for lift-and-shift migrations.',two:true,
        opts:[
          {ic:'🏢',lb:'Yes — need CLR / SQL Agent / linked servers',ds:'Full SQL Server compat, lift-and-shift migration',cr:'Full SQL Server compat',nx:'R_sqlmi'},
          {ic:'☁️',lb:'No — cloud-native is fine',ds:'Serverless, Hyperscale, elastic pools, modern PaaS',cr:'Cloud-native SQL',nx:'R_sql'},
        ]},
    },
    results: {
      R_sql:    {k:'azure_sql',    w:'Azure SQL Database is a fully managed PaaS built on SQL Server. Serverless auto-pauses when idle, Hyperscale scales to 100 TB, and Elastic Pools share resources across multiple databases.'},
      R_sqlmi:  {k:'azure_sqlmi',  w:'SQL Managed Instance gives near-100% SQL Server compatibility — CLR, SQL Agent, linked servers, SSRS/SSIS/SSAS. Ideal for lift-and-shift when Azure SQL Database falls short.'},
      R_cosmos:  {k:'azure_cosmos',  w:'Azure Cosmos DB is the right choice for globally distributed, multi-model workloads. It supports SQL, MongoDB, Cassandra, Gremlin, and Table APIs with < 10ms latency globally and 5 consistency levels.'},
      R_mysql:   {k:'azure_mysql',   w:'Azure Database for MySQL Flexible Server is fully managed MySQL 5.7/8.0 with zone-redundant HA, read replicas, and PITR — perfect for LAMP stack and web app backends.'},
      R_postgres:{k:'azure_postgres',w:'Azure Database for PostgreSQL Flexible Server gives you managed PostgreSQL 11–16 with pgvector for AI workloads, Citus for horizontal sharding, and PostGIS for geospatial.'},
      R_mariadb: {k:'azure_mariadb', w:'Azure Database for MariaDB is available for existing MariaDB lift-and-shift workloads. Note: this service is on a retirement path — new projects should prefer Azure MySQL or PostgreSQL.'},
      R_redis:   {k:'azure_redis',   w:'Azure Cache for Redis provides sub-millisecond in-memory caching with managed Redis 6/7. Use it for session state, database query caching, leaderboards, and pub/sub messaging.'},
    },
  },
  aws: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What is the primary nature of your data?',h:'Relational = tables + SQL + ACID. NoSQL = flexible schema. In-memory = sub-ms. Warehouse = OLAP analytics.',two:false,
      opts:[
        {ic:'📋',lb:'Relational / SQL',ds:'Tables, relationships, ACID transactions',cr:'Relational',nx:'q2_rel'},
        {ic:'🌐',lb:'NoSQL — flexible / document / key-value',ds:'JSON, key-value, Cassandra, wide-column',cr:'NoSQL',nx:'q2_nosql'},
        {ic:'⚡',lb:'In-memory cache',ds:'Sub-millisecond, session store, leaderboards',cr:'In-memory',nx:'R_elasticache'},
        {ic:'📊',lb:'Data warehouse (OLAP analytics)',ds:'BI reporting, historical queries at petabyte scale',cr:'OLAP',nx:'R_redshift'},
      ]},
    nodes: {
      q2_rel: {id:'q2_rel',ey:'Step 2 of 4',q:'Do you need high-performance / serverless / global?',h:'Aurora is 5× faster than standard MySQL, supports Serverless v2 auto-scaling, and Global Database for cross-region. RDS is standard managed relational.',two:true,
        opts:[
          {ic:'⚡',lb:'Yes — need max performance or auto-scaling',ds:'Aurora MySQL/PG · Serverless v2 · Global Database',cr:'High performance',nx:'R_aurora'},
          {ic:'🔷',lb:'Standard managed relational DB',ds:'RDS MySQL / PG / SQL Server / Oracle / MariaDB',cr:'Standard RDS',nx:'R_rds'},
        ]},
      q2_nosql: {id:'q2_nosql',ey:'Step 2 of 4',q:'What is your NoSQL data model?',h:'DynamoDB is key-value/document at serverless scale. DocumentDB is MongoDB-compatible. Keyspaces is Cassandra-compatible.',two:false,
        opts:[
          {ic:'🔑',lb:'Key-value or simple document',ds:'DynamoDB — serverless, any scale, single-digit ms',cr:'Key-value / document',nx:'R_dynamodb'},
          {ic:'📄',lb:'MongoDB-style documents',ds:'DocumentDB — MongoDB compatible JSON store',cr:'MongoDB compat',nx:'R_documentdb'},
          {ic:'📊',lb:'Cassandra / wide-column',ds:'Keyspaces — managed CQL, no cluster ops',cr:'Cassandra / CQL',nx:'R_keyspaces'},
        ]},
    },
    results: {
      R_rds:         {k:'aws_rds',         w:'Amazon RDS gives you fully managed MySQL, PostgreSQL, MariaDB, SQL Server, Oracle, or IBM Db2. Multi-AZ for HA, up to 15 read replicas, and RDS Proxy for connection pooling.'},
      R_aurora:      {k:'aws_aurora',       w:'Amazon Aurora delivers 5× MySQL and 3× PostgreSQL performance with shared distributed storage (6 copies/3 AZs). Aurora Serverless v2 auto-scales instantly, and Global Database replicates cross-region in < 1 second.'},
      R_dynamodb:    {k:'aws_dynamodb',     w:'Amazon DynamoDB is the right serverless NoSQL choice. Single-digit ms at any scale, on-demand pricing, Global Tables for multi-region, and DynamoDB Streams for CDC.'},
      R_documentdb:  {k:'aws_documentdb',   w:'Amazon DocumentDB is MongoDB-compatible for JSON document workloads. Separates compute from storage, scales to 64 TB, and supports up to 15 read replicas.'},
      R_keyspaces:   {k:'aws_keyspaces',    w:'Amazon Keyspaces is managed, serverless Apache Cassandra. CQL-compatible, no cluster provisioning, auto-scales on-demand — ideal for Cassandra lift-and-shift on AWS.'},
      R_elasticache: {k:'aws_elasticache',  w:'Amazon ElastiCache with Redis or Memcached delivers sub-millisecond in-memory caching. Redis Cluster mode for horizontal sharding, Global Datastore for cross-region active-active.'},
      R_redshift:    {k:'aws_redshift',     w:'Amazon Redshift is the managed columnar data warehouse for OLAP workloads. Redshift Serverless removes cluster management, Spectrum queries S3 in-place, and MPP scales to petabytes.'},
    },
  },
  gcp: {
    root: {id:'q1',ey:'Step 1 of 4',q:'What is the primary nature of your data?',h:'Relational = SQL + ACID. NoSQL = flexible schema. In-memory = sub-ms. Warehouse = OLAP analytics at petabyte scale.',two:false,
      opts:[
        {ic:'📋',lb:'Relational / SQL',ds:'Tables, relationships, ACID transactions',cr:'Relational',nx:'q2_rel'},
        {ic:'🌐',lb:'NoSQL — document / wide-column',ds:'JSON documents, real-time sync, or time-series NoSQL',cr:'NoSQL',nx:'q2_nosql'},
        {ic:'⚡',lb:'In-memory cache',ds:'Sub-millisecond, session store, leaderboards',cr:'In-memory',nx:'R_memorystore'},
        {ic:'📊',lb:'Data warehouse (OLAP analytics)',ds:'BI reporting, BigQuery ML, petabyte queries',cr:'OLAP',nx:'R_bigquery'},
      ]},
    nodes: {
      q2_rel: {id:'q2_rel',ey:'Step 2 of 4',q:'What scale and compatibility do you need?',h:'Cloud SQL is standard managed. AlloyDB is high-performance PostgreSQL. Spanner is globally distributed NewSQL for unlimited horizontal scale.',two:false,
        opts:[
          {ic:'🔷',lb:'Standard MySQL / PostgreSQL / SQL Server',ds:'Cloud SQL — managed, regional HA, read replicas',cr:'Standard relational',nx:'R_cloudsql'},
          {ic:'🏎️',lb:'High-performance PostgreSQL (HTAP / AI)',ds:'AlloyDB — 4× faster, pgvector, columnar engine',cr:'High-perf PostgreSQL',nx:'R_alloydb'},
          {ic:'🌍',lb:'Globally distributed / unlimited horizontal scale',ds:'Spanner — NewSQL, ACID, 99.999% SLA',cr:'Global NewSQL',nx:'R_spanner'},
        ]},
      q2_nosql: {id:'q2_nosql',ey:'Step 2 of 4',q:'What is your NoSQL data model?',h:'Firestore for documents and real-time (mobile/web). Bigtable for time-series, IoT, and analytics at petabyte scale.',two:true,
        opts:[
          {ic:'📄',lb:'JSON documents / real-time sync',ds:'Firestore — mobile-first, Firebase SDK, real-time',cr:'Document / real-time',nx:'R_firestore'},
          {ic:'📊',lb:'Time-series / wide-column / IoT analytics',ds:'Bigtable — HBase API, single-digit ms, petabyte',cr:'Wide-column analytics',nx:'R_bigtable'},
        ]},
    },
    results: {
      R_cloudsql:    {k:'gcp_cloudsql',    w:'Cloud SQL is fully managed MySQL, PostgreSQL, and SQL Server on GCP. Regional HA with auto failover, read replicas (cross-region), IAM auth, and private IP — the straightforward relational choice on GCP.'},
      R_alloydb:     {k:'gcp_alloydb',     w:'AlloyDB for PostgreSQL is 100% PostgreSQL-compatible and 4× faster than standard RDS benchmarks. It includes a columnar engine for analytics (HTAP), pgvector for AI/embedding workloads, and Gemini AI assistance.'},
      R_spanner:     {k:'gcp_spanner',     w:'Cloud Spanner is GCPs globally distributed NewSQL database — the only service combining full SQL+ACID semantics with unlimited horizontal scaling. Use it when you\'ve outgrown sharded MySQL/PostgreSQL or need global 99.999% availability.'},
      R_firestore:   {k:'gcp_firestore',   w:'Cloud Firestore is GCPs managed document database with real-time sync, offline support, and ACID transactions. Native mode integrates with Firebase for mobile/web, Datastore mode provides legacy compat.'},
      R_bigtable:    {k:'gcp_bigtable',    w:'Cloud Bigtable is a fully managed wide-column NoSQL database for large analytical and operational workloads — IoT telemetry, time-series metrics, ad-tech. HBase-compatible, single-digit ms, petabyte scale.'},
      R_memorystore: {k:'gcp_memorystore', w:'Memorystore is managed Redis or Memcached on GCP. VPC-native, encrypted, sub-ms latency. Use for caching, session state, rate limiting, and pub/sub on GCP.'},
      R_bigquery:    {k:'gcp_bigquery',    w:'BigQuery is GCPs serverless columnar data warehouse. No cluster to manage — pay per query or flat rate. Dremel MPP engine, BQML for in-SQL ML training, and Omni for multi-cloud querying.'},
    },
  },
};

// ── COMPARE HTML ──
const COMPARE_HTML = `
<div style="margin-bottom:1.25rem"><h2 class="section-title">Cross-Cloud Database Comparison</h2><p class="section-sub">Equivalent database services across Azure, AWS, and GCP — organized by engine and workload type.</p></div>

<div class="cmp-wrap"><div class="cmp-head"><h3>Relational — SQL Server / T-SQL</h3><p>SQL Server compatibility, CLR, SQL Agent</p></div><div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Capability</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Managed SQL Server</td><td>Azure SQL Database (PaaS)</td><td>RDS for SQL Server</td><td>Cloud SQL for SQL Server</td></tr>
<tr><td>Full SQL Server compat</td><td>SQL Managed Instance (CLR, Agent)</td><td>RDS SQL Server (most features)</td><td>Cloud SQL (limited compat)</td></tr>
<tr><td>Max storage</td><td>100 TB (Hyperscale)</td><td>64 TB</td><td>64 TB</td></tr>
<tr><td>Serverless / auto-pause</td><td>✓ SQL DB Serverless tier</td><td>✗ (Aurora Serverless is MySQL/PG only)</td><td>✗</td></tr>
<tr><td>HA model</td><td>Failover groups + geo-replication</td><td>Multi-AZ standby</td><td>Regional HA (auto failover)</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Relational — MySQL</h3><p>MySQL 5.7 / 8.0 compatible</p></div><div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Capability</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Managed MySQL</td><td>Azure Database for MySQL (Flexible Server)</td><td>RDS for MySQL / Aurora MySQL</td><td>Cloud SQL for MySQL</td></tr>
<tr><td>High-perf option</td><td>Business Critical tier</td><td>Aurora MySQL (5× faster)</td><td>AlloyDB (PostgreSQL only)</td></tr>
<tr><td>Serverless</td><td>✗</td><td>✓ Aurora Serverless v2</td><td>✗</td></tr>
<tr><td>Max storage</td><td>16 TB</td><td>128 TB (Aurora)</td><td>64 TB</td></tr>
<tr><td>Read replicas</td><td>5 (cross-region)</td><td>15 (Aurora) · 5 (RDS)</td><td>5 (cross-region)</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>Relational — PostgreSQL</h3><p>PostgreSQL compatible, including AI/vector extensions</p></div><div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Capability</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Managed PostgreSQL</td><td>Azure DB for PostgreSQL Flexible Server</td><td>RDS for PostgreSQL / Aurora PG</td><td>Cloud SQL for PostgreSQL / AlloyDB</td></tr>
<tr><td>Versions supported</td><td>11, 12, 13, 14, 15, 16</td><td>11–16 (RDS) · 13–16 (Aurora)</td><td>9.6–15 (Cloud SQL) · 14–15 (AlloyDB)</td></tr>
<tr><td>pgvector (AI embeddings)</td><td>✓ Azure PostgreSQL Flexible</td><td>✓ RDS / Aurora PG</td><td>✓ AlloyDB (built-in) · Cloud SQL</td></tr>
<tr><td>Horizontal sharding</td><td>Citus (Hyperscale)</td><td>✗ (use Aurora + custom sharding)</td><td>Spanner (different product)</td></tr>
<tr><td>HTAP (analytics + OLTP)</td><td>Hyperscale Citus</td><td>Aurora ML integrations</td><td>✓ AlloyDB columnar engine</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>NoSQL — Document & Key-Value</h3><p>JSON documents, flexible schema, global distribution</p></div><div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Capability</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Primary NoSQL service</td><td>Azure Cosmos DB</td><td>Amazon DynamoDB</td><td>Cloud Firestore</td></tr>
<tr><td>MongoDB compat</td><td>✓ Cosmos DB MongoDB API</td><td>✓ Amazon DocumentDB</td><td>✗ (use Atlas on GCP)</td></tr>
<tr><td>Cassandra compat</td><td>✓ Cosmos DB Cassandra API</td><td>✓ Amazon Keyspaces</td><td>✓ Cloud Bigtable (HBase/CQL)</td></tr>
<tr><td>Multi-region writes</td><td>✓ Cosmos DB multi-master</td><td>✓ DynamoDB Global Tables</td><td>✓ Spanner / Firestore multi-region</td></tr>
<tr><td>Serverless</td><td>✓ Cosmos DB Serverless</td><td>✓ DynamoDB On-Demand</td><td>✓ Firestore (always serverless)</td></tr>
<tr><td>Consistency levels</td><td>5 levels (Strong → Eventual)</td><td>Eventual + Conditional Writes</td><td>Strong (Spanner) · Eventual (Firestore)</td></tr>
</tbody></table></div></div>

<div class="cmp-wrap" style="margin-top:1rem"><div class="cmp-head"><h3>In-Memory Cache & Data Warehouse</h3></div><div style="overflow-x:auto"><table class="ct"><thead><tr><th class="hd">Category</th><th class="az">Azure</th><th class="aw">AWS</th><th class="gc">GCP</th></tr></thead><tbody>
<tr><td>Managed Redis</td><td>Azure Cache for Redis</td><td>ElastiCache for Redis</td><td>Memorystore for Redis</td></tr>
<tr><td>Managed Memcached</td><td>✗</td><td>ElastiCache for Memcached</td><td>Memorystore for Memcached</td></tr>
<tr><td>Data warehouse</td><td>Azure Synapse Analytics</td><td>Amazon Redshift</td><td>Google BigQuery</td></tr>
<tr><td>Serverless warehouse</td><td>✓ Synapse Serverless SQL pool</td><td>✓ Redshift Serverless</td><td>✓ BigQuery (always serverless)</td></tr>
<tr><td>In-warehouse ML</td><td>Synapse ML / Azure ML integration</td><td>Redshift ML (CREATE MODEL)</td><td>BigQuery ML (train in SQL)</td></tr>
</tbody></table></div></div>`;

return { META, ICONS, DIAG, SVC, TREE, COMPARE_HTML };
})();
