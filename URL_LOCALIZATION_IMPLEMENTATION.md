# URL Localization Implementation Guide

This guide provides step-by-step instructions for implementing language-specific URLs for better SEO in your React application.

## Current Setup

Currently, your routes are defined in `src/App.tsx` with English-only paths:

```jsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/3d-printing" element={<ThreeDPrintingPage />} />
  <Route path="/mould" element={<MouldPage />} />
  <Route path="/digital-fabrication" element={<DigitalFabricationPage />} />
  <Route path="/digital-fabrication/precision-manufacturing" element={<DigitalFabricationPage />} />
  <Route path="/3d-scanning" element={<ThreeDScanningPage />} />
  <Route path="/courses" element={<CoursesPage />} />
  <Route path="/projects" element={<BlogIndex />} />
  <Route path="/projects/:slug" element={<BlogPost />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Implementation Steps

### 1. Update Route Configuration

Modify `src/App.tsx` to include language-specific routes:

```jsx
<Routes>
  {/* Default routes (will redirect based on browser language) */}
  <Route path="/" element={<LanguageRedirect />} />
  
  {/* English routes */}
  <Route path="/en" element={<Index />} />
  <Route path="/en/3d-printing" element={<ThreeDPrintingPage />} />
  <Route path="/en/mould" element={<MouldPage />} />
  <Route path="/en/digital-fabrication" element={<DigitalFabricationPage />} />
  <Route path="/en/digital-fabrication/precision-manufacturing" element={<DigitalFabricationPage />} />
  <Route path="/en/3d-scanning" element={<ThreeDScanningPage />} />
  <Route path="/en/courses" element={<CoursesPage />} />
  <Route path="/en/projects" element={<BlogIndex />} />
  <Route path="/en/projects/:slug" element={<BlogPost />} />
  
  {/* Russian routes */}
  <Route path="/ru" element={<Index />} />
  <Route path="/ru/3d-pechat" element={<ThreeDPrintingPage />} />
  <Route path="/ru/formy" element={<MouldPage />} />
  <Route path="/ru/tsifrovoe-proizvodstvo" element={<DigitalFabricationPage />} />
  <Route path="/ru/tsifrovoe-proizvodstvo/precizionnoe-proizvodstvo" element={<DigitalFabricationPage />} />
  <Route path="/ru/3d-skanirovanie" element={<ThreeDScanningPage />} />
  <Route path="/ru/kursy" element={<CoursesPage />} />
  <Route path="/ru/proekty" element={<BlogIndex />} />
  <Route path="/ru/proekty/:slug" element={<BlogPost />} />
  
  {/* Uzbek routes */}
  <Route path="/uz" element={<Index />} />
  <Route path="/uz/3d-bosib-chiqarish" element={<ThreeDPrintingPage />} />
  <Route path="/uz/qolip" element={<MouldPage />} />
  <Route path="/uz/raqamli-ishlab-chiqarish" element={<DigitalFabricationPage />} />
  <Route path="/uz/raqamli-ishlab-chiqarish/aniq-ishlab-chiqarish" element={<DigitalFabricationPage />} />
  <Route path="/uz/3d-skanlash" element={<ThreeDScanningPage />} />
  <Route path="/uz/kurslar" element={<CoursesPage />} />
  <Route path="/uz/loyihalar" element={<BlogIndex />} />
  <Route path="/uz/loyihalar/:slug" element={<BlogPost />} />
  
  {/* Legacy routes (for backward compatibility) */}
  <Route path="/3d-printing" element={<LanguageRedirect path="3d-printing" />} />
  <Route path="/mould" element={<LanguageRedirect path="mould" />} />
  <Route path="/digital-fabrication" element={<LanguageRedirect path="digital-fabrication" />} />
  <Route path="/3d-scanning" element={<LanguageRedirect path="3d-scanning" />} />
  <Route path="/courses" element={<LanguageRedirect path="courses" />} />
  <Route path="/projects" element={<LanguageRedirect path="projects" />} />
  <Route path="/projects/:slug" element={<LanguageRedirect path="projects" pathParam="slug" />} />
  
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 2. Create a LanguageRedirect Component

Create a new file `src/components/LanguageRedirect.tsx`:

```tsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LanguageRedirectProps {
  path?: string;
  pathParam?: string;
}

const LanguageRedirect = ({ path, pathParam }: LanguageRedirectProps) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const params = useParams();

  useEffect(() => {
    const currentLang = i18n.language;
    
    // Path mapping for different languages
    const pathMapping: Record<string, Record<string, string>> = {
      en: {
        '': '',
        '3d-printing': '3d-printing',
        'mould': 'mould',
        'digital-fabrication': 'digital-fabrication',
        '3d-scanning': '3d-scanning',
        'courses': 'courses',
        'projects': 'projects'
      },
      ru: {
        '': '',
        '3d-printing': '3d-pechat',
        'mould': 'formy',
        'digital-fabrication': 'tsifrovoe-proizvodstvo',
        '3d-scanning': '3d-skanirovanie',
        'courses': 'kursy',
        'projects': 'proekty'
      },
      uz: {
        '': '',
        '3d-printing': '3d-bosib-chiqarish',
        'mould': 'qolip',
        'digital-fabrication': 'raqamli-ishlab-chiqarish',
        '3d-scanning': '3d-skanlash',
        'courses': 'kurslar',
        'projects': 'loyihalar'
      }
    };
    
    // Get the target path in the current language
    let targetPath = path ? `/${currentLang}/${pathMapping[currentLang][path] || path}` : `/${currentLang}`;
    
    // If there's a path parameter, add it
    if (pathParam && params[pathParam]) {
      targetPath += `/${params[pathParam]}`;
    }
    
    // Redirect to the localized URL
    navigate(targetPath, { replace: true });
  }, [navigate, i18n.language, path, pathParam, params]);
  
  // This component doesn't render anything, it just redirects
  return null;
};

export default LanguageRedirect;
```

