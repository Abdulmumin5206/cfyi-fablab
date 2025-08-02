# Implementation Guide for Local SEO Optimization

This guide provides step-by-step instructions for implementing the localized keyword strategy and schema templates on your fablab-cfyi.uz website to improve your search engine visibility in Uzbekistan.

## Prerequisites

Before starting the implementation:

1. Access to your website's codebase
2. Understanding of React/TypeScript basics
3. Access to your cPanel hosting account
4. The localized keyword strategy document (`LOCALIZED_KEYWORD_STRATEGY.md`)
5. The localized schema templates (`LOCALIZED_SCHEMA_TEMPLATES.md`)

## Step 1: Fix 403 Errors

Ensure you've implemented the fixes for 403 errors as outlined in the `SEO_FIX_403_GUIDE.md`:

1. Update your `.htaccess` file with the provided configuration
2. Check file permissions (755 for directories, 644 for files)
3. Test your pages using the `check-403.php` script

## Step 2: Implement Localized Page Titles and Meta Descriptions

For each service page, update the SEOHelmet component with Russian/Uzbek keywords:

### 3D Printing Page (`src/pages/3DPrinting.tsx`)

```tsx
<SEOHelmet
  title="3D печать в Ташкенте | Профессиональные услуги 3D печати | FabLab CFYI"
  description="Профессиональные услуги 3D печати в Ташкенте. Печать на 3D принтере из различных материалов для прототипирования и производства."
  keywords="3D печать Ташкент, заказать 3D печать Узбекистан, печать на 3D принтере цена, услуги 3D печати пластиком, 3D печать деталей Ташкент"
  image="/3dprinters/hero.webp"
  schema={printingSchemaRu} // We'll create this in Step 3
  canonicalPath="/3d-printing"
/>
```

### Mould Page (`src/pages/Mould.tsx`)

```tsx
<SEOHelmet
  title="Литье пластмасс и изготовление форм в Ташкенте | FabLab CFYI"
  description="Профессиональные услуги литья пластмасс в Ташкенте. Литье под давлением, силиконовые формы и массовое производство."
  keywords="литье пластмасс Ташкент, изготовление форм для литья Узбекистан, силиконовые формы на заказ, производство пластиковых деталей"
  image="/mould/hero.webp"
  schema={mouldSchemaRu} // We'll create this in Step 3
  canonicalPath="/mould"
/>
```

### Digital Fabrication Page (`src/pages/DigitalFabrication.tsx`)

```tsx
<SEOHelmet
  title="Лазерная резка и ЧПУ фрезеровка в Ташкенте | FabLab CFYI"
  description="Услуги лазерной резки и ЧПУ фрезеровки в Ташкенте. Точное изготовление деталей для промышленных и коммерческих применений."
  keywords="лазерная резка Ташкент, ЧПУ фрезеровка Узбекистан, гравировка на станках ЧПУ, лазерная резка акрила цена"
  image="/digital-fabrication/hero.webp"
  schema={fabricationSchemaRu} // We'll create this in Step 3
  canonicalPath="/digital-fabrication"
/>
```

### 3D Scanning Page (`src/pages/ThreeDScanning.tsx`)

```tsx
<SEOHelmet
  title="3D сканирование в Ташкенте | Услуги 3D сканера | FabLab CFYI"
  description="Профессиональные услуги 3D сканирования в Ташкенте. Высокоточное сканирование для обратного проектирования и контроля качества."
  keywords="3D сканирование объектов Ташкент, услуги 3D сканера Узбекистан, 3D сканирование деталей цена, обратное проектирование"
  image="/3d-scanning/hero.webp"
  schema={scanningSchemaRu} // We'll create this in Step 3
  canonicalPath="/3d-scanning"
/>
```

### Courses Page (`src/pages/Courses.tsx`)

```tsx
<SEOHelmet
  title="Курсы 3D моделирования и печати в Ташкенте | FabLab CFYI"
  description="Образовательные курсы по 3D моделированию, 3D печати и дизайну в Ташкенте. Получите практические навыки от экспертов отрасли."
  keywords="курсы 3D моделирования Ташкент, обучение 3D печати Узбекистан, курсы по цифровому производству, мастер-классы по 3D технологиям"
  image="/courses/hero.webp"
  schema={coursesSchemaRu} // We'll create this in Step 3
  canonicalPath="/courses"
/>
```

## Step 3: Create Schema Files

Create a new directory for schemas:

```
mkdir -p src/schemas
```

Then create individual schema files for each service:

### `src/schemas/homeSchema.ts`

