# Localized Schema Templates for fablab-cfyi.uz

These schema templates are optimized with Russian and Uzbek keywords to improve your local search visibility in Uzbekistan.

## Multilingual Organization Schema (For Homepage)

```javascript
{
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
}
```

## 3D Printing Service Schema (With Russian Keywords)

```javascript
{
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
}
```

## Mould Manufacturing Schema (With Russian Keywords)

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Литье пластмасс и изготовление форм в Ташкенте",
  "alternateName": [
    "Mold manufacturing in Tashkent",
    "Qolip quyish Toshkent"
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
  "description": "Профессиональные услуги литья пластмасс и изготовления форм в Ташкенте. Литье под давлением, силиконовые формы и массовое производство для промышленных применений.",
  "areaServed": {
    "@type": "City",
    "name": "Tashkent"
  },
  "serviceType": "Литье пластмасс",
  "offers": {
    "@type": "Offer",
    "description": "Литье пластмасс, изготовление силиконовых форм, производство пластиковых деталей",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/mould/hero.webp",
  "url": "https://fablab-cfyi.uz/mould",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги литья",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Литье под давлением",
        "description": "Профессиональное литье пластмасс под давлением"
      },
      {
        "@type": "Offer",
        "name": "Силиконовые формы",
        "description": "Изготовление силиконовых форм и отливка изделий"
      },
      {
        "@type": "Offer",
        "name": "Массовое производство",
        "description": "Возможности массового производства пластиковых изделий"
      }
    ]
  },
  "keywords": "литье пластмасс Ташкент, изготовление форм для литья Узбекистан, силиконовые формы на заказ, производство пластиковых деталей, литье под давлением цена Ташкент"
}
```

## Digital Fabrication Schema (With Russian Keywords)

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Лазерная резка и ЧПУ фрезеровка в Ташкенте",
  "alternateName": [
    "Digital fabrication in Tashkent",
    "Raqamli ishlab chiqarish Toshkent"
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
  "description": "Услуги лазерной резки и ЧПУ фрезеровки в Ташкенте. Точное изготовление деталей для промышленных и коммерческих применений.",
  "areaServed": {
    "@type": "City",
    "name": "Tashkent"
  },
  "serviceType": "Цифровое производство",
  "offers": {
    "@type": "Offer",
    "description": "Лазерная резка, ЧПУ фрезеровка и точное производство деталей",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/digital-fabrication/hero.webp",
  "url": "https://fablab-cfyi.uz/digital-fabrication",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги цифрового производства",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Лазерная резка",
        "description": "Высокоточная лазерная резка различных материалов"
      },
      {
        "@type": "Offer",
        "name": "ЧПУ фрезеровка",
        "description": "Точная фрезеровка на станках с ЧПУ"
      },
      {
        "@type": "Offer",
        "name": "Точное производство",
        "description": "Передовые производственные решения для сложных проектов",
        "url": "https://fablab-cfyi.uz/digital-fabrication/precision-manufacturing"
      }
    ]
  },
  "keywords": "лазерная резка Ташкент, ЧПУ фрезеровка Узбекистан, гравировка на станках ЧПУ, лазерная резка акрила цена, фрезеровка алюминия Ташкент"
}
```

