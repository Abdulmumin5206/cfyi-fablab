# Schema Implementation Guide for fablab-cfyi.uz

This guide provides step-by-step instructions for implementing the structured data schemas on your website to improve search engine visibility.

## Prerequisites

Before implementing the schemas, make sure you have:

1. Access to your website's source code
2. Basic understanding of React/TypeScript
3. The schema templates from `SERVICE_SCHEMA_TEMPLATES.md`

## Implementation Steps

### Step 1: Create Schema Objects

For each service page, create a schema object in the page component file. For example, in `src/pages/Mould.tsx`:

```tsx
// Define JSON-LD schema for Mould page
const mouldSchema = {
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
};
```

### Step 2: Update SEOHelmet Component

Make sure the SEOHelmet component is properly imported and used in each page:

```tsx
import SEOHelmet from "@/components/SEOHelmet";

// Inside your component's return statement
return (
  <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
    <SEOHelmet
      title="Molding & Production Services"
      description="Professional molding and production services in Uzbekistan. Injection molding, silicone molding, and mass production capabilities for industrial applications."
      keywords="литье пластмасс Ташкент, plastmassa quyish Toshkent, силиконовое литье, silikon quyish, производство деталей Узбекистан, detal ishlab chiqarish, промышленное литье, sanoat quyish, массовое производство, ommaviy ishlab chiqarish, изготовление форм, qolip tayyorlash"
      image="/mould/hero.webp"
      schema={mouldSchema}
      canonicalPath="/mould"
    />
    {/* Rest of your component */}
  </div>
);
```

### Step 3: Implement Schemas for Each Page

#### 3D Printing Page (`src/pages/3DPrinting.tsx`)

1. Copy the 3D Printing schema from the templates
2. Paste it in the page component as `printingSchema`
3. Update the SEOHelmet component to use this schema

#### Digital Fabrication Page (`src/pages/DigitalFabrication.tsx`)

1. Copy the Digital Fabrication schema from the templates
2. Paste it in the page component as `fabricationSchema`
3. Update the SEOHelmet component to use this schema

#### 3D Scanning Page (`src/pages/ThreeDScanning.tsx`)

1. Copy the 3D Scanning schema from the templates
2. Paste it in the page component as `scanningSchema`
3. Update the SEOHelmet component to use this schema

#### Courses Page (`src/pages/Courses.tsx`)

1. Copy the Courses schema from the templates
2. Paste it in the page component as `coursesSchema`
3. Update the SEOHelmet component to use this schema

### Step 4: Verify Schema Implementation

After implementing the schemas, verify they are working correctly:

1. Deploy your changes to a test environment
2. Use Google's Rich Results Test tool (https://search.google.com/test/rich-results) to validate your structured data
3. Fix any errors or warnings that appear in the test results

### Step 5: Add Schema to the Home Page

For the home page, enhance the existing Organization schema:

```tsx
const homeSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FabLab CFYI",
  "url": "https://fablab-cfyi.uz",
  "logo": "https://fablab-cfyi.uz/fablab/logo.png",
  "description": "Digital fabrication laboratory providing 3D printing, prototyping, engineering solutions and manufacturing services in Uzbekistan.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Uzbekistan",
    "addressLocality": "Tashkent"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+998770884977",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://facebook.com/fablabcfyi",
    "https://instagram.com/fablabcfyi",
    "https://twitter.com/fablabcfyi"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "FabLab CFYI Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "3D Printing",
        "description": "Professional 3D printing services",
        "url": "https://fablab-cfyi.uz/3d-printing"
      },
      {
        "@type": "Offer",
        "name": "Molding & Production",
        "description": "Injection molding and production services",
        "url": "https://fablab-cfyi.uz/mould"
      },
      {
        "@type": "Offer",
        "name": "Digital Fabrication",
        "description": "Advanced digital fabrication services",
        "url": "https://fablab-cfyi.uz/digital-fabrication"
      },
      {
        "@type": "Offer",
        "name": "3D Scanning",
        "description": "High-precision 3D scanning services",
        "url": "https://fablab-cfyi.uz/3d-scanning"
      },
      {
        "@type": "Offer",
        "name": "Educational Courses",
        "description": "Digital fabrication training courses",
        "url": "https://fablab-cfyi.uz/courses"
      }
    ]
  }
};
```

### Step 6: Add BreadcrumbList Schema

For better navigation understanding by search engines, add breadcrumb schema to each page:

```tsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://fablab-cfyi.uz/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Molding & Production", // Change for each page
      "item": "https://fablab-cfyi.uz/mould" // Change for each page
    }
  ]
};
```

Then combine it with your service schema:

```tsx
const combinedSchema = [serviceSchema, breadcrumbSchema];
```

And update your SEOHelmet component:

```tsx
<SEOHelmet
  title="Molding & Production Services"
  description="Professional molding and production services in Uzbekistan."
  keywords="relevant keywords here"
  image="/mould/hero.webp"
  schema={combinedSchema}
  canonicalPath="/mould"
/>
```

### Step 7: Monitor Performance

After implementing the schemas:

1. Submit your sitemap to Google Search Console
2. Monitor the "Enhancements" section in Search Console for rich result opportunities
3. Track your search rankings for targeted keywords
4. Analyze click-through rates for pages with structured data

## Troubleshooting

If your structured data isn't being recognized:

1. **Validate the JSON-LD syntax**: Make sure there are no syntax errors in your schema objects
2. **Check for required properties**: Some schema types require specific properties
3. **Verify the schema is in the rendered HTML**: Use browser developer tools to check if the schema is properly included in the page's HTML
4. **Test with multiple tools**: Try both Google's Rich Results Test and Schema.org's Validator

## Best Practices

1. **Keep schemas updated**: Update your schemas when you change service offerings or details
2. **Be accurate**: Only include information that accurately represents your services
3. **Be comprehensive**: Include as much relevant information as possible
4. **Test regularly**: Periodically test your structured data to ensure it remains valid

By following this guide, you'll successfully implement structured data across your website, improving your chances of getting rich results in search engines and enhancing your overall SEO performance. 