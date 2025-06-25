import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import prettier from 'prettier';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const WEBSITE_URL = 'https://fablab-cfyi.uz';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages');

// Function to determine priority and change frequency based on path
function getPriorityAndFreq(pagePath) {
  // Remove extensions like .tsx
  const cleanPath = pagePath.replace(/\.[^/.]+$/, "");
  
  // Handle home page
  if (cleanPath === 'Index' || cleanPath === 'index') {
    return { priority: 1.0, freq: 'weekly' };
  }
  
  // Handle blog posts
  if (cleanPath.startsWith('blog/') && cleanPath !== 'blog/Index') {
    return { priority: 0.7, freq: 'monthly' };
  }
  
  // Handle blog index
  if (cleanPath === 'blog/Index' || cleanPath === 'blog/index') {
    return { priority: 0.8, freq: 'weekly' };
  }
  
  // Handle main service pages
  if (['3DPrinting', 'DigitalFabrication', 'ThreeDScanning', 'Mould', 'Courses'].includes(cleanPath)) {
    return { priority: 0.9, freq: 'monthly' };
  }
  
  // Default for other pages
  return { priority: 0.5, freq: 'monthly' };
}

// Function to convert file path to URL path
function filePathToUrlPath(filePath) {
  // Replace backslashes with forward slashes for consistency
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  // Handle index files
  if (normalizedPath.endsWith('Index.tsx')) {
    return normalizedPath === 'Index.tsx' 
      ? '/' 
      : `/${normalizedPath.replace('/Index.tsx', '').toLowerCase()}`;
  }
  
  // Handle blog post files
  if (normalizedPath.startsWith('blog/') && !normalizedPath.endsWith('Index.tsx')) {
    // For blog posts, keep the original slug format but remove .tsx
    return `/${normalizedPath.replace('.tsx', '').toLowerCase()}`;
  }
  
  // Special case for 3DPrinting.tsx
  if (normalizedPath === '3DPrinting.tsx') {
    return '/3d-printing';
  }
  
  // Special case for ThreeDScanning.tsx
  if (normalizedPath === 'ThreeDScanning.tsx') {
    return '/3d-scanning';
  }
  
  // Special case for DigitalFabrication.tsx
  if (normalizedPath === 'DigitalFabrication.tsx') {
    return '/digital-fabrication';
  }
  
  // Default case for other files
  const urlPath = `/${normalizedPath.replace('.tsx', '').toLowerCase()}`;
  return urlPath;
}

async function generateSitemap() {
  // Get prettier config
  let prettierConfig;
  try {
    prettierConfig = await prettier.resolveConfig('./.prettierrc');
  } catch (e) {
    prettierConfig = {}; // Use empty config if not found
    console.warn('Could not find .prettierrc, using default formatting');
  }
  
  // Find all .tsx files in the pages directory
  const pageFiles = globSync('**/*.tsx', { cwd: PAGES_DIR, absolute: false });
  
  // Filter out components, layout files, and NotFound/Engineering pages
  const pages = pageFiles.filter(file => 
    !file.includes('components/') &&
    !file.includes('layouts/') &&
    !file.includes('NotFound') &&
    file !== 'Engineering.tsx'
  );
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Create sitemap entries
  const sitemapEntries = pages.map(page => {
    const urlPath = filePathToUrlPath(page);
    const { priority, freq } = getPriorityAndFreq(page);
    
    return `
      <url>
        <loc>${WEBSITE_URL}${urlPath}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${freq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `;
  }).join('');
  
  // Create the sitemap XML
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries}
    </urlset>
  `;
  
  // Format the XML with prettier
  let formattedSitemap;
  try {
    formattedSitemap = await prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html'
    });
  } catch (e) {
    console.warn('Error formatting sitemap with prettier:', e);
    formattedSitemap = sitemap; // Use unformatted sitemap if prettier fails
  }
  
  // Write the sitemap to disk
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), formattedSitemap);
  
  console.log('Sitemap generated successfully at public/sitemap.xml');
  return true;
}

// Run the function
generateSitemap().catch(err => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
}); 