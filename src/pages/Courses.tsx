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
  const { t, i18n } = useTranslation('courses');
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

  // Course Card Component
  const CourseCard = ({ 
    image, 
    title, 
    subtitle, 
    duration, 
    level, 
    onViewDetails, 
    onEnroll,
    category 
  }: {
    image: string;
    title: string;
    subtitle: string;
    duration: string;
    level: string;
    onViewDetails: () => void;
    onEnroll: () => void;
    category?: string;
  }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row h-auto lg:h-64">
        {/* Image Section */}
        <div className="relative w-full lg:w-80 h-64 lg:h-full flex-shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent lg:bg-gradient-to-t"></div>
          {category && (
            <div className="absolute top-4 left-4">
              <span className="bg-[#329db7] text-white text-sm font-semibold px-3 py-1 rounded-full font-['Magistral']">
                {category}
              </span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 font-['Magistral']">
              {title}
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 text-base lg:text-lg leading-relaxed font-['Magistral']">
              {subtitle}
            </p>
            
            <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-['Magistral']">{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="font-['Magistral']">{level}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onViewDetails}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 font-['Magistral'] text-center"
            >
              {t("courses.viewDetails")}
            </button>
            <button
              onClick={onEnroll}
              className="flex-1 px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg font-['Magistral']"
            >
              {t("courses.enrollNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-['Magistral']">
              {t("courses.hero.title", "Professional Training Courses")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-['Magistral']">
              {t("courses.hero.description", "Master 3D printing, digital fabrication, and advanced manufacturing with hands-on training from industry experts.")}
            </p>
          </div>
        </section>

        {/* FDM Courses Section */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-['Magistral']">
                {t("courses.fdm.sectionTitle", "FDM 3D Printing Courses")}
              </h2>
              <p className="text-gray-600 text-lg font-['Magistral']">
                {t("courses.fdm.sectionDescription", "Learn Fused Deposition Modeling from basics to professional level")}
              </p>
            </div>
            
            <div className="space-y-8">
              <CourseCard
                image="/3dprinters/course1.webp"
                title={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'title'])}
                subtitle={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'subtitle'])}
                duration={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'details', 'duration'])}
                level={safeAccess(fdmCourses, ['hobbyistEssentials', displayLang, 'details', 'level'])}
                category={t("courses.fdm.badge")}
                onViewDetails={() => handleOpenModal('hobbyist')}
                onEnroll={() => window.open('https://t.me/+998770884977', '_blank')}
              />
              
              <CourseCard
                image="/3dprinters/course2.webp"
                title={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'title'])}
                subtitle={safeAccess(fdmCourses, ['comprehensivePro', displayLang, 'subtitle'])}
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
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-['Magistral']">
                {t("courses.sla.sectionTitle", "SLA Resin Printing Courses")}
              </h2>
              <p className="text-gray-600 text-lg font-['Magistral']">
                {t("courses.sla.sectionDescription", "Master high-precision stereolithography printing techniques")}
              </p>
            </div>
            
            <div className="space-y-8">
              <CourseCard
                image="/3dprinters/slacourse1.webp"
                title={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'title'])}
                subtitle={safeAccess(courseDetails.slaCourses, ['completeMastery', displayLang, 'subtitle'])}
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
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-['Magistral']">
                {t("courses.precision.sectionTitle", "CAD/CAM & Precision Manufacturing")}
              </h2>
              <p className="text-gray-600 text-lg font-['Magistral']">
                {t("courses.precision.sectionDescription", "Professional design and manufacturing workflow training")}
              </p>
            </div>
            
            <div className="space-y-8">
              <CourseCard
                image="/courses/precision1.webp"
                title={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'title'])}
                subtitle={safeAccess(courseDetails.cadcamCourses.professionalMastery, [displayLang, 'subtitle'])}
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
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-['Magistral']">
                {t("courses.workshops.title")}
              </h2>
              <p className="text-gray-600 text-lg font-['Magistral']">
                {t("courses.workshops.description", "Intensive hands-on workshops for rapid skill development")}
              </p>
            </div>
            
            <div className="space-y-8">
              <CourseCard
                image="/courses/workshop1.webp"
                title={t("courses.workshops.digitalFabrication.title")}
                subtitle={t("courses.workshops.digitalFabrication.description")}
                duration={t("courses.workshops.digitalFabrication.duration")}
                level={t("courses.workshops.digitalFabrication.level")}
                category={t("courses.workshops.badge", "Workshop")}
                onViewDetails={() => handleOpenWorkshopModal('digitalFabrication')}
                onEnroll={() => window.open('https://t.me/+998770884977', '_blank')}
              />
              
              <CourseCard
                image="/courses/workshop2.webp"
                title={t("courses.workshops.scanning.title")}
                subtitle={t("courses.workshops.scanning.description")}
                duration={t("courses.workshops.scanning.duration")}
                level={t("courses.workshops.scanning.level")}
                category={t("courses.workshops.badge", "Workshop")}
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