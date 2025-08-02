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
  
  const currentLang = i18n.language;
  const baseUrl = 'https://fablab-cfyi.uz';
  const fullUrl = canonicalPath ? `${baseUrl}${canonicalPath}` : `${baseUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = `${title} | FabLab CFYI`;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
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
    
    // Update structured data
    if (schema) {
      let existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.textContent = JSON.stringify(schema);
      } else {
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.textContent = JSON.stringify(schema);
        document.head.appendChild(scriptTag);
      }
    }
    
    return () => {
      // Cleanup function not needed as we're updating existing tags
    };
  }, [title, description, keywords, image, schema, fullUrl, fullImageUrl, currentLang, canonicalPath, location.pathname]);
  
  // This component doesn't render anything
  return null;
};

export default SEOHelmet; 