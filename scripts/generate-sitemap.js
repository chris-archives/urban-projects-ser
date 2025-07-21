// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const baseUrl = "https://www.urbanprojser.org";
const pages = ["", "about.html", "team.html", "apply.html"];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}/${page}</loc>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../build/sitemap.xml'), sitemap.trim());

// Optional robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;

fs.writeFileSync(path.join(__dirname, '../build/robots.txt'), robots);
