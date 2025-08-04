import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  schema?: any;
  canonicalPath?: string;
  noIndex?: boolean;
}

const SEOHelmet = ({
  title,
  description,
  keywords,
  image = '/main/scrolling2.webp',
  schema,
  canonicalPath,
  noIndex = false
}: SEOHelmetProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  const currentLang = i18n.language.split('-')[0]; // Normalize language code
  const baseUrl = 'https://fablab-cfyi.uz';
  const fullUrl = canonicalPath ? `${baseUrl}${canonicalPath}` : `${baseUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  useEffect(() => {
    try {
      // Update page title
      if (title) {
        document.title = `${title} | FabLab CFYI`;
      }
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && description) {
        metaDescription.setAttribute('content', description);
      } else if (description) {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.setAttribute('name', 'description');
        newMetaDescription.setAttribute('content', description);
        document.head.appendChild(newMetaDescription);
      }
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords && keywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      if (metaKeywords && keywords) {
        metaKeywords.setAttribute('content', keywords);
      }
      
      // Update robots tag
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', noIndex ? 'noindex, nofollow' : 'index, follow');
      
      // Update canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', fullUrl);
      
      // Update Open Graph tags
      const ogTags = {
        'og:title': title ? `${title} | FabLab CFYI` : 'FabLab CFYI - Innovation and Digital Fabrication in Uzbekistan',
        'og:description': description || 'Discover cutting-edge digital fabrication, 3D printing, and engineering solutions at FabLab CFYI.',
        'og:url': fullUrl,
        'og:image': fullImageUrl,
        'og:type': 'website',
        'og:locale': currentLang === 'en' ? 'en_US' : currentLang === 'ru' ? 'ru_RU' : 'uz_UZ'
      };
      
      Object.entries(ogTags).forEach(([property, content]) => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', content);
      });
      
      // Update Twitter tags
      const twitterTags = {
        'twitter:card': 'summary_large_image',
        'twitter:title': title ? `${title} | FabLab CFYI` : 'FabLab CFYI - Innovation and Digital Fabrication in Uzbekistan',
        'twitter:description': description || 'Discover cutting-edge digital fabrication, 3D printing, and engineering solutions at FabLab CFYI.',
        'twitter:image': fullImageUrl
      };
      
      Object.entries(twitterTags).forEach(([name, content]) => {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('name', name);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', content);
      });
      
      // Update hreflang tags for multilingual SEO
      const hreflangUrls = {
        en: `${baseUrl}/en${canonicalPath || location.pathname}`,
        ru: `${baseUrl}/ru${canonicalPath || location.pathname}`,
        uz: `${baseUrl}/uz${canonicalPath || location.pathname}`
      };

      // Remove existing hreflang tags
      document.querySelectorAll('link[hreflang]').forEach(tag => tag.remove());

      Object.entries(hreflangUrls).forEach(([lang, url]) => {
        const hreflangTag = document.createElement('link');
        hreflangTag.setAttribute('rel', 'alternate');
        hreflangTag.setAttribute('hreflang', lang);
        hreflangTag.setAttribute('href', url);
        document.head.appendChild(hreflangTag);
      });

      // Add x-default hreflang
      const xDefaultTag = document.createElement('link');
      xDefaultTag.setAttribute('rel', 'alternate');
      xDefaultTag.setAttribute('hreflang', 'x-default');
      xDefaultTag.setAttribute('href', `${baseUrl}${canonicalPath || location.pathname}`);
      document.head.appendChild(xDefaultTag);
      
      // Update structured data with error handling
      if (schema) {
        try {
          // First, remove any existing LD+JSON scripts to avoid duplicates
          const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
          existingScripts.forEach(script => script.remove());
          
          // Create a new script element
          const scriptTag = document.createElement('script');
          scriptTag.setAttribute('type', 'application/ld+json');
          
          // Safely stringify the schema object
          const schemaString = JSON.stringify(schema, (key, value) => {
            // Handle any circular references or invalid values
            if (typeof value === 'function') {
              return value.toString();
            }
            return value;
          });
          
          scriptTag.textContent = schemaString;
          document.head.appendChild(scriptTag);
        } catch (error) {
          console.error('Error setting JSON-LD schema:', error);
          // Fallback to a simpler schema if there's an error
          try {
            const fallbackSchema = {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": title || "FabLab CFYI",
              "description": description || "Digital fabrication services in Tashkent"
            };
            
            const scriptTag = document.createElement('script');
            scriptTag.setAttribute('type', 'application/ld+json');
            scriptTag.textContent = JSON.stringify(fallbackSchema);
            document.head.appendChild(scriptTag);
          } catch (fallbackError) {
            console.error('Error setting fallback schema:', fallbackError);
          }
        }
      }
    } catch (error) {
      console.error('Error in SEOHelmet component:', error);
    }
    
    return () => {
      // Cleanup function not needed as we're updating existing tags
    };
  }, [title, description, keywords, image, schema, fullUrl, fullImageUrl, currentLang, canonicalPath, location.pathname, noIndex]);
  
  // This component doesn't render anything
  return null;
};

export default SEOHelmet; 