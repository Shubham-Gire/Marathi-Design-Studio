import http from 'http';
import { parse as parseUrl } from 'url';
import { STENCIL_CATALOG, COLOR_THEMES } from './stencils.js';
import { transliterateEnglishToMarathi } from './transliterate.js';

const PORT = process.env.PORT || 8087;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function parseJsonBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = parseUrl(req.url, true);
  const pathname = parsedUrl.pathname || '';
  const query = parsedUrl.query || {};

  // HEALTH CHECK
  if (pathname === '/health' || pathname === '/api/v1/tools/health' || pathname === '/api/tools/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'UP',
      service: 'marathi-tools-service',
      port: PORT,
      version: '1.0.0',
      uptimeSeconds: process.uptime(),
      stencilsCount: STENCIL_CATALOG.length,
      availableThemes: Object.keys(COLOR_THEMES)
    }));
    return;
  }

  // THEMES CATALOG
  if (pathname === '/api/v1/tools/themes' || pathname === '/api/tools/themes') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      themes: Object.values(COLOR_THEMES)
    }));
    return;
  }

  // CALLIGRAPHY & STENCILS CATALOG
  if (pathname === '/api/v1/tools/calligraphy/catalog' || pathname === '/api/tools/calligraphy/catalog') {
    const requestedTheme = (query.theme || 'gold-foil');
    const category = query.category;
    let list = STENCIL_CATALOG;
    if (category && category !== 'all') {
      list = list.filter(item => item.category === category);
    }

    const items = list.map(item => ({
      id: item.id,
      title: item.title,
      englishTitle: item.englishTitle,
      category: item.category,
      tags: item.tags,
      description: item.description,
      width: item.width,
      height: item.height,
      svg: item.renderSvg(requestedTheme)
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      total: items.length,
      theme: requestedTheme,
      stencils: items
    }));
    return;
  }

  // DYNAMIC CALLIGRAPHY GENERATOR
  if ((pathname === '/api/v1/tools/calligraphy/generate' || pathname === '/api/tools/calligraphy/generate') && req.method === 'POST') {
    const body = await parseJsonBody(req);
    const text = body.text || 'हार्दिक शुभेच्छा';
    const themeId = body.theme || 'gold-foil';
    const theme = COLOR_THEMES[themeId] || COLOR_THEMES['gold-foil'];

    const width = 800;
    const height = 300;
    const generatedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="genGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="50%" stop-color="${theme.gradient.mid}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <path d="M 80 150 Q 400 90 720 150 Q 400 120 80 150 Z" fill="${theme.glow}" opacity="0.2" />
  <text x="400" y="165" text-anchor="middle" fill="url(#genGrad_${themeId})" font-family="'AMS Calligraphy 1', 'Shivaji01', 'Gotu', serif" font-size="82" font-weight="900" letter-spacing="4">${escapeXml(text)}</text>
  <path d="M 200 220 Q 400 250 600 220" stroke="url(#genGrad_${themeId})" stroke-width="4" stroke-linecap="round" fill="none" />
  <circle cx="400" cy="235" r="6" fill="${theme.stroke}" />
</svg>`;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      text,
      theme: themeId,
      svg: generatedSvg,
      width,
      height
    }));
    return;
  }

  // ENGLISH-TO-MARATHI TRANSLITERATION
  if ((pathname === '/api/v1/tools/transliterate' || pathname === '/api/tools/transliterate') && req.method === 'POST') {
    const body = await parseJsonBody(req);
    const inputText = body.text || '';
    const marathiText = transliterateEnglishToMarathi(inputText);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      input: inputText,
      marathi: marathiText,
      fontRecommendations: [
        { name: 'AMS Aaditya', category: 'Calligraphy' },
        { name: 'Shivaji 01', category: 'Shivaji Heritage' },
        { name: 'Millennium 01', category: 'Millennium Series' },
        { name: 'Gotu', category: 'Modern Devanagari' }
      ]
    }));
    return;
  }

  // NOT FOUND
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
});

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

server.listen(PORT, () => {
  console.log(`✨ Marathi Tools Service running on http://localhost:${PORT}`);
});
