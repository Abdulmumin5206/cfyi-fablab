import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseModal from '../components/CourseModal';
import WorkshopModal from '../components/WorkshopModal';
import courseDetails from '../data/courseDetails.json';
import SEOHelmet from '../components/SEOHelmet';
import GradientText from '../components/GradientText';

interface CourseItemList {
  items: string[];
}

interface CourseBasicInfo {
  duration: string;
  level: string;
  prerequisites: string;
}

interface CourseDetails extends CourseBasicInfo {
  whatYouLearn?: string;
  whatYouGet?: string;
  whatYouMaster?: string;
  advancedTopics?: string;
  bonusModule?: string;
  coreCurriculum?: string;
  practicalProjects?: string;
  certification?: string;
  careerOpportunities?: string;
  industryApplications?: string;
  softwareCovered?: string;
}

interface CourseSection {
  introduction: CourseItemList;
  highlights: CourseItemList;
  equipment: CourseItemList;
  basicInfo: CourseBasicInfo;
  details: CourseDetails;
}

interface CourseLabels {
  [key: string]: {
    [key: string]: string;
  };
}

interface CourseData {
  labels: CourseLabels;
  hobbyistEssentials: CourseSection;
  comprehensivePro: CourseSection;
  masterClass: CourseSection;
  [key: string]: unknown;
}

