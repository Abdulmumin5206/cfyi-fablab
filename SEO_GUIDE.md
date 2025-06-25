# FabLab CFYI SEO Implementation Guide

This document summarizes the SEO implementation for fablab-cfyi.uz and provides guidance for maintaining good SEO practices.

## Implemented SEO Features

1. **XML Sitemap**
   - Located at `/public/sitemap.xml`
   - Automatically lists all pages with appropriate priority and change frequency
   - Will be accessible at https://fablab-cfyi.uz/sitemap.xml
   - **Note:** The Engineering page has been removed from the website and sitemap

2. **Enhanced robots.txt**
   - Located at `/public/robots.txt`
   - Includes sitemap reference
   - Has crawler directives for major search engines and social media bots

3. **SEO Meta Tags**
   - Comprehensive meta tags in `index.html` including:
     - Title and description
     - Open Graph tags for social media sharing
     - Twitter card tags
     - Canonical URL
     - Language alternates
   - JSON-LD structured data for better search engine understanding

4. **Dynamic SEO Component**
   - Created `SEOHelmet.tsx` component that can be used on any page
   - Dynamically sets page-specific meta tags and structured data
   - Already implemented on Home page and 3D Printing page

5. **Automatic Sitemap Generation**
   - Script at `/scripts/generate-sitemap.js`
   - Run with `npm run generate-sitemap`
   - Automatically detects pages and creates appropriate sitemap entries

6. **Google Search Console Verification**
   - File at `/public/google-site-verification.html`
   - You'll need to replace the placeholder with your actual verification code

## How to Use the SEO Implementation

### Adding SEO to a New Page

Import and use the SEOHelmet component in any page:

```tsx
import SEOHelmet from "@/components/SEOHelmet";

const YourPage = () => {
  return (
    <div>
      <SEOHelmet
        title="Your Page Title"
        description="Your page description of around 150-160 characters that summarizes the content."
        keywords="keyword1, keyword2, etc"
        image="/path/to/featured/image.jpg"
        schema={yourSchemaObject}
        canonicalPath="/your-page-path"
      />
      {/* rest of your page */}
    </div>
  );
};
```

### Updating the Sitemap

After adding new pages, regenerate the sitemap:

```bash
npm run generate-sitemap
```

### Verifying with Google Search Console

1. Create a property in Google Search Console for https://fablab-cfyi.uz
2. Choose the HTML tag verification method
3. Copy the provided verification code
4. Replace `YOUR-VERIFICATION-CODE` in `/public/google-site-verification.html` with your actual code
5. Deploy your website
6. Complete verification in Google Search Console

### Structured Data for Different Page Types

For consistency, use the following schema types for different pages:

- **Home Page**: Organization schema
- **Service Pages** (3D Printing, etc.): Service schema
- **Blog Posts**: Article schema
- **Courses**: Course schema

## Additional SEO Recommendations

1. **Page Speed Optimization**
   - Optimize images (consider using WebP format)
   - Minimize JavaScript and CSS
   - Implement lazy loading for images and videos

2. **Mobile-Friendly Design**
   - Ensure all pages work well on mobile devices
   - Use responsive design principles

3. **Content Strategy**
   - Create high-quality, relevant content
   - Use appropriate headings (H1, H2, H3) with keywords
   - Include alt text for all images

4. **Internal Linking**
   - Link between related pages on your website
   - Use descriptive anchor text

5. **External SEO**
   - Build quality backlinks from industry-related websites
   - Register your business on local directories and Google Business Profile

6. **Analytics**
   - Set up Google Analytics to track performance
   - Monitor search console for indexing issues or opportunities

This SEO implementation provides a solid foundation. Regular updates to content and continuous optimization will help improve your search engine rankings over time. 