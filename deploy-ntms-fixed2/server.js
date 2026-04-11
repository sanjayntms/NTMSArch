const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// ── Config (set in Azure App Service → Configuration) ──────
const AUTH_ENABLED = (process.env.AUTH_ENABLED || 'false').toLowerCase() === 'true';
const PROTECTED_TOPICS = (process.env.PROTECTED_TOPICS || 'devops,db,compute')
  .split(',').map(t => t.trim()).filter(Boolean);
const TOPICS_DIR = path.join(__dirname, 'public', 'topics');

// ── Auto-discover topic modules ────────────────────────────
// Scans public/topics/*.js at startup and on each page request.
// Adding a new topic = drop the file in, push to GitHub. Done.
function getTopicScripts() {
  try {
    return fs.readdirSync(TOPICS_DIR)
      .filter(f => f.endsWith('-module.js'))
      .sort()  // alphabetical = consistent order
      .map(f => `<script src="/topics/${f}"></script>`)
      .join('\n    ');
  } catch {
    return '';
  }
}

// ── Build index.html dynamically ──────────────────────────
// Strips the hardcoded <script> tags from index.html and
// replaces them with auto-discovered ones. No manual edits needed.
const INDEX_PATH = path.join(__dirname, 'public', 'index.html');
let indexTemplate = null;

function getIndexHtml() {
  // Read fresh on every request in dev; cache in production
  if (!indexTemplate || process.env.NODE_ENV !== 'production') {
    let html = fs.readFileSync(INDEX_PATH, 'utf8');
    // Strip the static hardcoded topic <script> tags between the markers
    html = html.replace(
      /<!-- TOPIC MODULES.*?<!-- END TOPIC MODULES -->/s,
      '<!-- TOPIC MODULES — auto-injected by server -->\n    __TOPIC_SCRIPTS__\n    <!-- END TOPIC MODULES -->'
    );
    indexTemplate = html;
  }
  // Inject freshly-scanned topic scripts on every render
  return indexTemplate.replace('__TOPIC_SCRIPTS__', getTopicScripts());
}

// ── Auth helpers ───────────────────────────────────────────
function getPrincipal(req) {
  const h = req.headers['x-ms-client-principal'];
  if (!h) return null;
  try { return JSON.parse(Buffer.from(h, 'base64').toString('utf8')); }
  catch { return null; }
}

// ── API routes ─────────────────────────────────────────────
// Who am I?
app.get('/api/auth/me', (req, res) => {
  const p = getPrincipal(req);
  if (p) {
    const claims = p.claims || [];
    const gc = type => (claims.find(c => c.typ === type) || {}).val || '';
    res.json({
      authenticated: true,
      name:  gc('name') || gc('preferred_username') || p.userDetails || 'User',
      email: gc('preferred_username') || gc('email') || '',
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Which topics can this user see?
app.get('/api/auth/topics', (req, res) => {
  const authed = AUTH_ENABLED ? !!getPrincipal(req) : false;
  res.json({ authenticated: authed, protectedTopics: PROTECTED_TOPICS });
});

// Which topic files are installed? (diagnostic / useful for admin)
app.get('/api/topics/list', (req, res) => {
  try {
    const files = fs.readdirSync(TOPICS_DIR)
      .filter(f => f.endsWith('-module.js'))
      .sort();
    res.json({ topics: files, count: files.length });
  } catch {
    res.json({ topics: [], count: 0 });
  }
});

// Easy Auth login/logout
app.get('/api/auth/login', (req, res) => {
  res.redirect(`/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(req.query.redirect || '/')}`);
});
app.get('/api/auth/logout', (req, res) => {
  res.redirect('/.auth/logout?post_logout_redirect_uri=/');
});

// ── Static files (JS modules, assets) ─────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
  index: false, // we serve index.html ourselves below
}));

// ── SPA: serve dynamic index.html for all page routes ─────
app.get('*', (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html');
    res.send(getIndexHtml());
  } catch (err) {
    console.error('Failed to serve index.html:', err);
    res.status(500).send('Server error');
  }
});

// ── Start ──────────────────────────────────────────────────
app.listen(port, () => {
  const topics = getTopicScripts().match(/src="\/topics\/[^"]+"/g) || [];
  console.log(`NTMS Cloud Guide on port ${port}`);
  console.log(`Auth enabled: ${AUTH_ENABLED} | Protected: ${PROTECTED_TOPICS.join(', ')}`);
  console.log(`Auto-loaded topics (${topics.length}): ${topics.map(t => t.replace(/src="\/topics\/|"/g,'')).join(', ')}`);
});
