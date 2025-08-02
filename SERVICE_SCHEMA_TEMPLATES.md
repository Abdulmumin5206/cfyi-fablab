# Structured Data Templates for Service Pages

These JSON-LD schema templates will help improve your website's visibility in search results by providing search engines with structured information about your services.

## General Service Schema Template

Use this template for all service pages:

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[SERVICE_NAME]",
  "provider": {
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service"
    }
  },
  "description": "[DETAILED_SERVICE_DESCRIPTION]",
  "areaServed": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "serviceType": "[SERVICE_TYPE]",
  "offers": {
    "@type": "Offer",
    "description": "[OFFER_DESCRIPTION]",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "[SERVICE_IMAGE_URL]",
  "url": "https://fablab-cfyi.uz/[SERVICE_PATH]"
}
```

## 3D Printing Service Schema

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "3D Printing Services in Uzbekistan",
  "provider": {
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service"
    }
  },
  "description": "Professional 3D printing services in Uzbekistan. From FDM to SLA, we offer high-quality 3D printing with various materials for prototyping, manufacturing and engineering solutions.",
  "areaServed": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "serviceType": "3D Printing",
  "offers": {
    "@type": "Offer",
    "description": "Professional 3D printing services with a wide range of materials and technologies",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/3dprinters/hero.webp",
  "url": "https://fablab-cfyi.uz/3d-printing",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "3D Printing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "FDM 3D Printing",
        "description": "Fused Deposition Modeling printing with various plastic materials"
      },
      {
        "@type": "Offer",
        "name": "SLA 3D Printing",
        "description": "Stereolithography printing with high precision resin materials"
      },
      {
        "@type": "Offer",
        "name": "Industrial 3D Printing",
        "description": "Large-scale and high-volume 3D printing services"
      }
    ]
  }
}
```

## Mould Manufacturing Schema

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Molding & Production Services in Uzbekistan",
  "provider": {
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service"
    }
  },
  "description": "Professional molding and production services in Uzbekistan. Injection molding, silicone molding, and mass production capabilities for industrial applications.",
  "areaServed": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "serviceType": "Manufacturing",
  "offers": {
    "@type": "Offer",
    "description": "Injection molding, silicone molding, production services",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/mould/hero.webp",
  "url": "https://fablab-cfyi.uz/mould",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Molding Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Injection Molding",
        "description": "Professional plastic injection molding services"
      },
      {
        "@type": "Offer",
        "name": "Silicone Molding",
        "description": "Silicone mold creation and casting services"
      },
      {
        "@type": "Offer",
        "name": "Mass Production",
        "description": "High-volume manufacturing capabilities"
      }
    ]
  }
}
```

## Digital Fabrication Schema

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Digital Fabrication Services in Uzbekistan",
  "provider": {
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service"
    }
  },
  "description": "Advanced digital fabrication services in Uzbekistan. CNC machining, laser cutting, and precision manufacturing for industrial and commercial applications.",
  "areaServed": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "serviceType": "Digital Fabrication",
  "offers": {
    "@type": "Offer",
    "description": "CNC machining, laser cutting, and precision manufacturing services",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/digital-fabrication/hero.webp",
  "url": "https://fablab-cfyi.uz/digital-fabrication",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Fabrication Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "CNC Machining",
        "description": "Precision CNC machining services for various materials"
      },
      {
        "@type": "Offer",
        "name": "Laser Cutting",
        "description": "High-precision laser cutting for various materials"
      },
      {
        "@type": "Offer",
        "name": "Precision Manufacturing",
        "description": "Advanced manufacturing solutions for complex projects",
        "url": "https://fablab-cfyi.uz/digital-fabrication/precision-manufacturing"
      }
    ]
  }
}
```

## 3D Scanning Schema

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "3D Scanning Services in Uzbekistan",
  "provider": {
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service"
    }
  },
  "description": "Professional 3D scanning services in Uzbekistan. High-precision scanning for reverse engineering, quality control, and digital preservation.",
  "areaServed": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "serviceType": "3D Scanning",
  "offers": {
    "@type": "Offer",
    "description": "High-precision 3D scanning services for various applications",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/3d-scanning/hero.webp",
  "url": "https://fablab-cfyi.uz/3d-scanning",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "3D Scanning Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Object Scanning",
        "description": "High-precision scanning of physical objects"
      },
      {
        "@type": "Offer",
        "name": "Reverse Engineering",
        "description": "Creating digital models from physical parts"
      },
      {
        "@type": "Offer",
        "name": "Quality Control",
        "description": "Dimensional inspection and quality verification"
      }
    ]
  }
}
```

## Courses Schema

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Digital Fabrication Courses in Uzbekistan",
  "provider": {
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service"
    }
  },
  "description": "Educational courses on digital fabrication, 3D printing, and design in Uzbekistan. Learn practical skills from industry experts.",
  "areaServed": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "serviceType": "Educational Service",
  "offers": {
    "@type": "Offer",
    "description": "Professional training courses in digital fabrication technologies",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/courses/hero.webp",
  "url": "https://fablab-cfyi.uz/courses",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Educational Courses",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Introduction to 3D Printing",
        "description": "Learn the basics of 3D printing technology and applications",
        "provider": {
          "@type": "Organization",
          "name": "FabLab CFYI",
          "sameAs": "https://fablab-cfyi.uz"
        }
      },
      {
        "@type": "Course",
        "name": "Advanced Digital Fabrication",
        "description": "Master advanced techniques in digital fabrication",
        "provider": {
          "@type": "Organization",
          "name": "FabLab CFYI",
          "sameAs": "https://fablab-cfyi.uz"
        }
      },
      {
        "@type": "Course",
        "name": "3D Design for Manufacturing",
        "description": "Learn how to design for various manufacturing processes",
        "provider": {
          "@type": "Organization",
          "name": "FabLab CFYI",
          "sameAs": "https://fablab-cfyi.uz"
        }
      }
    ]
  }
}
```

## How to Implement These Schemas

1. For each service page, update the `schema` object in your SEOHelmet component call:

```tsx
<SEOHelmet
  title="Service Title"
  description="Service description"
  keywords="relevant, keywords, here"
  image="/path/to/image.webp"
  schema={serviceSchema} // Use the appropriate schema from above
  canonicalPath="/service-path"
/>
```

2. Make sure to customize each schema with accurate information about your services.

3. Test your structured data using Google's Rich Results Test tool: https://search.google.com/test/rich-results

4. Monitor the performance of your structured data in Google Search Console under the "Enhancements" section.

By implementing these structured data schemas, you'll provide search engines with detailed information about your services, potentially leading to enhanced search results with rich snippets, which can improve click-through rates and visibility. 