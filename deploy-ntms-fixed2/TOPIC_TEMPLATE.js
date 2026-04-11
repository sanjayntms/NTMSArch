// ═══════════════════════════════════════════════════════
// TOPIC MODULE TEMPLATE
// ───────────────────────────────────────────────────────
// TO ADD A NEW TOPIC (e.g. Security):
//
//  1. Copy this file to:
//       public/topics/security-module.js
//
//  2. Change window.TOPIC_TEMPLATE → window.TOPIC_SECURITY
//
//  3. Fill in META, ICONS, DIAG, SVC, TREE, COMPARE_HTML
//
//  4. git add public/topics/security-module.js
//     git commit -m "Add Security topic"
//     git push origin main   ← GitHub Actions deploys automatically
//
//  That's it. No changes to:
//    ✗ index.html  (server injects script tags automatically)
//    ✗ server.js   (scans public/topics/*.js at startup)
//    ✗ deploy.yml  (workflow is topic-agnostic)
//    ✗ App Service (no manual portal changes)
// ═══════════════════════════════════════════════════════

window.TOPIC_TEMPLATE = (function () {

// ── META ──────────────────────────────────────────────────
// Controls: sidebar label, icon, hero text, cloud chips
const META = {
  id: 'template',           // unique ID — used for auth gating (PROTECTED_TOPICS env var)
  label: 'My New Topic',    // shown in sidebar
  icon: '🔐',              // sidebar icon
  desc: 'Short description shown under the label in the sidebar',
  clouds: ['azure', 'aws', 'gcp'],
  views: ['tree', 'gallery', 'compare'],
  heroTitle: 'Which service fits your need?',
  heroSub: 'Answer questions · Get the right service · See diagrams',
  chips: {
    azure: ['🔐 Service A', '🛡️ Service B'],
    aws:   ['🔐 Service C', '🛡️ Service D'],
    gcp:   ['🔐 Service E', '🛡️ Service F'],
  },
};

// ── SVG HELPERS ───────────────────────────────────────────
// Copy these verbatim from any other module — they are identical
function B(x,y,w,h,lb,sb,col,rx=9){const F={blue:'#ebf4fc',teal:'#e0f7fa',green:'#e8f5e8',amber:'#fff8ed',red:'#fce8e9',gray:'#f3f7fb',purple:'#f3e8fd'};const S={blue:'#0078d4',teal:'#00b4d8',green:'#107c10',amber:'#e07000',red:'#a4262c',gray:'#a0b8cc',purple:'#7b2fbe'};const TX={blue:'#004578',teal:'#006478',green:'#0a5007',amber:'#5a3000',red:'#6b0c0e',gray:'#3a5068',purple:'#4a1580'};const f=F[col]||F.blue,s=S[col]||S.blue,t=TX[col]||TX.blue;const cy=sb?y+h/2-7:y+h/2;return`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width="1.5"/><text x="${x+w/2}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="'DM Sans',sans-serif" font-size="14" font-weight="600" fill="${t}">${lb}</text>${sb?`<text x="${x+w/2}" y="${y+h/2+11}" text-anchor="middle" dominant-baseline="central" font-family="'DM Sans',sans-serif" font-size="12" fill="${t}" opacity=".8">${sb}</text>`:''}`;}
function A(x1,y1,x2,y2,col='#0078d4'){const id='t'+Math.abs(x1*3+y1*7+x2*11+y2*17);return`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round"/></marker></defs><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="2" class="fa" marker-end="url(#${id})"/>`;}
function N(x,y,t){return`<text x="${x}" y="${y}" font-family="'DM Sans',sans-serif" font-size="13" fill="#6a8ba4">${t}</text>`;}
function SVG(c,h=268){return`<svg viewBox="0 0 780 ${h}" xmlns="http://www.w3.org/2000/svg">${c}</svg>`;}
function gi(iid,bg1,bg2,shape){return`<svg width="80" height="80" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 6px 18px ${bg1}70)"><defs><radialGradient id="gb_${iid}" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="${bg2}"/><stop offset="100%" stop-color="${bg1}"/></radialGradient><radialGradient id="gs_${iid}" cx="42%" cy="18%" r="62%"><stop offset="0%" stop-color="rgba(255,255,255,0.62)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs><rect x="4" y="5" width="64" height="63" rx="16" fill="url(#gb_${iid})"/><rect x="4" y="5" width="64" height="35" rx="16" fill="url(#gs_${iid})" opacity="0.75"/><rect x="4" y="28" width="64" height="12" fill="url(#gs_${iid})" opacity="0.22"/>${shape}<rect x="4" y="5" width="64" height="63" rx="16" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/></svg>`;}

// ── ICONS ─────────────────────────────────────────────────
// One glossy 3D icon per service key
// shape = SVG path/elements drawn in white on the coloured background
const ICONS = {
  'azure_servicea': gi('azSA', '#004578', '#0078d4',
    '<circle cx="36" cy="36" r="16" fill="none" stroke="white" stroke-width="3"/><path d="M28 36 L34 42 L44 30" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
  ),
  'aws_servicec': gi('awsSC', '#7a4200', '#e07000',
    '<rect x="20" y="22" width="32" height="28" rx="5" fill="white" opacity=".9"/>'
  ),
  'gcp_servicee': gi('gcpSE', '#0d3b8c', '#2878e8',
    '<polygon points="36,16 52,44 20,44" fill="white" opacity=".9"/>'
  ),
};

// ── DIAGRAMS ──────────────────────────────────────────────
// One animated SVG diagram per service (shown in Architecture tab)
const DIAG = {
  azure_servicea: () => SVG(`
    ${B(20,  100, 120, 46, 'Client',      'App / Browser',  'gray')}
    ${A(140, 123, 220, 123, '#0078d4')}
    ${B(220,  85, 175, 90, 'Service A',   'Azure · Managed','blue')}
    ${A(395, 110, 465,  90, '#107c10')}
    ${A(395, 130, 465, 150, '#107c10')}
    ${B(465,  70, 155, 44, 'Backend 1',  '',               'green')}
    ${B(465, 126, 155, 44, 'Backend 2',  '',               'teal' )}
    ${N(20,  218, 'Key facts about this service — latency, limits, SLA')}
  `, 230),
};

// ── SERVICE CATALOGUE ─────────────────────────────────────
// One entry per card shown in the gallery
const SVC = {
  azure_servicea: {
    cl:  'azure',                         // cloud: azure | aws | gcp
    ic:  '🔐',                            // fallback emoji if ICONS entry missing
    nm:  'Azure Service A',               // full name (gallery card + detail header)
    tl:  'Tagline · key facts · SKUs',    // subtitle under the name
    tg:  ['Tag1', 'Tag2', 'Tag3'],        // up to 3 badge tags on gallery card
    ds:  'One-paragraph description of what this service does and when to use it.',
    dk:  'azure_servicea',                // must match a key in DIAG
    ft:  [                                // features list (Architecture tab ✓ list)
      'Feature one',
      'Feature two',
      'Feature three',
    ],
    uw:  [                                // Use-when bullets
      'Scenario A',
      'Scenario B',
    ],
    nf:  'What NOT to use this for — point to the right alternative.',
    nt:  null,                            // '⚠️ Warning' | '💡 Tip' | '🔗 Pattern' | null
    doc: 'https://learn.microsoft.com/...', // official docs link
  },

  // ── Add aws_ and gcp_ entries following the same shape ──
};

// ── DECISION TREES ────────────────────────────────────────
// One tree per cloud. Each node has: id, ey (eyebrow), q (question),
// h (hint), two (2-col layout), opts (array of choices → nx next node/result)
// Results start with R_ and point to a key in SVC.
const TREE = {
  azure: {
    root: {
      id: 'q1', ey: 'Step 1 of 3',
      q: 'What is your primary need?',
      h: 'Hint text explaining the tradeoffs.',
      two: false,
      opts: [
        { ic: '🔐', lb: 'Option A', ds: 'Explanation', cr: 'Breadcrumb label', nx: 'R_servicea' },
        { ic: '🛡️', lb: 'Option B', ds: 'Explanation', cr: 'Breadcrumb label', nx: 'q2'        },
      ],
    },
    nodes: {
      q2: {
        id: 'q2', ey: 'Step 2 of 3',
        q: 'Follow-up question?',
        h: 'Hint text.',
        two: true,
        opts: [
          { ic: '✓', lb: 'Yes', ds: '', cr: 'Yes', nx: 'R_servicea' },
          { ic: '✗', lb: 'No',  ds: '', cr: 'No',  nx: 'R_servicea' },
        ],
      },
    },
    results: {
      R_servicea: {
        k: 'azure_servicea',  // must match SVC key
        w: 'Why this service is the right recommendation for the path the user took.',
      },
    },
  },
  aws: {
    root: { id:'q1', ey:'Step 1 of 3', q:'...', h:'...', two:false, opts:[] },
    nodes: {},
    results: {},
  },
  gcp: {
    root: { id:'q1', ey:'Step 1 of 3', q:'...', h:'...', two:false, opts:[] },
    nodes: {},
    results: {},
  },
};

// ── COMPARE TABLE HTML ─────────────────────────────────────
const COMPARE_HTML = `
<div style="margin-bottom:1.25rem">
  <h2 class="section-title">Cross-Cloud Comparison</h2>
  <p class="section-sub">Equivalent services across Azure, AWS, and GCP.</p>
</div>

<div class="cmp-wrap">
  <div class="cmp-head"><h3>Category 1</h3><p>Subtitle</p></div>
  <div style="overflow-x:auto">
    <table class="ct">
      <thead>
        <tr>
          <th class="hd">Feature</th>
          <th class="az">Azure</th>
          <th class="aw">AWS</th>
          <th class="gc">GCP</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Row 1</td><td>Azure answer</td><td>AWS answer</td><td>GCP answer</td></tr>
        <tr><td>Row 2</td><td>Azure answer</td><td>AWS answer</td><td>GCP answer</td></tr>
      </tbody>
    </table>
  </div>
</div>`;

// ── PUBLIC API — do not change ─────────────────────────────
return { META, ICONS, DIAG, SVC, TREE, COMPARE_HTML };
})();
