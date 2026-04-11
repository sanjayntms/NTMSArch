const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const port = process.env.PORT || 3000;

// ── Config ────────────────────────────────────────────────────
// AUTH_ENABLED   — set to "true" in App Service → Configuration
//                  When false (local dev / Easy Auth not set up):
//                    • /api/auth/me returns { authenticated: false }
//                    • /api/auth/topics returns protectedTopics but
//                      authenticated: false → UI shows 🔒 but no crash
//
// PROTECTED_TOPICS — comma-separated topic IDs that require sign-in
//                    Change anytime in App Service config, no redeploy.
//                    Example: "devops,db,compute"
//
// IMPORTANT: Azure App Service Easy Auth MUST be set to:
//   Action when request is not authenticated = "Allow anonymous requests"
//   This lets everyone load the page. Our app gates individual topics.
// ─────────────────────────────────────────────────────────────
const AUTH_ENABLED     = (process.env.AUTH_ENABLED || 'false').toLowerCase() === 'true';
const PROTECTED_TOPICS = (process.env.PROTECTED_TOPICS || '')
  .split(',').map(t => t.trim()).filter(Boolean);
const TOPICS_DIR = path.join(__dirname, 'public', 'topics');

// ── Parse Easy Auth header ────────────────────────────────────
// App Service injects X-MS-CLIENT-PRINCIPAL (base64 JSON) when
// Easy Auth is enabled AND the user is signed in.
// If the header is absent → user is anonymous (not an error).
function getPrincipal(req) {
  const h = req.headers['x-ms-client-principal'];
  if (!h) return null;
  try {
    return JSON.parse(Buffer.from(h, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function isAuthenticated(req) {
  if (!AUTH_ENABLED) return false;
  return getPrincipal(req) !== null;
}

// ── Auto-discover topic modules ───────────────────────────────
// Scans public/topics/*-module.js — drop a file → it appears.
// No changes to index.html or this file ever needed.
function getTopicScripts() {
  try {
    return fs.readdirSync(TOPICS_DIR)
      .filter(f => f.endsWith('-module.js'))
      .sort()
      .map(f => `<script src="/topics/${f}"></script>`)
      .join('\n    ');
  } catch {
    return '';
  }
}

// ── Serve index.html with injected topic scripts ──────────────
const INDEX_PATH = path.join(__dirname, 'public', 'index.html');
let indexTemplate = null;

function getIndexHtml() {
  if (!indexTemplate || process.env.NODE_ENV !== 'production') {
    const raw = fs.readFileSync(INDEX_PATH, 'utf8');
    indexTemplate = raw.replace(
      /<!-- TOPIC MODULES.*?<!-- END TOPIC MODULES -->/s,
      '<!-- TOPIC MODULES — auto-injected -->\n    __TOPIC_SCRIPTS__\n    <!-- END TOPIC MODULES -->'
    );
  }
  return indexTemplate.replace('__TOPIC_SCRIPTS__', getTopicScripts());
}

// ── API: who am I? ────────────────────────────────────────────
// Always returns JSON — never redirects. Anonymous → { authenticated: false }.
app.get('/api/auth/me', (req, res) => {
  const p = getPrincipal(req);
  if (p) {
    const claims = p.claims || [];
    const gc = type => (claims.find(c => c.typ === type) || {}).val || '';
    res.json({
      authenticated: true,
      name:  gc('name') || gc('preferred_username') || p.userDetails || 'User',
      email: gc('preferred_username') || gc('upn') || gc('email') || '',
    });
  } else {
    // Not authenticated — return 200 with authenticated:false (not a 401).
    // The browser's fetch() sees this as a normal response, not an error.
    res.json({ authenticated: false });
  }
});

// ── API: which topics can this user access? ───────────────────
// Always 200. Frontend uses this to decide which topics to lock.
app.get('/api/auth/topics', (req, res) => {
  const authed = isAuthenticated(req);
  res.json({
    authenticated:   authed,
    protectedTopics: PROTECTED_TOPICS,
    // canAccess list is informational — frontend enforces the lock UI
    canAccess: authed
      ? 'all'
      : PROTECTED_TOPICS.length > 0 ? 'public' : 'all',
  });
});

// ── API: installed topic files (diagnostic) ───────────────────
app.get('/api/topics/list', (req, res) => {
  try {
    const files = fs.readdirSync(TOPICS_DIR)
      .filter(f => f.endsWith('-module.js')).sort();
    res.json({ topics: files, count: files.length });
  } catch {
    res.json({ topics: [], count: 0 });
  }
});

// ── Auth: trigger Easy Auth login flow ────────────────────────
// Redirects to Microsoft login. Returns here after sign-in.
// Easy Auth must be enabled (AllowAnonymous action) for this to work.
app.get('/api/auth/login', (req, res) => {
  const redirect = req.query.redirect || '/';
  res.redirect(`/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(redirect)}`);
});

app.get('/api/auth/logout', (req, res) => {
  res.redirect('/.auth/logout?post_logout_redirect_uri=/');
});

// ── Static files ──────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
  index: false,  // we serve index.html dynamically below
}));

// ── SPA: all routes → dynamic index.html ─────────────────────
// No auth check here — EVERYONE gets the page.
// Topic locking is handled client-side based on /api/auth/topics.
app.get('*', (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(getIndexHtml());
  } catch (err) {
    console.error('index.html error:', err.message);
    res.status(500).send('Server error — please try again.');
  }
});

// ── Start ─────────────────────────────────────────────────────
app.listen(port, () => {
  const topicFiles = fs.readdirSync(TOPICS_DIR)
    .filter(f => f.endsWith('-module.js')).sort();
  console.log(`NTMS Cloud Guide — port ${port}`);
  console.log(`Auth enabled : ${AUTH_ENABLED}`);
  console.log(`Protected    : ${PROTECTED_TOPICS.join(', ') || '(none)'}`);
  console.log(`Topics (${topicFiles.length}): ${topicFiles.join(', ')}`);
  console.log(`URL          : http://localhost:${port}`);
});