### 3. Update Navigation Links

Update all navigation links in your components to use the language-specific URLs:

```jsx
// Before
<Link to="/3d-printing">3D Printing</Link>

// After
<Link to={`/${currentLang}/${
  currentLang === "ru" ? "3d-pechat" : 
  currentLang === "uz" ? "3d-bosib-chiqarish" : 
  "3d-printing"
}`}>
  {t("navigation.3dPrinting")}
</Link>
```

You can create a utility function to make this easier:

```tsx
// src/utils/routes.ts
export const getLocalizedRoute = (
  currentLang: string, 
  enRoute: string, 
  ruRoute?: string, 
  uzRoute?: string
) => {
  if (currentLang === "ru") return `/${currentLang}/${ruRoute || enRoute}`;
  if (currentLang === "uz") return `/${currentLang}/${uzRoute || enRoute}`;
  return `/${currentLang}/${enRoute}`;
};

// Usage
import { getLocalizedRoute } from "@/utils/routes";

<Link to={getLocalizedRoute(currentLang, "3d-printing", "3d-pechat", "3d-bosib-chiqarish")}>
  {t("navigation.3dPrinting")}
</Link>
```

### 4. Update SEOHelmet Component

Update your SEOHelmet component to include proper canonical URLs and hreflang tags:

```jsx
<SEOHelmet
  title={seoData[currentLang as keyof typeof seoData]?.title || seoData.en.title}
  description={seoData[currentLang as keyof typeof seoData]?.description || seoData.en.description}
  keywords={seoData[currentLang as keyof typeof seoData]?.keywords || seoData.en.keywords}
  image="/3dprinters/hero.webp"
  schema={combinedSchema}
  canonicalPath={
    currentLang === "ru" ? "/ru/3d-pechat" : 
    currentLang === "uz" ? "/uz/3d-bosib-chiqarish" : 
    "/en/3d-printing"
  }
/>
```

### 5. Update the SEOHelmet Component Implementation

Modify the SEOHelmet component to include hreflang tags for all language versions:

```jsx
// In src/components/SEOHelmet.tsx

// Add this to the useEffect hook
// Update hreflang tags for language alternatives
const hreflangUrls = {
  en: `${baseUrl}/en/${canonicalPath.replace(/^\/(en|ru|uz)\//, '')}`,
  ru: `${baseUrl}/ru/${
    canonicalPath.replace('/en/3d-printing', '3d-pechat')
      .replace('/en/mould', 'formy')
      .replace('/en/digital-fabrication', 'tsifrovoe-proizvodstvo')
      .replace('/en/3d-scanning', '3d-skanirovanie')
      .replace('/en/courses', 'kursy')
      .replace('/en/projects', 'proekty')
      .replace(/^\/(en|ru|uz)\//, '')
  }`,
  uz: `${baseUrl}/uz/${
    canonicalPath.replace('/en/3d-printing', '3d-bosib-chiqarish')
      .replace('/en/mould', 'qolip')
      .replace('/en/digital-fabrication', 'raqamli-ishlab-chiqarish')
      .replace('/en/3d-scanning', '3d-skanlash')
      .replace('/en/courses', 'kurslar')
      .replace('/en/projects', 'loyihalar')
      .replace(/^\/(en|ru|uz)\//, '')
  }`
};

Object.entries(hreflangUrls).forEach(([lang, url]) => {
  let hreflangTag = document.querySelector(`link[hreflang="${lang}"]`);
  if (!hreflangTag) {
    hreflangTag = document.createElement('link');
    hreflangTag.setAttribute('rel', 'alternate');
    hreflangTag.setAttribute('hreflang', lang);
    document.head.appendChild(hreflangTag);
  }
  hreflangTag.setAttribute('href', url);
});
```

### 6. Update sitemap.xml

Make sure to update your sitemap.xml file to include all language versions of each page:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Homepage -->
  <url>
    <loc>https://fablab-cfyi.uz/en</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://fablab-cfyi.uz/en" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://fablab-cfyi.uz/ru" />
    <xhtml:link rel="alternate" hreflang="uz" href="https://fablab-cfyi.uz/uz" />
  </url>
  
  <!-- 3D Printing page -->
  <url>
    <loc>https://fablab-cfyi.uz/en/3d-printing</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://fablab-cfyi.uz/en/3d-printing" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://fablab-cfyi.uz/ru/3d-pechat" />
    <xhtml:link rel="alternate" hreflang="uz" href="https://fablab-cfyi.uz/uz/3d-bosib-chiqarish" />
  </url>
  
  <!-- Other pages follow the same pattern -->
</urlset>
```

### 7. Update robots.txt

Update your robots.txt file to include the new URL structure:

```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://fablab-cfyi.uz/sitemap.xml
```

## Testing and Validation

After implementing these changes:

1. Test navigation between pages in different languages
2. Verify that all links work correctly
3. Check that the browser's back and forward buttons work as expected
4. Validate hreflang tags using Google's Rich Results Test
5. Test that search engines can crawl your site with the new URL structure

## Benefits of This Implementation

1. **Better SEO**: Search engines will understand the language targeting better
2. **Improved User Experience**: Users see URLs in their own language
3. **Clearer Analytics**: You can track performance by language in analytics tools
4. **Better Social Sharing**: When users share links, the URLs will be in the appropriate language 