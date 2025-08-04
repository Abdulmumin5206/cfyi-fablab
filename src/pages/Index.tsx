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
  
  // Define multilingual SEO titles and descriptions
  const seoData = {
    en: {
      title: "FabLab CFYI - 3D Printing & Digital Fabrication Services in Tashkent",
      description: "Professional 3D printing, scanning, molding and digital fabrication services in Tashkent, Uzbekistan. Innovation hub for prototyping and manufacturing.",
      keywords: "FabLab CFYI, 3D printing Tashkent, digital fabrication Uzbekistan, prototyping services, 3D scanning"
    },
    ru: {
      title: "FabLab CFYI - 3D печать и цифровое производство в Ташкенте",
      description: "Профессиональные услуги 3D печати, сканирования, литья и цифрового производства в Ташкенте. Центр инноваций для прототипирования.",
      keywords: "FabLab CFYI, 3D печать Ташкент, цифровое производство Узбекистан, прототипирование, 3D сканирование"
    },
    uz: {
      title: "FabLab CFYI - Toshkentda 3D bosib chiqarish va raqamli ishlab chiqarish",
      description: "Toshkentda professional 3D bosib chiqarish, skanerlash, quyma va raqamli ishlab chiqarish xizmatlari. Prototiplash uchun innovatsiya markazi.",
      keywords: "FabLab CFYI, 3D bosib chiqarish Toshkent, raqamli ishlab chiqarish O'zbekiston, prototiplash, 3D skanerlash"
    }
  };

  // Define enhanced Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.webp",
    "description": currentLang === "ru" ? "Ведущая лаборатория цифрового производства в Ташкенте, Узбекистан. Профессиональные услуги 3D печати, 3D сканирования, литья, прототипирования и инженерные решения." : 
                   currentLang === "uz" ? "Toshkent, O'zbekistondagi yetakchi raqamli ishlab chiqarish laboratoriyasi. Professional 3D bosib chiqarish, 3D skanerlash, quyma, prototiplash va muhandislik xizmatlari." : 
                   "Leading digital fabrication laboratory in Tashkent, Uzbekistan. Professional 3D printing, 3D scanning, molding, prototyping and engineering solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent",
      "addressRegion": "Tashkent"
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
          "description": currentLang === "ru" ? "Профессиональные услуги 3D печати" : 
                         currentLang === "uz" ? "Professional 3D bosib chiqarish xizmatlari" : 
                         "Professional 3D printing services",
          "url": "https://fablab-cfyi.uz/3d-printing-tashkent"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Литье и производство" : 
                  currentLang === "uz" ? "Quyma va ishlab chiqarish" : 
                  "Molding & Production",
          "description": currentLang === "ru" ? "Услуги литья под давлением и производства" : 
                         currentLang === "uz" ? "Bosim ostida quyma va ishlab chiqarish xizmatlari" : 
                         "Injection molding and production services",
          "url": "https://fablab-cfyi.uz/mould"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Цифровое производство" : 
                  currentLang === "uz" ? "Raqamli ishlab chiqarish" : 
                  "Digital Fabrication",
          "description": currentLang === "ru" ? "Продвинутые услуги цифрового производства" : 
                         currentLang === "uz" ? "Raqamli ishlab chiqarishning ilg'or xizmatlari" : 
                         "Advanced digital fabrication services",
          "url": "https://fablab-cfyi.uz/digital-fabrication"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "3D сканирование" : 
                  currentLang === "uz" ? "3D skanerlash" : 
                  "3D Scanning",
          "description": currentLang === "ru" ? "Высокоточные услуги 3D сканирования" : 
                         currentLang === "uz" ? "Yuqori aniqlikdagi 3D skanerlash xizmatlari" : 
                         "High-precision 3D scanning services",
          "url": "https://fablab-cfyi.uz/3d-scanning-services"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Образовательные курсы" : 
                  currentLang === "uz" ? "Ta'lim kurslari" : 
                  "Educational Courses",
          "description": currentLang === "ru" ? "Курсы обучения цифровому производству" : 
                         currentLang === "uz" ? "Raqamli ishlab chiqarish bo'yicha o'quv kurslari" : 
                         "Digital fabrication training courses",
          "url": "https://fablab-cfyi.uz/courses"
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "description": currentLang === "ru" ? "3D печать, 3D сканирование, услуги цифрового производства" : 
                     currentLang === "uz" ? "3D bosib chiqarish, 3D skanerlash, raqamli ishlab chiqarish xizmatlari" : 
                     "3D Printing, 3D Scanning, Digital Fabrication services",
      "availability": "https://schema.org/InStock"
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
    <div className="min-h-screen flex flex-col">
      <SEOHelmet
        title={seoData[currentLang as keyof typeof seoData]?.title || seoData.en.title}
        description={seoData[currentLang as keyof typeof seoData]?.description || seoData.en.description}
        keywords={seoData[currentLang as keyof typeof seoData]?.keywords || seoData.en.keywords}
        image="/main/scrolling2.webp"
        schema={homeSchema}
        canonicalPath="/"
      />
      <Header />
      <main className="bg-[#f5f5f7]">
        <HeroSection />
        <ServiceCategories />
        <HorizontalScrollSection />
        <AboutUsSection />
        <ScrollImageSlider />
        <ImageFabLabTour />
        <MembershipSection />
        <TrainingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
