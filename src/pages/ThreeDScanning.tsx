import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";
import GradientText from "@/components/GradientText";

const ThreeDScanningPage = () => {
  const { t, i18n } = useTranslation('3dscanning');
  
  const currentLang = i18n.language;

  // Define multilingual SEO titles and descriptions
  const seoData = {
    en: {
      title: "3D Scanning Services in Tashkent | Professional 3D Scanning | FabLab CFYI",
      description: "Professional 3D scanning services in Tashkent, Uzbekistan. High-precision 3D scanning for reverse engineering, quality control, digital archiving, and prototyping with advanced scanning technology.",
      keywords: "3D scanning Tashkent, 3D scanning services Uzbekistan, reverse engineering, quality control scanning, high precision 3D scanner, digital archiving, 3D metrology, EinScan scanner"
    },
    ru: {
      title: "3D сканирование в Ташкенте | Профессиональные услуги 3D сканирования | FabLab CFYI",
      description: "Профессиональные услуги 3D сканирования в Ташкенте, Узбекистан. Высокоточное 3D сканирование для обратного инжиниринга, контроля качества, цифрового архивирования и прототипирования.",
      keywords: "3D сканирование Ташкент, услуги 3D сканирования Узбекистан, обратный инжиниринг, контроль качества, высокоточный 3D сканер, цифровое архивирование, 3D метрология, сканер EinScan"
    },
    uz: {
      title: "Toshkentda 3D skanerlash xizmatlari | Professional 3D skanerlash | FabLab CFYI",
      description: "Toshkent, O'zbekistonda professional 3D skanerlash xizmatlari. Yuqori aniqlikdagi 3D skanerlash, teskari muhandislik, sifat nazorati, raqamli arxivlash va prototiplash uchun.",
      keywords: "3D skanerlash Toshkent, 3D skanerlash xizmatlari O'zbekiston, teskari muhandislik, sifat nazorati, yuqori aniqlikli 3D skaner, raqamli arxivlash, 3D metrologiya, EinScan skaner"
    }
  };

  // Define JSON-LD schema for 3D Scanning page
  const scanningSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": currentLang === "ru" ? "Услуги 3D сканирования в Ташкенте" : 
            currentLang === "uz" ? "Toshkentda 3D skanerlash xizmatlari" : 
            "3D Scanning Services in Tashkent",
    "provider": {
      "@type": "Organization",
      "name": "FabLab CFYI",
      "url": "https://fablab-cfyi.uz",
      "logo": "https://fablab-cfyi.uz/fablab/logo.webp",
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
    "serviceType": "3D Scanning",
    "description": currentLang === "ru" ? "Профессиональные услуги 3D сканирования в Ташкенте с использованием высокоточных сканеров для обратного инжиниринга, контроля качества и цифрового архивирования." : 
                   currentLang === "uz" ? "Toshkentda professional 3D skanerlash xizmatlari, teskari muhandislik, sifat nazorati va raqamli arxivlash uchun yuqori aniqlikli skanerlar bilan." : 
                   "Professional 3D scanning services in Tashkent with high precision scanners for reverse engineering, quality control, and digital archiving.",
    "areaServed": {
      "@type": "Country",
      "name": "Uzbekistan"
    },
    "offers": {
      "@type": "Offer",
      "description": currentLang === "ru" ? "Профессиональные услуги 3D сканирования" : 
                     currentLang === "uz" ? "Professional 3D skanerlash xizmatlari" : 
                     "Professional 3D scanning services",
      "priceCurrency": "UZS",
      "availability": "https://schema.org/InStock"
    },
    "image": "https://fablab-cfyi.uz/3d-scanning/scanning.webp",
    "url": "https://fablab-cfyi.uz/3d-scanning-services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": currentLang === "ru" ? "Услуги 3D сканирования" : 
              currentLang === "uz" ? "3D skanerlash xizmatlari" : 
              "3D Scanning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Высокоточное 3D сканирование" : 
                  currentLang === "uz" ? "Yuqori aniqlikli 3D skanerlash" : 
                  "High-Precision 3D Scanning",
          "description": currentLang === "ru" ? "Высокоразрешающее сканирование для детальных моделей" : 
                         currentLang === "uz" ? "Batafsil modellar uchun yuqori aniqlikli skanerlash" : 
                         "High-resolution scanning for detailed models"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Обратный инжиниринг" : 
                  currentLang === "uz" ? "Teskari muhandislik" : 
                  "Reverse Engineering",
          "description": currentLang === "ru" ? "Воссоздание физических объектов в виде цифровых моделей" : 
                         currentLang === "uz" ? "Jismoniy obyektlarni raqamli modellar sifatida qayta yaratish" : 
                         "Recreate physical objects as digital models"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Контроль качества" : 
                  currentLang === "uz" ? "Sifat nazorati" : 
                  "Quality Control",
          "description": currentLang === "ru" ? "Инспекция и проверка изготовленных деталей" : 
                         currentLang === "uz" ? "Ishlab chiqarilgan qismlarni tekshirish va nazorat qilish" : 
                         "Inspection and verification of manufactured parts"
        },
        {
          "@type": "Offer",
          "name": currentLang === "ru" ? "Цифровое архивирование" : 
                  currentLang === "uz" ? "Raqamli arxivlash" : 
                  "Digital Archiving",
          "description": currentLang === "ru" ? "Создание цифровых записей физических объектов" : 
                         currentLang === "uz" ? "Jismoniy obyektlarning raqamli yozuvlarini yaratish" : 
                         "Create digital records of physical objects"
        }
      ]
    }
  };

  // Define breadcrumb schema
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
        "name": currentLang === "ru" ? "Услуги 3D сканирования" : 
                currentLang === "uz" ? "3D skanerlash xizmatlari" : 
                "3D Scanning Services",
        "item": "https://fablab-cfyi.uz/3d-scanning-services"
      }
    ]
  };

  // Add FAQ schema for common questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": currentLang === "ru" ? "Сколько стоит 3D сканирование в Ташкенте?" : 
                currentLang === "uz" ? "Toshkentda 3D skanerlash qancha turadi?" : 
                "How much does 3D scanning cost in Tashkent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === "ru" ? "Стоимость 3D сканирования зависит от размера объекта, требуемой точности и сложности проекта. Свяжитесь с нами для получения индивидуального расчета." : 
                  currentLang === "uz" ? "3D skanerlash narxi obyektning hajmi, talab qilinadigan aniqlik va loyihaning murakkabligiga bog'liq. Individual hisob-kitob olish uchun biz bilan bog'laning." : 
                  "The cost of 3D scanning depends on object size, required accuracy, and project complexity. Contact us for an individual calculation."
        }
      },
      {
        "@type": "Question",
        "name": currentLang === "ru" ? "Какая точность 3D сканирования?" : 
                currentLang === "uz" ? "3D skanerlashning aniqligi qanday?" : 
                "What is the accuracy of 3D scanning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === "ru" ? "Наши 3D сканеры обеспечивают точность до 0.05 мм, что позволяет получать высокодетализированные модели для различных применений, включая обратный инжиниринг и контроль качества." : 
                  currentLang === "uz" ? "Bizning 3D skanerlarimiz 0.05 mm gacha aniqlik ta'minlaydi, bu teskari muhandislik va sifat nazorati kabi turli ilovalar uchun yuqori batafsil modellar olish imkonini beradi." : 
                  "Our 3D scanners provide accuracy up to 0.05mm, enabling highly detailed models for various applications including reverse engineering and quality control."
        }
      },
      {
        "@type": "Question",
        "name": currentLang === "ru" ? "Какие объекты можно сканировать?" : 
                currentLang === "uz" ? "Qanday obyektlarni skanerlash mumkin?" : 
                "What objects can be 3D scanned?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === "ru" ? "Мы можем сканировать широкий спектр объектов: от мелких деталей до крупных изделий. Подходят объекты из металла, пластика, керамики, дерева и других материалов. Размер может варьироваться от нескольких миллиметров до нескольких метров." : 
                  currentLang === "uz" ? "Biz keng ko'lamli obyektlarni skanerlashimiz mumkin: kichik qismlardan tortib katta buyumlargacha. Metall, plastik, keramika, yog'och va boshqa materiallardan yasalgan obyektlar mos keladi. Hajmi bir necha millimetrdan bir necha metrgacha bo'lishi mumkin." : 
                  "We can scan a wide range of objects: from small parts to large items. Objects made of metal, plastic, ceramic, wood, and other materials are suitable. Size can range from a few millimeters to several meters."
        }
      },
      {
        "@type": "Question",
        "name": currentLang === "ru" ? "Сколько времени занимает 3D сканирование?" : 
                currentLang === "uz" ? "3D skanerlash qancha vaqt oladi?" : 
                "How long does 3D scanning take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === "ru" ? "Время сканирования зависит от размера и сложности объекта. Простые объекты можно отсканировать за 30-60 минут, сложные проекты могут занять несколько часов. Обработка данных обычно занимает 1-3 дня." : 
                  currentLang === "uz" ? "Skanerlash vaqti obyektning hajmi va murakkabligiga bog'liq. Oddiy obyektlarni 30-60 daqiqada skanerlash mumkin, murakkab loyihalar bir necha soat davom etishi mumkin. Ma'lumotlarni qayta ishlash odatda 1-3 kun davom etadi." : 
                  "Scanning time depends on object size and complexity. Simple objects can be scanned in 30-60 minutes, complex projects may take several hours. Data processing typically takes 1-3 days."
        }
      }
    ]
  };

  // Combine schemas for SEO
  const combinedSchema = [scanningSchema, breadcrumbSchema, faqSchema];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    console.log("3D Scanning page mounted");
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <SEOHelmet
        title={seoData[currentLang]?.title || seoData.en.title}
        description={seoData[currentLang]?.description || seoData.en.description}
        keywords={seoData[currentLang]?.keywords || seoData.en.keywords}
        image="/3d-scanning/scanning.webp"
        schema={combinedSchema}
        canonicalPath="/3d-scanning-services"
      />
      <Header />
      
      <main className="flex-grow bg-[#f5f5f7]">
        {/* High-Resolution 3D Scanning Section */}
        <section className="section-spacing bg-[#f5f5f7] pt-40 md:pt-48">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-[1200px]l mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <div className="section-title-wrapper">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                    >
                      {t("highResolution.title")}
                    </GradientText>
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t("highResolution.description")}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("highResolution.features.accuracy")}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("highResolution.features.textureMapping")}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("highResolution.features.fileFormats")}</p>
                    </div>
                  </div>

                  <a 
                    href="#equipment"
                    onClick={(e) => {
                      e.preventDefault();
                      const equipmentSection = document.getElementById('equipment');
                      if (equipmentSection) {
                        equipmentSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t("highResolution.cta")}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/3d-scanning/scanning.webp" 
                    alt="3D Scanning Technology" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-[1200px]l mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <div className="section-title-wrapper">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                    >
                      {t("applications.title")}
                    </GradientText>
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t("applications.description")}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("applications.features.reverseEngineering")}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("applications.features.qualityControl")}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("applications.features.digitalArchiving")}</p>
                    </div>
                  </div>

                  <a 
                    href="#guide"
                    onClick={(e) => {
                      e.preventDefault();
                      const guideSection = document.getElementById('guide');
                      if (guideSection) {
                        guideSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t("applications.cta")}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/3d-scanning/scanning2.webp" 
                    alt="3D Scanning Applications" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Showcase Section */}
        <section id="equipment" className="section-spacing bg-[#f5f5f7]">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-title-wrapper text-center">
              <div className="flex justify-center">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('equipment.title')}
                </GradientText>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
              {/* EinScan SP V2 Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-[400px] bg-white overflow-hidden">
                  <img src="/3d-scanning/3D SCANNER EINSCAN SP V2.webp" alt={t('equipment.einScanSPV2.title')} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-6 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">{t('equipment.einScanSPV2.category')}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center">{t('equipment.einScanSPV2.title')}</h3>
                  <p className="text-gray-700 text-center text-xs sm:text-sm md:text-base">{t('equipment.einScanSPV2.description')}</p>
                </div>
              </div>

              {/* Autoscan Inspec Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-[400px] bg-white overflow-hidden">
                  <img src="/3d-scanning/3D SCANNER AUTOSCAN-INSPEC.webp" alt={t('equipment.autoscanInspec.title')} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-6 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">{t('equipment.autoscanInspec.category')}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center">{t('equipment.autoscanInspec.title')}</h3>
                  <p className="text-gray-700 text-center text-xs sm:text-sm md:text-base">{t('equipment.autoscanInspec.description')}</p>
                </div>
              </div>

              {/* EinScan H Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-[400px] bg-white overflow-hidden">
                  <img src="/3d-scanning/3D SCANNER EINSCAN H.webp" alt={t('equipment.einScanH.title')} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-6 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">{t('equipment.einScanH.category')}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center">{t('equipment.einScanH.title')}</h3>
                  <p className="text-gray-700 text-center text-xs sm:text-sm md:text-base">{t('equipment.einScanH.description')}</p>
                </div>
              </div>

              {/* Academia 50 Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-[400px] bg-white overflow-hidden">
                  <img src="/3d-scanning/SYS-ACA-SC50P1 ACADEMIA 50.webp" alt={t('equipment.academia50.title')} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-6 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">{t('equipment.academia50.category')}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center">{t('equipment.academia50.title')}</h3>
                  <p className="text-gray-700 text-center text-xs sm:text-sm md:text-base">{t('equipment.academia50.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EinScan SP V2 Guide Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/3d-scanning/SP2.webp" 
                    alt={t('serviceCategories.3dScanning.guide.einScanSPV2.imageAlt')}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>

              {/* Right side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-[1300px] mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <div className="section-title-wrapper">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                    >
                      {t('guide.einScanSPV2.title')}
                    </GradientText>
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t('guide.einScanSPV2.description')}
                  </p>

                  <a 
                    href="#guide"
                    onClick={(e) => {
                      e.preventDefault();
                      const guideSection = document.getElementById('guide');
                      if (guideSection) {
                        guideSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t('guide.einScanSPV2.cta')}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    {t('contactSection.badge')}
                  </span>
                </div>
                
                <div className="section-title-wrapper">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                  >
                    {t('contactSection.title')}
                  </GradientText>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-600 font-['Magistral']">
                  {t('contactSection.description')}
                </p>

                <a 
                  href="https://t.me/+998770884977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']"
                >
                  <span>{t('contactSection.cta')}</span>
                  <ArrowRight size={20} />
                </a>
              </div>

              {/* Right side image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="/3d-scanning/contact.webp" 
                    alt="Contact Us" 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ThreeDScanningPage; 