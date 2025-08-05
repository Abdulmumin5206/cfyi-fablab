// @ts-check
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL of the website
const baseUrl = 'https://fablab-cfyi.uz';

// List of all pages with their translations
const pages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    translations: {
      en: '/?lng=en',
      ru: '/?lng=ru',
      uz: '/?lng=uz'
    }
  },
  {
    path: '/3d-printing-tashkent',
    priority: '0.9',
    changefreq: 'weekly',
    translations: {
      en: '/3d-printing-tashkent?lng=en',
      ru: '/3d-printing-tashkent?lng=ru',
      uz: '/3d-printing-tashkent?lng=uz'
    }
  },
  {
    path: '/digital-fabrication',
    priority: '0.8',
    changefreq: 'weekly',
    translations: {
      en: '/digital-fabrication?lng=en',
      ru: '/digital-fabrication?lng=ru',
      uz: '/digital-fabrication?lng=uz'
    }
  },
  {
    path: '/mould',
    priority: '0.8',
    changefreq: 'weekly',
    translations: {
      en: '/mould?lng=en',
      ru: '/mould?lng=ru',
      uz: '/mould?lng=uz'
    }
  },
  {
    path: '/3d-scanning',
    priority: '0.8',
    changefreq: 'weekly',
    translations: {
      en: '/3d-scanning?lng=en',
      ru: '/3d-scanning?lng=ru',
      uz: '/3d-scanning?lng=uz'
    }
  },
  {
    path: '/courses',
    priority: '0.7',
    changefreq: 'weekly',
    translations: {
      en: '/courses?lng=en',
      ru: '/courses?lng=ru',
      uz: '/courses?lng=uz'
    }
  },
  {
    path: '/blog',
    priority: '0.7',
    changefreq: 'weekly',
    translations: {
      en: '/blog?lng=en',
      ru: '/blog?lng=ru',
      uz: '/blog?lng=uz'
    }
  }
];

// Generate the XML sitemap
const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;
  
  // Add each page to the sitemap
  pages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
`;

    // Add alternate language versions
    Object.entries(page.translations).forEach(([lang, url]) => {
      sitemap += `    <xhtml:link 
      rel="alternate" 
      hreflang="${lang}" 
      href="${baseUrl}${url}" />
`;
    });

    // Add x-default (usually points to English version)
    sitemap += `    <xhtml:link 
      rel="alternate" 
      hreflang="x-default" 
      href="${baseUrl}${page.path}" />
    </url>
`;
  });
  
  sitemap += `</urlset>`;
  
  // Write the sitemap to a file
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap(); 