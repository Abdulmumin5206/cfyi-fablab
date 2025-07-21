import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseModal from '../components/CourseModal';
import WorkshopModal from '../components/WorkshopModal';
import courseDetails from '../data/courseDetails.json';
import SEOHelmet from '../components/SEOHelmet';

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
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  
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
    return <div>Loading...</div>;
  }

  const fdmCourses = courseDetails.fdmCourses as unknown as CourseData;
  
  // Check if labels exist for current language and get fallback language if needed
  if (!fdmCourses.labels || !fdmCourses.labels[currentLang]) {
    const fallbackLang = fdmCourses.labels && fdmCourses.labels['en'] ? 'en' : Object.keys(fdmCourses.labels || {})[0];
    if (!fallbackLang) {
      return <div>Error: No language data available</div>;
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

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHelmet
        title="3D Printing Courses & Training"
        description="Professional 3D printing and digital fabrication courses in Uzbekistan. Learn FDM, SLA, and advanced manufacturing with hands-on training and certification at FabLab CFYI."
        keywords="курсы 3D печати Ташкент, 3D bosib chiqarish kurslari Toshkent, обучение 3D печати, 3D print ta'limi, курсы FDM, FDM kurslari, обучение SLA, SLA o'rganish, цифровое производство курсы, raqamli ishlab chiqarish kurslari, профессиональное обучение Узбекистан, professional ta'lim, сертификация 3D печати, 3D print sertifikatlashtirish, мастер-классы Ташкент, master klass Toshkent"
        image="/courses/hero.webp"
        schema={coursesSchema}
        canonicalPath="/courses"
      />
      <Header />
      
      <main className="flex-grow bg-white">
        {/* 3D Printing FDM Course Section */}
        <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    {t("courses.fdm.badge")}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-['Magistral']">
                  {t("courses.fdm.title")}
                </h2>
                
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
                  {t("courses.fdm.description")}
                </p>

                {/* Course Features */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.fdm.features.handsOn.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.fdm.features.handsOn.description")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.fdm.features.expert.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.fdm.features.expert.description")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.fdm.features.certification.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.fdm.features.certification.description")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Images */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/course1.webp" 
                        alt="FDM Basics" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/course2.webp" 
                        alt="FDM Advanced" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/course3.webp" 
                        alt="FDM Projects" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/course4.webp" 
                        alt="FDM Equipment" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FDM Course Details Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
              {/* Course 1: FDM Hobbyist Essentials */}
              <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow">
                <h3 className="text-2xl font-bold text-[#329db7] mb-2">
                  <span className="text-gray-600">{safeAccess(fdmCourses, ['labels', displayLang, 'course1'])}</span> {safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'title'])}
                </h3>
                <p className="text-gray-700 mb-4">{safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'subtitle'])}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleOpenModal('hobbyist')}
                    className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("courses.viewDetails")}
                  </button>
                  <a
                    href="https://t.me/+998770884977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-center"
                  >
                    {t("courses.enrollNow")}
                  </a>
                </div>
              </div>

              {/* Course 2: FDM Comprehensive Pro */}
              <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow">
                <h3 className="text-2xl font-bold text-[#329db7] mb-2">
                  <span className="text-gray-600">{safeAccess(fdmCourses, ['labels', displayLang, 'course2'])}</span> {safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'title'])}
                </h3>
                <p className="text-gray-700 mb-4">{safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'subtitle'])}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleOpenModal('comprehensive')}
                    className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("courses.viewDetails")}
                  </button>
                  <a
                    href="https://t.me/+998770884977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-center"
                  >
                    {t("courses.enrollNow")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Modals */}
        <CourseModal
          isOpen={selectedCourse === 'hobbyist'}
          onClose={handleCloseModal}
          title={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'title'])}
          subtitle={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'subtitle'])}
          whatYouLearn={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'whatYouLearn'])}
          whatYouGet={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'whatYouGet'])}
          bonusModule={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'bonusModule'])}
          details={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'details'])}
          labels={safeAccess(fdmCourses, ['labels', displayLang])}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'comprehensive'}
          onClose={handleCloseModal}
          title={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'title'])}
          subtitle={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'subtitle'])}
          whatYouMaster={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'whatYouMaster'])}
          advancedTopics={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'advancedTopics'])}
          details={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'details'])}
          labels={safeAccess(fdmCourses, ['labels', displayLang])}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'sla'}
          onClose={handleCloseModal}
          title={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'title'])}
          subtitle={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'subtitle'])}
          coreCurriculum={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'coreCurriculum'])}
          postProcessing={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'postProcessing'])}
          handsOnExperience={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'handsOnExperience'])}
          details={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'details'])}
          labels={safeAccess(courseDetails.slaCourses, ['labels', displayLang])}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'cadcam'}
          onClose={handleCloseModal}
          title={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'title'])}
          subtitle={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'subtitle'])}
          cadFundamentals={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'cadFundamentals'])}
          advancedDesign={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'advancedDesign'])}
          camIntegration={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'camIntegration'])}
          manufacturingProcesses={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'manufacturingProcesses'])}
          industryApplications={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'industryApplications'])}
          softwareCovered={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'softwareCovered'])}
          details={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'details'])}
          labels={safeAccess(courseDetails.cadcamCourses, ['labels', displayLang])}
          currentLang={currentLang}
        />

        {/* 3D Printing SLA Course Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    {t("courses.sla.badge")}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-['Magistral']">
                  {t("courses.sla.title")}
                </h2>
                
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
                  {t("courses.sla.description")}
                </p>

                {/* Course Features */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.sla.features.handsOn.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.sla.features.handsOn.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.sla.features.expert.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.sla.features.expert.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.sla.features.certification.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.sla.features.certification.description")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side image grid */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/slacourse1.webp" 
                        alt="SLA Basics" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/slacourse2.webp" 
                        alt="SLA Advanced" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/slacourse3.webp" 
                        alt="SLA Projects" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/slacourse4.webp" 
                        alt="SLA Equipment" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLA Course Details Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              {/* SLA Complete Mastery Course */}
              <div className="w-full max-w-[540px] bg-white rounded-2xl p-6 md:p-8 shadow">
                <h3 className="text-2xl font-bold text-[#329db7] mb-2">
                  <span className="text-gray-600">{safeAccess(courseDetails.slaCourses, ['labels', displayLang, 'course1'])}</span> {safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'title'])}
                </h3>
                <p className="text-gray-700 mb-4">{safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'subtitle'])}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleOpenModal('sla')}
                    className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("courses.viewDetails")}
                  </button>
                  <a
                    href="https://t.me/+998770884977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-center"
                  >
                    {t("courses.enrollNow")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Manufacturing Course Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    {t("courses.precision.badge")}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-['Magistral']">
                  {t("courses.precision.title")}
                </h2>
                
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
                  {t("courses.precision.description")}
                </p>

                {/* Course Features */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.precision.features.handsOn.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.precision.features.handsOn.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.precision.features.expert.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.precision.features.expert.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.precision.features.certification.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.precision.features.certification.description")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side image grid */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/precision1.webp" 
                        alt="Precision Basics" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/precision2.webp" 
                        alt="Precision Advanced" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/precision3.webp" 
                        alt="Precision Projects" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/precision4.webp" 
                        alt="Precision Equipment" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAD/CAM Course Details Section */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex justify-center">
            {/* CAD/CAM Professional Mastery Course */}
            <div className="w-full max-w-[540px] bg-white rounded-2xl p-6 md:p-8 shadow">
              <h3 className="text-2xl font-bold text-[#329db7] mb-2">
                {safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'title'])}
              </h3>
              <p className="text-gray-700 mb-4">{safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'subtitle'])}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleOpenModal('cadcam')}
                  className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t("courses.viewDetails")}
                </button>
                <a
                  href="https://t.me/+998770884977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-center"
                >
                  {t("courses.enrollNow")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Workshops Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 font-['Magistral']">
              {t("courses.workshops.title")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Digital Fabrication Workshop */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <img 
                    src="/courses/workshop1.webp" 
                    alt="Digital Fabrication Workshop" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 font-['Magistral']">
                      {t("courses.workshops.digitalFabrication.title")}
                    </h3>
                    <p className="text-white/90 font-['Magistral']">
                      {t("courses.workshops.digitalFabrication.description")}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("courses.workshops.duration")}</p>
                      <p className="font-semibold text-gray-900">{t("courses.workshops.digitalFabrication.duration")}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleOpenWorkshopModal('digitalFabrication')}
                      className="w-full px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']"
                    >
                      {t("courses.viewDetails")}
                    </button>
                    <a
                      href="https://t.me/+998770884977"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral'] text-center"
                    >
                      {t("courses.workshops.buttons.enroll")}
                    </a>
                  </div>
                </div>
              </div>

              {/* 3D Scanning Workshop */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <img 
                    src="/courses/workshop2.webp" 
                    alt="3D Scanning Workshop" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 font-['Magistral']">
                      {t("courses.workshops.scanning.title")}
                    </h3>
                    <p className="text-white/90 font-['Magistral']">
                      {t("courses.workshops.scanning.description")}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("courses.workshops.duration")}</p>
                      <p className="font-semibold text-gray-900">{t("courses.workshops.scanning.duration")}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleOpenWorkshopModal('scanning')}
                      className="w-full px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']"
                    >
                      {t("courses.viewDetails")}
                    </button>
                    <a
                      href="https://t.me/+998770884977"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral'] text-center"
                    >
                      {t("courses.workshops.buttons.enroll")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
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

        <Footer bgClass="bg-black" textClass="text-white" />
      </main>
    </div>
  );
};

export default CoursesPage; 