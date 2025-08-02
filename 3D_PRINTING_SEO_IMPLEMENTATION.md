# 3D Printing Page SEO Implementation Guide

This guide provides step-by-step instructions for implementing SEO optimizations on the 3D printing page for Russian, Uzbek, and English languages.

## 1. Update SEO Component in 3DPrinting.tsx

### Step 1.1: Add Language-Specific SEO Data Object

Add the following code after the state declarations in the component:

```jsx
// Define multilingual SEO titles and descriptions
const seoData = {
  en: {
    title: "3D Printing Services in Tashkent | Professional 3D Printing | FabLab CFYI",
    description: "Professional 3D printing services in Tashkent with FDM and SLA technologies. High-precision prototyping and functional parts manufacturing.",
    keywords: "3D printing Tashkent, 3D printing services Uzbekistan, FDM printing, SLA printing, rapid prototyping"
  },
  ru: {
    title: "3D печать в Ташкенте | Профессиональные услуги 3D печати | FabLab CFYI",
    description: "Профессиональные услуги 3D печати в Ташкенте. Быстрое изготовление прототипов и деталей из различных материалов на FDM и SLA принтерах.",
    keywords: "3D печать Ташкент, заказать 3D печать Узбекистан, печать на 3D принтере цена, услуги 3D печати пластиком, изготовление прототипов"
  },
  uz: {
    title: "Toshkentda 3D bosib chiqarish | Professional 3D chop etish xizmatlari | FabLab CFYI",
    description: "Toshkentda professional 3D bosib chiqarish xizmatlari. FDM va SLA texnologiyalari bilan prototiplar va funksional qismlarni tez tayyorlash.",
    keywords: "3D bosib chiqarish Toshkent, 3D printer xizmati narxi, 3D modellarni chop etish, plastik 3D chop etish, 3D prototip yasash"
  }
};
```

### Step 1.2: Update SEOHelmet Component Call

Replace the existing SEOHelmet component call with:

```jsx
<SEOHelmet
  title={seoData[currentLang as keyof typeof seoData]?.title || seoData.en.title}
  description={seoData[currentLang as keyof typeof seoData]?.description || seoData.en.description}
  keywords={seoData[currentLang as keyof typeof seoData]?.keywords || seoData.en.keywords}
  image="/3dprinters/hero.webp"
  schema={combinedSchema}
  canonicalPath="/3d-printing"
/>
```

## 2. Update Structured Data

### Step 2.1: Update Service Schema

Replace the existing printingSchema with:

```jsx
const printingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": currentLang === "ru" ? "Услуги 3D печати в Ташкенте" : 
          currentLang === "uz" ? "Toshkentda 3D bosib chiqarish xizmatlari" : 
          "3D Printing Services in Tashkent",
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
  "serviceType": "3D Printing",
  "description": currentLang === "ru" ? "Профессиональные услуги 3D печати в Ташкенте с использованием технологий FDM и SLA. Широкий выбор материалов для прототипирования и функциональных деталей." : 
                 currentLang === "uz" ? "Toshkentda professional 3D bosib chiqarish xizmatlari, FDM va SLA texnologiyalari bilan. Prototiplar va funksional qismlar uchun materiallarning keng tanlovi." : 
                 "Professional 3D printing services in Tashkent including FDM and SLA technologies with a wide range of materials and applications.",
  "areaServed": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "offers": {
    "@type": "Offer",
    "description": currentLang === "ru" ? "Профессиональные услуги 3D печати" : 
                   currentLang === "uz" ? "Professional 3D bosib chiqarish xizmatlari" : 
                   "Professional 3D printing services",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/3dprinters/hero.webp",
  "url": "https://fablab-cfyi.uz/3d-printing",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": currentLang === "ru" ? "Услуги 3D печати" : 
            currentLang === "uz" ? "3D bosib chiqarish xizmatlari" : 
            "3D Printing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": currentLang === "ru" ? "FDM 3D печать" : 
                currentLang === "uz" ? "FDM 3D bosib chiqarish" : 
                "FDM 3D Printing",
        "description": currentLang === "ru" ? "Печать методом послойного наплавления с различными материалами" : 
                       currentLang === "uz" ? "Turli materiallar bilan qatlam qo'shish usuli orqali bosib chiqarish" : 
                       "Fused Deposition Modeling printing with various materials"
      },
      {
        "@type": "Offer",
        "name": currentLang === "ru" ? "SLA 3D печать" : 
                currentLang === "uz" ? "SLA 3D bosib chiqarish" : 
                "SLA 3D Printing",
        "description": currentLang === "ru" ? "Стереолитографическая печать с высокой точностью" : 
                       currentLang === "uz" ? "Yuqori aniqlikdagi stereolitografiya bosib chiqarish" : 
                       "Stereolithography printing with high precision resins"
      },
      {
        "@type": "Offer",
        "name": currentLang === "ru" ? "Быстрое прототипирование" : 
                currentLang === "uz" ? "Tezkor prototiplash" : 
                "Rapid Prototyping",
        "description": currentLang === "ru" ? "Быстрое изготовление прототипов" : 
                       currentLang === "uz" ? "Prototiplarni tez tayyorlash" : 
                       "Quick turnaround prototype production"
      }
    ]
  }
};
```