const CoursesPage = () => {
  const { t, i18n } = useTranslation('courses');
  const currentLang = i18n.language;
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Define JSON-LD schema for Courses page
  const coursesSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "3D Printing and Digital Fabrication Courses",
    "provider": {
      "@type": "Organization",
      "name": "FabLab CFYI",
      "url": "https://fablab-cfyi.uz"
    },
    "description": "Comprehensive 3D printing and digital fabrication courses including FDM, SLA, and advanced manufacturing techniques with hands-on training and certification.",
    "courseMode": "onsite",
    "offers": {
      "@type": "Offer",
      "description": "Professional training courses in 3D printing and digital fabrication"
    }
  };
  
  // Determine the language to use for displaying course details
  const displayLang = courseDetails.fdmCourses.labels && courseDetails.fdmCourses.labels[currentLang] 
    ? currentLang 
    : (courseDetails.fdmCourses.labels && courseDetails.fdmCourses.labels['en'] ? 'en' : Object.keys(courseDetails.fdmCourses.labels || {})[0]);

  // Popular Questions Data
  const popularQuestions = [
    {
      id: 1,
      question: t("courses.popularQuestions.q1.question"),
      answer: t("courses.popularQuestions.q1.answer"),
      color: "bg-[#cb2026]"
    },
    {
      id: 2,
      question: t("courses.popularQuestions.q2.question"),
      answer: t("courses.popularQuestions.q2.answer"),
      color: "bg-[#0e9a48]"
    },
    {
      id: 3,
      question: t("courses.popularQuestions.q3.question"),
      answer: t("courses.popularQuestions.q3.answer"),
      color: "bg-[#35469d]"
    },
    {
      id: 4,
      question: t("courses.popularQuestions.q4.question"),
      answer: t("courses.popularQuestions.q4.answer"),
      color: "bg-[#8a2be2]"
    },
    {
      id: 5,
      question: t("courses.popularQuestions.q5.question"),
      answer: t("courses.popularQuestions.q5.answer"),
      color: "bg-[#ff6b6b]"
    },
    {
      id: 6,
      question: t("courses.popularQuestions.q6.question"),
      answer: t("courses.popularQuestions.q6.answer"),
      color: "bg-[#f39c12]"
    }
  ];

  useEffect(() => {
    // Add error handling and debugging
    console.log('Current language:', currentLang);
    console.log('Display language:', displayLang);
    console.log('Course details:', courseDetails);
    console.log('FDM Courses:', courseDetails.fdmCourses);
    console.log('FDM Course Labels for displayLang:', courseDetails.fdmCourses.labels ? courseDetails.fdmCourses.labels[displayLang] : 'No labels available');
    
    // Ensure course details are loaded
    if (!courseDetails || !courseDetails.fdmCourses) {
      console.error('Course details or FDM courses not found');
      return;
    }

    // Check if labels exist for current language
    if (!courseDetails.fdmCourses.labels || !courseDetails.fdmCourses.labels[currentLang]) {
      console.error('Labels not found for language:', currentLang);
      console.log('Available languages in labels:', courseDetails.fdmCourses.labels ? Object.keys(courseDetails.fdmCourses.labels) : 'No labels found');
    }
  }, [currentLang, displayLang]);

  if (!courseDetails || !courseDetails.fdmCourses) {
    return <div>{t("courses.ui.loading")}</div>;
  }

  const fdmCourses = courseDetails.fdmCourses as unknown as CourseData;
  
  // Check if labels exist for current language and get fallback language if needed
  if (!fdmCourses.labels || !fdmCourses.labels[currentLang]) {
    const fallbackLang = fdmCourses.labels && fdmCourses.labels['en'] ? 'en' : Object.keys(fdmCourses.labels || {})[0];
    if (!fallbackLang) {
      return <div>{t("courses.ui.error")}</div>;
    }
    console.log('Using fallback language:', fallbackLang);
  }

  const handleOpenModal = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  const handleOpenWorkshopModal = (workshopId: string) => {
    setSelectedWorkshop(workshopId);
  };

  const handleCloseWorkshopModal = () => {
    setSelectedWorkshop(null);
  };

  // Slider navigation functions
  const handleScrollLeft = () => {
    if (isTransitioning || currentSlide === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => Math.max(0, prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleScrollRight = () => {
    if (isTransitioning || currentSlide >= popularQuestions.length - 2) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => Math.min(popularQuestions.length - 2, prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Safe access function
  const safeAccess = (obj: Record<string, unknown>, path: string[], fallback: string = 'Loading...') => {
    try {
      let current: unknown = obj;
      for (const key of path) {
        if (current && typeof current === 'object' && key in current) {
          current = (current as Record<string, unknown>)[key];
        } else {
          console.warn(`Path not found: ${path.join('.')} at ${key}`);
          return fallback;
        }
      }
      return (current as string) || fallback;
    } catch (error) {
      console.error('Error accessing path:', path, error);
      return fallback;
    }
  };

  // Safe access function for arrays
  const safeAccessArray = (obj: Record<string, unknown>, path: string[], fallback: string[] = []): string[] => {
    try {
      let current: unknown = obj;
      for (const key of path) {
        if (current && typeof current === 'object' && key in current) {
          current = (current as Record<string, unknown>)[key];
        } else {
          console.warn(`Path not found: ${path.join('.')} at ${key}`);
          return fallback;
        }
      }
      return Array.isArray(current) ? (current as string[]) : fallback;
    } catch (error) {
      console.error('Error accessing path:', path, error);
      return fallback;
    }
  };

  // Popular Question Card Component
  const PopularQuestionCard = ({ 
    question,
    answer
  }: {
    question: string;
    answer: string;
  }) => (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden"
    >
      <div className="p-8 flex flex-col h-full min-h-[280px]">
        {/* Question icon */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#329db7] hover:text-white transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-['Magistral'] leading-tight flex-1">
            {question}
          </h3>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <p className="text-gray-600 font-['Magistral'] text-sm leading-relaxed mb-6">
            {answer}
          </p>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button className="flex items-center gap-2 text-[#329db7] text-sm font-medium hover:text-[#2b86a0] transition-colors duration-200 font-['Magistral']">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {t("courses.ui.helpful")}
            </button>
            
            <button 
              onClick={() => {
                // Scroll to courses section
                const coursesSection = document.querySelector('#courses-section');
                if (coursesSection) {
                  coursesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors duration-200 font-['Magistral']"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {t("courses.ui.viewCourses")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Improved Course Card Component
  const CourseCard = ({ 
    image, 
    title, 
    subtitle, 
    description,
    duration, 
    level, 
    onViewDetails, 
    onEnroll,
    category 
  }: {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    level: string;
    onViewDetails: () => void;
    onEnroll: () => void;
    category?: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:scale-105 transition-all duration-300 transform">
      <div className="flex flex-col lg:flex-row h-auto">
        {/* Image Section */}
        <div className="relative w-full lg:w-64 h-40 lg:h-auto flex-shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent lg:bg-gradient-to-t"></div>
          {category && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#329db7] text-white text-xs font-semibold px-2 py-1 rounded-full font-['Magistral']">
                {category}
              </span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-4 lg:p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-['Magistral']">
              {title}
            </h3>
            <p className="text-gray-600 mb-2 text-sm leading-relaxed font-['Magistral']">
              {subtitle}
            </p>
            <p className="text-gray-500 text-sm mb-3 font-['Magistral'] line-clamp-2">
              {description}
            </p>
            
            <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-['Magistral']">{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="font-['Magistral']">{level}</span>
              </div>
            </div>
          </div>
          
          {/* Compact Buttons in Right Corner */}
          <div className="flex justify-end gap-2">
            <button
              onClick={onViewDetails}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-all duration-300 font-['Magistral']"
            >
              {t("courses.viewDetails")}
            </button>
            <button
              onClick={onEnroll}
              className="px-3 py-1.5 bg-[#329db7] text-white rounded-md text-xs font-medium hover:bg-[#2b86a0] transition-all duration-300 font-['Magistral']"
            >
              {t("courses.enrollNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <SEOHelmet
        title="3D Printing Courses & Training"
        description="Professional 3D printing and digital fabrication courses in Uzbekistan. Learn FDM, SLA, and advanced manufacturing with hands-on training and certification at FabLab CFYI."
        keywords="курсы 3D печати Ташкент, 3D bosib chiqarish kurslari Toshkent, обучение 3D печати, 3D print ta'limi, курсы FDM, FDM kurslari, обучение SLA, SLA o'rganish, цифровое производство курсы, raqamli ishlab chiqarish kurslari, профессиональное обучение Узбекистан, professional ta'lim, сертификация 3D печати, 3D print sertifikatlashtirish, мастер-классы Ташкент, master klass Toshkent"
        image="/courses/hero.webp"
        schema={coursesSchema}
        canonicalPath="/courses"
      />
      <Header />
      
      <main className="flex-grow bg-[#f5f5f7]">
        {/* Hero Section with Topic Questions */}
        <section className="section-spacing bg-[#f5f5f7] pt-40 md:pt-48">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Topic Questions Section */}
            <div className="mb-8">
              <div className="section-title-wrapper">
                <div className="flex items-baseline gap-1">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                  >
                    {t("courses.sections.popularQuestions.title")}.
                  </GradientText>
                  <span className="text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
                    {t("courses.sections.popularQuestions.subtitle")}.
                  </span>
                </div>
              </div>
              
              {/* Desktop Slider with preview cards */}
              <div className="hidden lg:block relative overflow-hidden">
                <div className="flex items-center">
                  <button
                    onClick={handleScrollLeft}
                    className={`absolute left-4 z-10 transition-all duration-300 top-1/2 -translate-y-1/2 ${
                      currentSlide === 0 ? 'hidden' : 'opacity-100 cursor-pointer'
                    }`}
                    aria-label="Scroll left"
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeft className="w-10 h-10 text-gray-500 hover:text-gray-800" />
                  </button>

                  <div className="w-full overflow-hidden">
                    <div 
                      className="flex transition-transform duration-300 ease-out"
                      style={{
                        transform: `translateX(calc(-${100 / 2.2}% * ${currentSlide}))`,
                        willChange: 'transform'
                      }}
                      ref={sliderRef}
                    >
                      {popularQuestions.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex-shrink-0 transition-all duration-300"
                          style={{
                            flex: '0 0 40%',
                            marginRight: '3%',
                            transform: 'translateZ(0)'
                          }}
                        >
                          <PopularQuestionCard
                            question={item.question}
                            answer={item.answer}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleScrollRight}
                    className={`absolute right-4 z-10 transition-all duration-300 top-1/2 -translate-y-1/2 ${
                      currentSlide >= popularQuestions.length - 2 ? 'hidden' : 'opacity-100 cursor-pointer'
                    }`}
                    aria-label="Scroll right"
                    disabled={currentSlide >= popularQuestions.length - 2}
                  >
                    <ChevronRight className="w-10 h-10 text-gray-500 hover:text-gray-800" />
                  </button>
                </div>
              </div>
              
              {/* Mobile Layout */}
              <div className="lg:hidden">
                <div className="overflow-x-auto -mx-4 px-4">
                  <div className="flex gap-4 py-2 pb-6">
                    {popularQuestions.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex-shrink-0 w-[80vw]"
                        style={{ transform: 'translateZ(0)' }}
                      >
                        <PopularQuestionCard
                          question={item.question}
                          answer={item.answer}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FDM Courses Section */}
        <section className="section-spacing bg-[#f5f5f7]" id="courses-section">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-title-wrapper">
              <div className="flex items-baseline gap-1">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t("courses.sections.fdmPrinting.title")}.
                </GradientText>
                <span className="text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
                  {t("courses.sections.fdmPrinting.subtitle")}.
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <CourseCard
                image="/3dprinters/course1.webp"
                title={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'title'])}
                subtitle=""
                description={t("courses.descriptions.hobbyistEssentials")}
                duration={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'details', 'duration'])}
                level={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'details', 'level'])}
                category={t("courses.fdm.badge")}
                onViewDetails={() => handleOpenModal('hobbyist')}
                onEnroll={() => window.open('https://t.me/+998770884977', '_blank')}
              />
              
              <CourseCard
                image="/3dprinters/course2.webp"
                title={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'title'])}
                subtitle=""
                description={t("courses.descriptions.comprehensivePro")}
                duration={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'details', 'duration'])}
                level={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'details', 'level'])}
                category={t("courses.fdm.badge")}
                onViewDetails={() => handleOpenModal('comprehensive')}
                onEnroll={() => window.open('https://t.me/+998770884977', '_blank')}
              />
            </div>
          </div>
        </section>

        {/* SLA Courses Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-title-wrapper">
              <div className="flex items-baseline gap-1">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t("courses.sections.slaPrinting.title")}.
                </GradientText>
                <span className="text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
                  {t("courses.sections.slaPrinting.subtitle")}.
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <CourseCard
                image="/3dprinters/slacourse1.webp"
                title={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'title'])}
                subtitle=""
                description={t("courses.descriptions.slaCompleteMastery")}
                duration={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'details', 'duration'])}
                level={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'details', 'level'])}
                category={t("courses.sla.badge")}
                onViewDetails={() => handleOpenModal('sla')}
                onEnroll={() => window.open('https://t.me/+998770884977', '_blank')}
              />
            </div>
          </div>
        </section>

        {/* CAD/CAM Courses Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-title-wrapper">
              <div className="flex items-baseline gap-1">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t("courses.sections.cadcamDesign.title")}.
                </GradientText>
                <span className="text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
                  {t("courses.sections.cadcamDesign.subtitle")}.
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <CourseCard
                image="/courses/precision1.webp"
                title={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'title'])}
                subtitle=""
                description={t("courses.descriptions.cadcamProfessionalMastery")}
                duration={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'details', 'duration'])}
                level={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'details', 'level'])}
                category={t("courses.precision.badge")}
                onViewDetails={() => handleOpenModal('cadcam')}
                onEnroll={() => window.open('https://t.me/+998770884977', '_blank')}
              />
            </div>
          </div>
        </section>

        {/* Workshops Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-title-wrapper">
              <div className="flex items-baseline gap-1">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t("courses.sections.intensiveWorkshops.title")}.
                </GradientText>
                <span className="text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
                  {t("courses.sections.intensiveWorkshops.subtitle")}.
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <CourseCard
                image="/courses/workshop1.webp"
                title={t("courses.workshops.digitalFabrication.title")}
                subtitle=""
                description={t("courses.descriptions.digitalFabricationWorkshop")}
                duration={t("courses.workshops.digitalFabrication.duration")}
                level={t("courses.workshops.digitalFabrication.level")}
                category={t("courses.workshops.badge")}
                onViewDetails={() => handleOpenWorkshopModal('digitalFabrication')}
                onEnroll={() => window.open('https://t.me/+998770884977', '_blank')}
              />
              
              <CourseCard
                image="/courses/workshop2.webp"
                title={t("courses.workshops.scanning.title")}
                subtitle=""
                description={t("courses.descriptions.scanningWorkshop")}
                duration={t("courses.workshops.scanning.duration")}
                level={t("courses.workshops.scanning.level")}
                category={t("courses.workshops.badge")}
                onViewDetails={() => handleOpenWorkshopModal('scanning')}
                onEnroll={() => window.open('https://t.me/+998770884977', '_blank')}
              />
            </div>
          </div>
        </section>

        {/* Course Modals */}
        <CourseModal
          isOpen={selectedCourse === 'hobbyist'}
          onClose={handleCloseModal}
          title={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'title'])}
          subtitle={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'subtitle'])}
          whatYouLearn={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'whatYouLearn']) ? { 
            items: safeAccessArray(fdmCourses, ['hobbyistEssentials', displayLang, 'whatYouLearn', 'items'])
          } : undefined}
          whatYouGet={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'whatYouGet']) ? { 
            items: safeAccessArray(fdmCourses, ['hobbyistEssentials', displayLang, 'whatYouGet', 'items'])
          } : undefined}
          bonusModule={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'bonusModule']) ? { 
            items: [safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'bonusModule'])]
          } : undefined}
          details={{
            duration: safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'details', 'duration']),
            level: safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'details', 'level']),
            prerequisites: safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'details', 'prerequisites'])
          }}
          labels={safeAccess(fdmCourses, ['labels', displayLang]) as any}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'comprehensive'}
          onClose={handleCloseModal}
          title={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'title'])}
          subtitle={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'subtitle'])}
          whatYouMaster={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'whatYouMaster']) ? { 
            items: safeAccessArray(fdmCourses, ['comprehensivePro', displayLang, 'whatYouMaster', 'items'])
          } : undefined}
          advancedTopics={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'advancedTopics']) ? { 
            items: safeAccessArray(fdmCourses, ['comprehensivePro', displayLang, 'advancedTopics', 'items'])
          } : undefined}
          details={{
            duration: safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'details', 'duration']),
            level: safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'details', 'level']),
            prerequisites: safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'details', 'prerequisites'])
          }}
          labels={safeAccess(fdmCourses, ['labels', displayLang]) as any}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'sla'}
          onClose={handleCloseModal}
          title={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'title'])}
          subtitle={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'subtitle'])}
          coreCurriculum={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'coreCurriculum']) ? { 
            items: safeAccessArray(courseDetails.slaCourses, ['completeMastery', displayLang, 'coreCurriculum', 'items'])
          } : undefined}
          postProcessing={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'postProcessing']) ? { 
            items: safeAccessArray(courseDetails.slaCourses, ['completeMastery', displayLang, 'postProcessing', 'items'])
          } : undefined}
          handsOnExperience={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'handsOnExperience']) ? { 
            items: safeAccessArray(courseDetails.slaCourses, ['completeMastery', displayLang, 'handsOnExperience', 'items'])
          } : undefined}
          details={{
            duration: safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'details', 'duration']),
            level: safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'details', 'level']),
            prerequisites: safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'details', 'prerequisites'])
          }}
          labels={safeAccess(courseDetails.slaCourses, ['labels', displayLang]) as any}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'cadcam'}
          onClose={handleCloseModal}
          title={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'title'])}
          subtitle={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'subtitle'])}
          cadFundamentals={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'cadFundamentals']) ? { 
            items: safeAccessArray(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'cadFundamentals', 'items'])
          } : undefined}
          advancedDesign={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'advancedDesign']) ? { 
            items: safeAccessArray(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'advancedDesign', 'items'])
          } : undefined}
          camIntegration={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'camIntegration']) ? { 
            items: safeAccessArray(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'camIntegration', 'items'])
          } : undefined}
          manufacturingProcesses={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'manufacturingProcesses']) ? { 
            items: safeAccessArray(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'manufacturingProcesses', 'items'])
          } : undefined}
          industryApplications={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'industryApplications']) ? { 
            items: safeAccessArray(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'industryApplications', 'items'])
          } : undefined}
          softwareCovered={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'softwareCovered']) ? { 
            items: safeAccessArray(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'softwareCovered', 'items'])
          } : undefined}
          details={{
            duration: safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'details', 'duration']),
            level: safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'details', 'level']),
            prerequisites: safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'details', 'prerequisites'])
          }}
          labels={safeAccess(courseDetails.cadcamCourses, ['labels', displayLang]) as any}
          currentLang={currentLang}
        />
        
        {/* Workshop Modals */}
        <WorkshopModal
          isOpen={selectedWorkshop === 'digitalFabrication'}
          onClose={handleCloseWorkshopModal}
          title={t("courses.workshops.digitalFabrication.title")}
          subtitle={t("courses.workshops.digitalFabrication.description")}
          skills={[
            t("courses.workshops.digitalFabrication.skills.skill1"),
            t("courses.workshops.digitalFabrication.skills.skill2"),
            t("courses.workshops.digitalFabrication.skills.skill3"),
            t("courses.workshops.digitalFabrication.skills.skill4"),
            t("courses.workshops.digitalFabrication.skills.skill5"),
            t("courses.workshops.digitalFabrication.skills.skill6")
          ]}
          duration={t("courses.workshops.digitalFabrication.duration")}
          level={t("courses.workshops.digitalFabrication.level")}
          currentLang={currentLang}
        />

        <WorkshopModal
          isOpen={selectedWorkshop === 'scanning'}
          onClose={handleCloseWorkshopModal}
          title={t("courses.workshops.scanning.title")}
          subtitle={t("courses.workshops.scanning.description")}
          skills={[
            t("courses.workshops.scanning.skills.skill1"),
            t("courses.workshops.scanning.skills.skill2"),
            t("courses.workshops.scanning.skills.skill3"),
            t("courses.workshops.scanning.skills.skill4"),
            t("courses.workshops.scanning.skills.skill5"),
            t("courses.workshops.scanning.skills.skill6")
          ]}
          duration={t("courses.workshops.scanning.duration")}
          level={t("courses.workshops.scanning.level")}
          currentLang={currentLang}
        />

        <Footer bgClass="bg-[#212121]" textClass="text-white" />
      </main>
    </div>
  );
};

export default CoursesPage; 