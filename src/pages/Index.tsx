import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollImageSlider from "@/components/ScrollImageSlider";
import ImageFabLabTour from "@/components/ImageFabLabTour";
import AboutUsSection from "@/components/AboutUsSection";
import MembershipSection from "@/components/MembershipSection";
import TrainingSection from "@/components/TrainingSection";
import SEOHelmet from "@/components/SEOHelmet";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Define multilingual SEO titles and descriptions with balanced branding and services
  const seoData = {
    titlesByLang: {
      en: "FabLab CFYI Tashkent | 3D Printing & Digital Fabrication Center",
      ru: "FabLab CFYI Ташкент | Центр 3D печати и цифрового производства",
      uz: "FabLab CFYI Toshkent | 3D bosib chiqarish va raqamli ishlab chiqarish markazi"
    },
    descriptionsByLang: {
      en: "Official FabLab CFYI in Tashkent - innovation center for 3D printing, prototyping and digital fabrication. Professional services, courses and equipment.",
      ru: "Официальный FabLab CFYI в Ташкенте - инновационный центр 3D печати, прототипирования и цифрового производства. Профессиональные услуги, курсы и оборудование.",
      uz: "Toshkentdagi rasmiy FabLab CFYI - 3D bosib chiqarish, prototiplash va raqamli ishlab chiqarish innovatsion markazi. Professional xizmatlar, kurslar va uskunalar."
    },
    keywordsByLang: {
      en: "FabLab CFYI Tashkent, fablab Uzbekistan, 3D printing center, digital fabrication lab, 3D printing courses, prototyping services",
      ru: "FabLab CFYI Ташкент, фаблаб Узбекистан, центр 3D печати, лаборатория цифрового производства, курсы 3D печати, услуги прототипирования",
      uz: "FabLab CFYI Toshkent, fablab O'zbekiston, 3D bosib chiqarish markazi, raqamli ishlab chiqarish laboratoriyasi, 3D bosib chiqarish kurslari"
    }
  };

  // Define enhanced Organization schema with balanced branding and services
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.webp",
    "description": currentLang === "ru" ? "Официальный FabLab CFYI в Ташкенте - инновационный центр 3D печати, прототипирования и цифрового производства. Современное оборудование, профессиональные услуги и курсы." : 
                   currentLang === "uz" ? "Toshkentdagi rasmiy FabLab CFYI - 3D bosib chiqarish, prototiplash va raqamli ishlab chiqarish innovatsion markazi. Zamonaviy uskunalar, professional xizmatlar va kurslar." : 
                   "Official FabLab CFYI in Tashkent - innovation center for 3D printing, prototyping and digital fabrication. Modern equipment, professional services and courses.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": currentLang === "ru" ? "Узбекистан" : currentLang === "uz" ? "O'zbekiston" : "Uzbekistan",
      "addressLocality": currentLang === "ru" ? "Ташкент" : currentLang === "uz" ? "Toshkent" : "Tashkent",
      "addressRegion": currentLang === "ru" ? "Ташкент" : currentLang === "uz" ? "Toshkent" : "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service",
      "availableLanguage": ["English", "Russian", "Uzbek"]
    },
    "sameAs": [
      "https://facebook.com/fablabcfyi",
      "https://instagram.com/fablabcfyi",
      "https://twitter.com/fablabcfyi"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": currentLang === "ru" ? "Услуги FabLab CFYI" : 
              currentLang === "uz" ? "FabLab CFYI xizmatlari" : 
              "FabLab CFYI Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "3D печать" : 
                  currentLang === "uz" ? "3D bosib chiqarish" : 
                  "3D Printing",
          "description": currentLang === "ru" ? "Профессиональная 3D печать на современном оборудовании" : 
                         currentLang === "uz" ? "Zamonaviy uskunalarda professional 3D bosib chiqarish" : 
                         "Professional 3D printing on modern equipment",
          "url": "https://fablab-cfyi.uz/3d-printing-tashkent"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Курсы 3D моделирования" : 
                  currentLang === "uz" ? "3D modellashtirish kurslari" : 
                  "3D Modeling Courses",
          "description": currentLang === "ru" ? "Обучение 3D моделированию и печати" : 
                         currentLang === "uz" ? "3D modellashtirish va bosib chiqarishni o'rgatish" : 
                         "3D modeling and printing training",
          "url": "https://fablab-cfyi.uz/courses"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Цифровое производство" : 
                  currentLang === "uz" ? "Raqamli ishlab chiqarish" : 
                  "Digital Fabrication",
          "description": currentLang === "ru" ? "Услуги цифрового производства и прототипирования" : 
                         currentLang === "uz" ? "Raqamli ishlab chiqarish va prototiplash xizmatlari" : 
                         "Digital fabrication and prototyping services",
          "url": "https://fablab-cfyi.uz/digital-fabrication"
        }
      ]
    }
  };

  // Define enhanced LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FabLab CFYI",
    "image": "https://fablab-cfyi.uz/main/scrolling2.webp",
    "url": "https://fablab-cfyi.uz",
    "telephone": "+998770884977",
    "description": currentLang === "ru" ? "Ведущая лаборатория цифрового производства в Ташкенте" : 
                   currentLang === "uz" ? "Toshkentdagi yetakchi raqamli ishlab chiqarish laboratoriyasi" : 
                   "Leading digital fabrication laboratory in Tashkent",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent",
      "addressRegion": "Tashkent"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.311081,
      "longitude": 69.240562
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "15:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "UZS, USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer"
  };

  // Define FAQ schema for common questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": currentLang === "ru" ? "Какие услуги предоставляет FabLab CFYI?" : 
                currentLang === "uz" ? "FabLab CFYI qanday xizmatlarni taqdim etadi?" : 
                "What services does FabLab CFYI provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === "ru" ? "FabLab CFYI предоставляет полный спектр услуг цифрового производства: 3D печать, 3D сканирование, литье под давлением, прототипирование, инженерные решения и образовательные курсы." : 
                  currentLang === "uz" ? "FabLab CFYI raqamli ishlab chiqarishning to'liq spektrini taqdim etadi: 3D bosib chiqarish, 3D skanerlash, bosim ostida quyma, prototiplash, muhandislik yechimlari va ta'lim kurslari." : 
                  "FabLab CFYI provides a full range of digital fabrication services: 3D printing, 3D scanning, injection molding, prototyping, engineering solutions, and educational courses."
        }
      },
      {
        "@type": "Question",
        "name": currentLang === "ru" ? "Где находится FabLab CFYI?" : 
                currentLang === "uz" ? "FabLab CFYI qayerda joylashgan?" : 
                "Where is FabLab CFYI located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === "ru" ? "FabLab CFYI находится в Ташкенте, Узбекистан. Мы работаем с понедельника по пятницу с 9:00 до 18:00 и по субботам с 10:00 до 15:00." : 
                  currentLang === "uz" ? "FabLab CFYI Toshkent, O'zbekistonda joylashgan. Biz dushanbadan jumagacha soat 9:00 dan 18:00 gacha va shanba kunlari soat 10:00 dan 15:00 gacha ishlaymiz." : 
                  "FabLab CFYI is located in Tashkent, Uzbekistan. We work Monday to Friday from 9:00 AM to 6:00 PM and Saturdays from 10:00 AM to 3:00 PM."
        }
      },
      {
        "@type": "Question",
        "name": currentLang === "ru" ? "Как заказать услуги в FabLab CFYI?" : 
                currentLang === "uz" ? "FabLab CFYI da xizmatlarni qanday buyurtma qilish mumkin?" : 
                "How can I order services at FabLab CFYI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === "ru" ? "Вы можете связаться с нами по телефону +998770884977, через наш веб-сайт или посетить нас лично. Мы предоставим консультацию и расчет стоимости для вашего проекта." : 
                  currentLang === "uz" ? "Siz biz bilan +998770884977 raqami orqali, veb-saytimiz orqali yoki shaxsan tashrif buyurish orqali bog'lanishingiz mumkin. Biz sizning loyihangiz uchun maslahat va narx hisobini taqdim etamiz." : 
                  "You can contact us by phone at +998770884977, through our website, or visit us in person. We will provide consultation and cost calculation for your project."
        }
      },
      {
        "@type": "Question",
        "name": currentLang === "ru" ? "Предлагаете ли вы образовательные курсы?" : 
                currentLang === "uz" ? "Siz ta'lim kurslarini taklif qilasizmi?" : 
                "Do you offer educational courses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === "ru" ? "Да, мы предлагаем различные образовательные курсы по цифровому производству, 3D моделированию, прототипированию и инженерному дизайну для всех уровней подготовки." : 
                  currentLang === "uz" ? "Ha, biz raqamli ishlab chiqarish, 3D modellashtirish, prototiplash va muhandislik dizayni bo'yicha turli darajadagi tayyorgarlik uchun ta'lim kurslarini taklif qilamiz." : 
                  "Yes, we offer various educational courses in digital fabrication, 3D modeling, prototyping, and engineering design for all skill levels."
        }
      }
    ]
  };

  // Define WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "description": currentLang === "ru" ? "Официальный сайт FabLab CFYI - ведущей лаборатории цифрового производства в Узбекистане" : 
                   currentLang === "uz" ? "FabLab CFYI ning rasmiy veb-sayti - O'zbekistondagi yetakchi raqamli ishlab chiqarish laboratoriyasi" : 
                   "Official website of FabLab CFYI - leading digital fabrication laboratory in Uzbekistan",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://fablab-cfyi.uz/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Combine all schemas for SEO
  const homeSchema = [organizationSchema, localBusinessSchema, faqSchema, websiteSchema];

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <SEOHelmet 
        titlesByLang={seoData.titlesByLang}
        descriptionsByLang={seoData.descriptionsByLang}
        keywordsByLang={seoData.keywordsByLang}
        schema={organizationSchema}
        image="/main/fablabroom.webp"
      />
      <Header />
      <HeroSection />
      <ServiceCategories />
      <HorizontalScrollSection />
      <AboutUsSection />
      <ScrollImageSlider />
      <ImageFabLabTour />
      <MembershipSection />
      <TrainingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