### Step 2.2: Update Breadcrumb Schema

Replace the existing breadcrumbSchema with:

```jsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": currentLang === "ru" ? "Главная" : 
              currentLang === "uz" ? "Bosh sahifa" : 
              "Home",
      "item": "https://fablab-cfyi.uz/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": currentLang === "ru" ? "Услуги 3D печати" : 
              currentLang === "uz" ? "3D bosib chiqarish xizmatlari" : 
              "3D Printing Services",
      "item": "https://fablab-cfyi.uz/3d-printing"
    }
  ]
};
```

### Step 2.3: Add FAQ Schema

Add the following FAQ schema after the breadcrumbSchema:

```jsx
// Add FAQ schema for common questions
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": currentLang === "ru" ? "Сколько стоит 3D печать в Ташкенте?" : 
              currentLang === "uz" ? "Toshkentda 3D bosib chiqarish qancha turadi?" : 
              "How much does 3D printing cost in Tashkent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === "ru" ? "Стоимость 3D печати зависит от размера модели, выбранного материала и сложности. Свяжитесь с нами для получения индивидуального расчета." : 
                currentLang === "uz" ? "3D bosib chiqarish narxi modelning hajmi, tanlangan material va murakkabligiga bog'liq. Individual hisob-kitob olish uchun biz bilan bog'laning." : 
                "The cost of 3D printing depends on the size of the model, selected material, and complexity. Contact us for an individual calculation."
      }
    },
    {
      "@type": "Question",
      "name": currentLang === "ru" ? "Какие материалы для 3D печати вы используете?" : 
              currentLang === "uz" ? "Qanday 3D bosib chiqarish materiallarini ishlatasiz?" : 
              "What 3D printing materials do you use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === "ru" ? "Мы используем широкий спектр материалов, включая PLA, PETG, ABS, нейлон, TPU, а также специальные композитные материалы и фотополимерные смолы для SLA печати." : 
                currentLang === "uz" ? "Biz PLA, PETG, ABS, nylon, TPU, shuningdek maxsus kompozit materiallar va SLA bosib chiqarish uchun fotopolimer smolalar kabi keng ko'lamli materiallardan foydalanamiz." : 
                "We use a wide range of materials including PLA, PETG, ABS, nylon, TPU, as well as special composite materials and photopolymer resins for SLA printing."
      }
    }
  ]
};
```

### Step 2.4: Update Combined Schema

Update the combinedSchema to include all schemas:

```jsx
// Combine schemas for SEO
const combinedSchema = [printingSchema, breadcrumbSchema, faqSchema];
```

## 3. Optimize Image Alt Text

Update the hero image alt text to be language-specific:

```jsx
<img 
  src="/3dprinters/hero.webp" 
  alt={currentLang === "ru" ? "Профессиональная 3D печать в Ташкенте" : 
       currentLang === "uz" ? "Toshkentda professional 3D bosib chiqarish" : 
       "Professional 3D printing in Tashkent"} 
  className="w-full h-full object-cover"
  onLoad={() => setIsImageLoading(false)}
/>
```

## 4. Update SEOHelmet Component

If the SEOHelmet component doesn't already support hreflang tags, update it in `src/components/SEOHelmet.tsx`:

```jsx
// Add this to the useEffect hook in SEOHelmet.tsx
// Update hreflang tags
const hreflangUrls = {
  en: `${baseUrl}/en${location.pathname}`,
  ru: `${baseUrl}/ru${location.pathname}`,
  uz: `${baseUrl}/uz${location.pathname}`
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

## 5. Add Local Business Schema

Add the following LocalBusiness schema to the combinedSchema:

```jsx
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "FabLab CFYI",
  "image": "https://fablab-cfyi.uz/fablab/logo.png",
  "url": "https://fablab-cfyi.uz",
  "telephone": "+998770884977",
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
    "latitude": "Your Latitude",
    "longitude": "Your Longitude"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$"
};

// Update combinedSchema
const combinedSchema = [printingSchema, breadcrumbSchema, faqSchema, localBusinessSchema];
```

## 6. Testing and Validation

After implementing these changes:

1. Test the page in all three languages to ensure the correct metadata is displayed
2. Validate the structured data using Google's Rich Results Test: https://search.google.com/test/rich-results
3. Check the page's mobile responsiveness using Google's Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

## 7. Next Steps After Implementation

1. Submit the updated pages to Google Search Console for indexing
2. Monitor performance in Google Analytics and Search Console
3. Track keyword rankings for the target keywords in all three languages
4. Adjust content based on performance data 