```tsx
export const homeSchemaRu = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FabLab CFYI",
  "alternateName": [
    "Фаблаб CFYI Ташкент",
    "Fablab CFYI Toshkent"
  ],
  "url": "https://fablab-cfyi.uz",
  "logo": "https://fablab-cfyi.uz/fablab/logo.png",
  "description": "Цифровая лаборатория в Ташкенте, предоставляющая услуги 3D печати, прототипирования, и производства.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Uzbekistan",
    "addressLocality": "Tashkent",
    "addressRegion": "Tashkent"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service",
      "availableLanguage": ["Russian", "Uzbek", "English"]
    }
  ],
  "sameAs": [
    "https://facebook.com/fablabcfyi",
    "https://instagram.com/fablabcfyi",
    "https://twitter.com/fablabcfyi"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги FabLab CFYI",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "3D печать в Ташкенте",
        "description": "Профессиональные услуги 3D печати в Ташкенте",
        "url": "https://fablab-cfyi.uz/3d-printing"
      },
      {
        "@type": "Offer",
        "name": "Литье пластмасс в Ташкенте",
        "description": "Услуги литья пластмасс и изготовления форм",
        "url": "https://fablab-cfyi.uz/mould"
      },
      {
        "@type": "Offer",
        "name": "Лазерная резка и ЧПУ фрезеровка",
        "description": "Услуги лазерной резки и ЧПУ фрезеровки в Ташкенте",
        "url": "https://fablab-cfyi.uz/digital-fabrication"
      },
      {
        "@type": "Offer",
        "name": "3D сканирование объектов",
        "description": "Профессиональное 3D сканирование в Ташкенте",
        "url": "https://fablab-cfyi.uz/3d-scanning"
      },
      {
        "@type": "Offer",
        "name": "Курсы 3D моделирования",
        "description": "Обучение 3D технологиям в Ташкенте",
        "url": "https://fablab-cfyi.uz/courses"
      }
    ]
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "FabLab CFYI",
  "alternateName": [
    "Фаблаб CFYI Ташкент",
    "Fablab CFYI Toshkent"
  ],
  "image": "https://fablab-cfyi.uz/fablab/logo.png",
  "logo": "https://fablab-cfyi.uz/fablab/logo.png",
  "url": "https://fablab-cfyi.uz",
  "telephone": "+998770884977",
  "description": "Цифровая лаборатория в Ташкенте, предоставляющая услуги 3D печати, прототипирования, и производства.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Tashkent",
    "addressRegion": "Tashkent",
    "postalCode": "Your Postal Code",
    "addressCountry": "UZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "YOUR_LATITUDE",
    "longitude": "YOUR_LONGITUDE"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "₽₽",
  "currenciesAccepted": "UZS",
  "paymentAccepted": "Cash, Credit Card",
  "areaServed": {
    "@type": "City",
    "name": "Tashkent"
  }
};

// Combined schema for homepage
export const combinedHomeSchema = [homeSchemaRu, localBusinessSchema];
```

### `src/schemas/printingSchema.ts`

```tsx
export const printingSchemaRu = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "3D печать в Ташкенте",
  "alternateName": [
    "3D printing in Tashkent",
    "3D bosib chiqarish Toshkent"
  ],
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
      "contactType": "customer service",
      "availableLanguage": ["Russian", "Uzbek", "English"]
    }
  },
  "description": "Профессиональные услуги 3D печати в Ташкенте. Печать на 3D принтере из различных материалов для прототипирования и производства.",
  "areaServed": {
    "@type": "City",
    "name": "Tashkent"
  },
  "serviceType": "3D печать",
  "offers": {
    "@type": "Offer",
    "description": "Услуги 3D печати пластиком, изготовление прототипов на 3D принтере",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/3dprinters/hero.webp",
  "url": "https://fablab-cfyi.uz/3d-printing",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги 3D печати",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "FDM 3D печать",
        "description": "Печать методом послойного наплавления из различных пластиков"
      },
      {
        "@type": "Offer",
        "name": "SLA 3D печать",
        "description": "Стереолитография с высокой точностью из фотополимерных смол"
      },
      {
        "@type": "Offer",
        "name": "Промышленная 3D печать",
        "description": "Крупномасштабная и высокообъемная 3D печать"
      }
    ]
  },
  "keywords": "3D печать Ташкент, заказать 3D печать Узбекистан, печать на 3D принтере цена, услуги 3D печати пластиком, 3D печать деталей Ташкент"
};

// Create breadcrumb schema
export const printingBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://fablab-cfyi.uz/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Услуги 3D печати",
      "item": "https://fablab-cfyi.uz/3d-printing"
    }
  ]
};

// Create FAQ schema
export const printingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Сколько стоит 3D печать в Ташкенте?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Стоимость 3D печати зависит от объема модели, выбранного материала и сложности. Базовые цены начинаются от X сум за кубический сантиметр. Для получения точной цены, пожалуйста, свяжитесь с нами или отправьте вашу 3D модель для расчета."
      }
    },
    {
      "@type": "Question",
      "name": "Какие материалы вы используете для 3D печати?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предлагаем широкий спектр материалов для 3D печати, включая PLA, ABS, PETG, нейлон, TPU (гибкий пластик), а также фотополимерные смолы для SLA печати. Каждый материал имеет свои уникальные свойства, подходящие для различных применений."
      }
    }
  ]
};

// Combined schema for 3D printing page
export const combinedPrintingSchema = [printingSchemaRu, printingBreadcrumbSchema, printingFaqSchema];
```

