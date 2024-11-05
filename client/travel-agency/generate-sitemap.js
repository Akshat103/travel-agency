import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// List all routes from your React Router configuration
const routes = [
  '/',
  '/register',
  '/login',
  '/flights',
  '/flight-details',
  '/flight/add-passengers',
  '/flight/seats',
  '/bus',
  '/hotel',
  '/hotel-details',
  '/book-hotel',
  '/bus-details',
  '/mobile-recharge',
  '/dashboard',
  '/success',
  '/failure',
  '/contact-us',
  '/about-us',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cancellation-refund',
  '/shipping-delivery',
  '/irctc/onboard',
  '/irctc'
];

const baseUrl = 'https://yaraholidays.com';
const currentDate = new Date().toISOString();

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

// Generate sitemap
async function generateSitemap() {
  try {
    // Ensure the public directory exists
    try {
      await mkdir('public');
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }

    // Write the sitemap file
    const sitemapPath = join(__dirname, 'public', 'sitemap.xml');
    await writeFile(sitemapPath, sitemapContent);
    console.log('Sitemap generated successfully!');
    console.log(`Sitemap location: ${sitemapPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Run the generator
generateSitemap();