## 3D Scanning Schema (With Russian Keywords)

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "3D сканирование в Ташкенте",
  "alternateName": [
    "3D scanning in Tashkent",
    "3D skanlash Toshkent"
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
  "description": "Профессиональные услуги 3D сканирования в Ташкенте. Высокоточное сканирование для обратного проектирования, контроля качества и цифрового сохранения.",
  "areaServed": {
    "@type": "City",
    "name": "Tashkent"
  },
  "serviceType": "3D сканирование",
  "offers": {
    "@type": "Offer",
    "description": "Высокоточные услуги 3D сканирования для различных применений",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/3d-scanning/hero.webp",
  "url": "https://fablab-cfyi.uz/3d-scanning",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги 3D сканирования",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Сканирование объектов",
        "description": "Высокоточное сканирование физических объектов"
      },
      {
        "@type": "Offer",
        "name": "Обратное проектирование",
        "description": "Создание цифровых моделей по физическим деталям"
      },
      {
        "@type": "Offer",
        "name": "Контроль качества",
        "description": "Проверка размеров и контроль качества"
      }
    ]
  },
  "keywords": "3D сканирование объектов Ташкент, услуги 3D сканера Узбекистан, 3D сканирование деталей цена, обратное проектирование по 3D сканам"
}
```

## Courses Schema (With Russian Keywords)

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Курсы 3D моделирования и печати в Ташкенте",
  "alternateName": [
    "3D modeling courses in Tashkent",
    "3D modellashtirish kurslari Toshkent"
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
  "description": "Образовательные курсы по 3D моделированию, 3D печати и дизайну в Ташкенте. Получите практические навыки от экспертов отрасли.",
  "areaServed": {
    "@type": "City",
    "name": "Tashkent"
  },
  "serviceType": "Образовательные услуги",
  "offers": {
    "@type": "Offer",
    "description": "Профессиональные курсы обучения технологиям цифрового производства",
    "priceCurrency": "UZS",
    "availability": "https://schema.org/InStock"
  },
  "image": "https://fablab-cfyi.uz/courses/hero.webp",
  "url": "https://fablab-cfyi.uz/courses",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Образовательные курсы",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Введение в 3D печать",
        "description": "Изучите основы технологии 3D печати и её применения",
        "provider": {
          "@type": "Organization",
          "name": "FabLab CFYI",
          "sameAs": "https://fablab-cfyi.uz"
        }
      },
      {
        "@type": "Course",
        "name": "Продвинутое цифровое производство",
        "description": "Освойте продвинутые техники цифрового производства",
        "provider": {
          "@type": "Organization",
          "name": "FabLab CFYI",
          "sameAs": "https://fablab-cfyi.uz"
        }
      },
      {
        "@type": "Course",
        "name": "3D дизайн для производства",
        "description": "Научитесь проектировать для различных производственных процессов",
        "provider": {
          "@type": "Organization",
          "name": "FabLab CFYI",
          "sameAs": "https://fablab-cfyi.uz"
        }
      }
    ]
  },
  "keywords": "курсы 3D моделирования Ташкент, обучение 3D печати Узбекистан, курсы по цифровому производству, мастер-классы по 3D технологиям"
}
```

## LocalBusiness Schema (For Better Local SEO)

```javascript
{
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
}
```

## BreadcrumbList Schema (With Russian Titles)

```javascript
{
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
      "name": "Услуги 3D печати", // Change for each page
      "item": "https://fablab-cfyi.uz/3d-printing" // Change for each page
    }
  ]
}
```

## FAQ Schema (With Common Questions in Russian)

```javascript
{
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
    },
    {
      "@type": "Question",
      "name": "Как долго занимает изготовление детали на 3D принтере?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Время изготовления зависит от размера, сложности и требуемого качества детали. Небольшие простые детали могут быть готовы за несколько часов, в то время как большие или сложные проекты могут занять несколько дней. Мы всегда предоставляем оценку времени при расчете стоимости."
      }
    },
    {
      "@type": "Question",
      "name": "Вы предоставляете услуги 3D моделирования?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, мы предлагаем профессиональные услуги 3D моделирования. Наши дизайнеры могут создать 3D модель по вашим чертежам, фотографиям или даже словесному описанию. Также мы можем модифицировать существующие 3D модели под ваши требования."
      }
    }
  ]
}
```

## How to Implement These Schemas

1. For each service page, update the schema object in your SEOHelmet component call:

```tsx
// Import the schema from a separate file or define it in the component
import { mouldSchemaRu } from "../schemas/mouldSchema";

// Inside your component's return statement
return (
  <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
    <SEOHelmet
      title="Литье пластмасс и изготовление форм в Ташкенте | FabLab CFYI"
      description="Профессиональные услуги литья пластмасс в Ташкенте. Изготовление силиконовых форм и производство пластиковых деталей."
      keywords="литье пластмасс Ташкент, изготовление форм для литья Узбекистан, силиконовые формы на заказ, производство пластиковых деталей"
      image="/mould/hero.webp"
      schema={mouldSchemaRu}
      canonicalPath="/mould"
    />
    {/* Rest of your component */}
  </div>
);
```

2. Make sure to customize each schema with accurate information about your services and location.

3. Test your structured data using Google's Rich Results Test tool: https://search.google.com/test/rich-results

4. For multilingual pages, implement the appropriate schema for each language version. 