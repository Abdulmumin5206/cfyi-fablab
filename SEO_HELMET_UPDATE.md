# SEOHelmet Component Update for Language-Specific URLs

This guide provides specific instructions for updating the SEOHelmet component to support language-specific URLs and proper hreflang tags.

## Current Implementation

Currently, the SEOHelmet component accepts a `canonicalPath` prop that is used to set the canonical URL for the page. However, it doesn't handle language-specific URLs or generate hreflang tags for alternative language versions.

## Required Changes

### 1. Update the Component Props

First, update the component's props interface to include a new optional prop for language alternatives:

```tsx
interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  schema?: object;
  canonicalPath?: string;
  noIndex?: boolean;
  // New prop for language alternatives
  languageAlternatives?: {
    en?: string;
    ru?: string;
    uz?: string;
  };
}
```

### 2. Update the Component Implementation

Add code to generate hreflang tags for language alternatives:

```tsx
// In src/components/SEOHelmet.tsx

useEffect(() => {
  // Existing code...
  
  // Update canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullUrl);
  
  // Add hreflang tags for language alternatives
  const hreflangUrls = {
    en: languageAlternatives?.en ? `${baseUrl}${languageAlternatives.en}` : `${baseUrl}/en${location.pathname.replace(/^\/(en|ru|uz)/, '')}`,
    ru: languageAlternatives?.ru ? `${baseUrl}${languageAlternatives.ru}` : `${baseUrl}/ru${location.pathname.replace(/^\/(en|ru|uz)/, '')}`,
    uz: languageAlternatives?.uz ? `${baseUrl}${languageAlternatives.uz}` : `${baseUrl}/uz${location.pathname.replace(/^\/(en|ru|uz)/, '')}`
  };

  // Add or update hreflang tags
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
  
  // Existing code...
}, [title, description, keywords, image, schema, fullUrl, fullImageUrl, noIndex, currentLang, languageAlternatives]);
```

### 3. Update the Component Usage

Now update how the component is used in the 3DPrinting.tsx file:

```tsx
// In src/pages/3DPrinting.tsx

// Define language-specific paths
const languagePaths = {
  en: "/en/3d-printing",
  ru: "/ru/3d-pechat",
  uz: "/uz/3d-bosib-chiqarish"
};

// In the return statement
<SEOHelmet
  title={seoData[currentLang as keyof typeof seoData]?.title || seoData.en.title}
  description={seoData[currentLang as keyof typeof seoData]?.description || seoData.en.description}
  keywords={seoData[currentLang as keyof typeof seoData]?.keywords || seoData.en.keywords}
  image="/3dprinters/hero.webp"
  schema={combinedSchema}
  canonicalPath={languagePaths[currentLang as keyof typeof languagePaths] || languagePaths.en}
  languageAlternatives={languagePaths}
/>
```

## Specific Implementation for 3D Printing Page

For the 3D printing page, update the SEOHelmet component call as follows:

```tsx
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
  languageAlternatives={{
    en: "/en/3d-printing",
    ru: "/ru/3d-pechat",
    uz: "/uz/3d-bosib-chiqarish"
  }}
/>
```

## Testing the Implementation

After implementing these changes:

1. Open the website in different languages and check the browser's developer tools
2. Verify that the canonical link is set correctly for each language
3. Verify that hreflang tags are present for all language alternatives
4. Test with Google's Rich Results Test to ensure the hreflang tags are correctly implemented

## Benefits

- Search engines will better understand the relationship between your different language versions
- Improved SEO for each language version
- Better user experience when switching between languages
- Proper handling of canonical URLs to avoid duplicate content issues 