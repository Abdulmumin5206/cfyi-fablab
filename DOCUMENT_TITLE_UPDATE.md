# Document Title Update for Language-Specific Titles

This guide provides specific instructions for updating the document title to be language-specific in your React application.

## Current Implementation

Currently, in the `3DPrinting.tsx` file, the document title is set to a hardcoded English value:

```tsx
useEffect(() => {
  // Scroll to top when component mounts
  window.scrollTo(0, 0);
  
  // Update document title
  document.title = "3D Printing Services | Fablab Uzbekistan";
  
  console.log("3D Printing page mounted");
}, []);
```

This means that regardless of the selected language, the browser tab always shows the English title.

## Required Changes

### 1. Update the useEffect Hook Dependencies

First, update the useEffect hook to include `currentLang` and `seoData` in its dependency array:

```tsx
useEffect(() => {
  // Scroll to top when component mounts
  window.scrollTo(0, 0);
  
  // Update document title with language-specific title
  document.title = seoData[currentLang as keyof typeof seoData]?.title || seoData.en.title;
  
  console.log("3D Printing page mounted");
}, [currentLang, seoData]);
```

This ensures that the document title will be updated whenever the language changes.

### 2. Remove the Title Setting from SEOHelmet (Optional)

If you're using the SEOHelmet component to set the document title as well, you might want to avoid setting it twice. You can either:

1. Remove the title setting from the useEffect hook in the component and rely solely on SEOHelmet, or
2. Remove the title setting from SEOHelmet and handle it only in the component.

For consistency, it's better to handle it in one place. If SEOHelmet is used across your application, it's better to rely on it for setting the title.

### 3. Implementation for 3D Printing Page

For the 3D printing page specifically, here's the change needed:

```tsx
// Before
useEffect(() => {
  // Scroll to top when component mounts
  window.scrollTo(0, 0);
  
  // Update document title
  document.title = "3D Printing Services | Fablab Uzbekistan";
  
  console.log("3D Printing page mounted");
}, []);

// After
useEffect(() => {
  // Scroll to top when component mounts
  window.scrollTo(0, 0);
  
  // Update document title with language-specific title
  document.title = seoData[currentLang as keyof typeof seoData]?.title || seoData.en.title;
  
  console.log("3D Printing page mounted");
}, [currentLang, seoData]);
```

## Testing the Implementation

After implementing these changes:

1. Switch between different languages on your website
2. Verify that the browser tab title changes according to the selected language
3. Check that the title is correctly set when directly navigating to a page in a specific language

## Benefits

- Improved user experience for non-English users
- Better SEO for Russian and Uzbek searches
- Consistent user interface across all languages
- More professional appearance for multilingual users 