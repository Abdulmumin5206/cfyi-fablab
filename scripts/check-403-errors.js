const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const xml2js = require('xml2js');

// URLs to check
const SITEMAP_URL = 'https://fablab-cfyi.uz/sitemap.xml';
const BASE_URL = 'https://fablab-cfyi.uz';

// Googlebot user agent
const GOOGLEBOT_USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

async function getSitemapUrls() {
  try {
    console.log(`Fetching sitemap from ${SITEMAP_URL}...`);
    const response = await fetch(SITEMAP_URL);
    const xmlData = await response.text();
    
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);
    
    if (result.urlset && result.urlset.url) {
      return result.urlset.url.map(urlObj => urlObj.loc[0]);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching or parsing sitemap:', error);
    return [];
  }
}

async function checkUrl(url) {
  try {
    console.log(`Checking ${url}...`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': GOOGLEBOT_USER_AGENT
      }
    });
    
    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      url,
      status: 'Error',
      ok: false,
      statusText: error.message
    };
  }
}

async function main() {
  // Get URLs from sitemap
  const sitemapUrls = await getSitemapUrls();
  
  // Add additional URLs that might not be in the sitemap
  const additionalUrls = [
    `${BASE_URL}/mould`,
    `${BASE_URL}/digital-fabrication`,
    `${BASE_URL}/digital-fabrication/precision-manufacturing`,
    `${BASE_URL}/courses`,
    `${BASE_URL}/3d-scanning`,
    `${BASE_URL}/en/`,
    `${BASE_URL}/uz/`,
    `${BASE_URL}/ru/`,
  ];
  
  // Combine all URLs to check
  const allUrls = [...new Set([...sitemapUrls, ...additionalUrls])];
  
  console.log(`Found ${allUrls.length} URLs to check.`);
  
  // Check each URL
  const results = [];
  for (const url of allUrls) {
    const result = await checkUrl(url);
    results.push(result);
  }
  
  // Generate report
  const errorResults = results.filter(r => !r.ok);
  const okResults = results.filter(r => r.ok);
  
  console.log('\n=== URL CHECK REPORT ===');
  console.log(`Total URLs checked: ${results.length}`);
  console.log(`URLs with errors: ${errorResults.length}`);
  console.log(`URLs with OK status: ${okResults.length}`);
  
  if (errorResults.length > 0) {
    console.log('\n=== ERRORS ===');
    errorResults.forEach(r => {
      console.log(`${r.url} - Status: ${r.status} ${r.statusText}`);
    });
  }
  
  // Save report to file
  const reportData = {
    date: new Date().toISOString(),
    totalChecked: results.length,
    totalErrors: errorResults.length,
    totalOk: okResults.length,
    errors: errorResults,
    okUrls: okResults
  };
  
  await fs.writeFile(
    path.join(__dirname, '..', 'url-check-report.json'),
    JSON.stringify(reportData, null, 2)
  );
  
  console.log('\nReport saved to url-check-report.json');
}

main().catch(console.error); 