Create similar schema files for the other service pages following the templates in `LOCALIZED_SCHEMA_TEMPLATES.md`.

## Step 4: Update Page Components with Localized Content

Update your page components to include Russian/Uzbek headings and content:

### Example for 3D Printing Page

```tsx
// src/pages/3DPrinting.tsx

import { combinedPrintingSchema } from "../schemas/printingSchema";

// Inside your component
return (
  <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
    <SEOHelmet
      title="3D печать в Ташкенте | Профессиональные услуги 3D печати | FabLab CFYI"
      description="Профессиональные услуги 3D печати в Ташкенте. Печать на 3D принтере из различных материалов для прототипирования и производства."
      keywords="3D печать Ташкент, заказать 3D печать Узбекистан, печать на 3D принтере цена, услуги 3D печати пластиком"
      image="/3dprinters/hero.webp"
      schema={combinedPrintingSchema}
      canonicalPath="/3d-printing"
    />
    <Header />
    
    <main className="flex-grow bg-[#f5f5f7]">
      {/* Hero section */}
      <section className="relative w-full h-screen">
        {/* ... */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-['Magistral']">
                Услуги 3D печати в Ташкенте
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 font-['Magistral']">
                Профессиональная 3D печать из различных материалов для прототипирования и производства
              </p>
              {/* ... */}
            </div>
          </div>
        </div>
      </section>
      
      {/* Rest of the component */}
    </main>
    
    <Footer />
  </div>
);
```

## Step 5: Implement Multilingual Support

For proper multilingual support:

1. Ensure your `i18n` configuration includes Russian and Uzbek languages
2. Create language-specific routes (`/ru/`, `/uz/`, `/en/`)
3. Add proper `hreflang` tags for language versions

### Update `index.html` with hreflang tags:

```html
<!-- Language alternates -->
<link rel="alternate" hreflang="en" href="https://fablab-cfyi.uz/" />
<link rel="alternate" hreflang="ru" href="https://fablab-cfyi.uz/ru/" />
<link rel="alternate" hreflang="uz" href="https://fablab-cfyi.uz/uz/" />
<link rel="alternate" hreflang="x-default" href="https://fablab-cfyi.uz/" />
```

## Step 6: Update Heading Tags with Keywords

For each page, update the heading tags (H1, H2, H3) to include the target keywords:

### Example for Mould Page:

```tsx
// Main heading (H1)
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-['Magistral']">
  Профессиональное литье пластмасс в Ташкенте
</h1>

// Section headings (H2)
<h2 className="text-2xl sm:text-3xl font-bold mb-4 font-['Magistral']">
  Силиконовые формы на заказ
</h2>

// Sub-section headings (H3)
<h3 className="text-xl font-bold mb-2 font-['Magistral']">
  Производство пластиковых деталей
</h3>
```

## Step 7: Optimize Image Alt Text

Update all image alt texts to include relevant keywords:

```tsx
<img 
  src="/mould/hero.webp" 
  alt="Литье пластмасс и изготовление форм в Ташкенте - FabLab CFYI" 
  className="w-full h-full object-cover"
/>
```

## Step 8: Create a Sitemap for Each Language

Generate language-specific sitemaps:

1. Create `sitemap_ru.xml` for Russian pages
2. Create `sitemap_uz.xml` for Uzbek pages
3. Create a sitemap index file that references all sitemaps

### Example sitemap index file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://fablab-cfyi.uz/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://fablab-cfyi.uz/sitemap_ru.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://fablab-cfyi.uz/sitemap_uz.xml</loc>
  </sitemap>
</sitemapindex>
```

## Step 9: Submit to Google Search Console

After implementing all changes:

1. Submit your updated sitemap to Google Search Console
2. Request indexing of your key pages
3. Monitor the indexing status and search performance

## Step 10: Monitor and Refine

1. Set up regular monitoring of your search performance
2. Track rankings for your target Russian and Uzbek keywords
3. Analyze which keywords are bringing traffic
4. Refine your strategy based on the data

## Implementation Checklist

- [ ] Fix 403 errors
- [ ] Update page titles and meta descriptions with Russian/Uzbek keywords
- [ ] Create schema files for each service
- [ ] Update page components with localized content
- [ ] Implement proper multilingual support
- [ ] Update heading tags with keywords
- [ ] Optimize image alt text
- [ ] Create language-specific sitemaps
- [ ] Submit to Google Search Console
- [ ] Set up monitoring and refinement process

By following this implementation guide, you'll optimize your website for the local Uzbekistan market, focusing on the keywords and languages that your potential customers are actually using to search for your services. 