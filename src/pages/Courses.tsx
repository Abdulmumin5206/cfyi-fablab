import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseModal from '../components/CourseModal';
import WorkshopModal from '../components/WorkshopModal';
import courseDetails from '../data/courseDetails.json';

const CoursesPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [courses, setCourses] = useState(courseDetails);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);

  useEffect(() => {
    // Ensure course details are loaded
    if (!courseDetails) {
      console.error('Course details not loaded correctly');
      return;
    }
    setCourses(courseDetails);
  }, []);

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

  // Helper function to safely access nested properties
  const getCourseData = (courseType: string, courseId: string, property: string) => {
    try {
      return courses[courseType]?.[courseId]?.[currentLang]?.[property];
    } catch (error) {
      console.error(`Error accessing course data: ${error}`);
      return null;
    }
  };

  // Helper function to safely access labels
  const getLabels = (courseType: string) => {
    try {
      return courses[courseType]?.labels?.[currentLang];
    } catch (error) {
      console.error(`Error accessing labels: ${error}`);
      return {};
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.fdm.features.expert.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.fdm.features.expert.description")}</p>
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
                  <span className="text-gray-600">{getLabels('fdmCourses')?.course1}</span> {getCourseData('fdmCourses', 'hobbyistEssentials', 'title')}
                </h3>
                <p className="text-gray-700 mb-4">{getCourseData('fdmCourses', 'hobbyistEssentials', 'subtitle')}</p>
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
                  <span className="text-gray-600">{getLabels('fdmCourses')?.course2}</span> {getCourseData('fdmCourses', 'comprehensivePro', 'title')}
                </h3>
                <p className="text-gray-700 mb-4">{getCourseData('fdmCourses', 'comprehensivePro', 'subtitle')}</p>
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
          title={getCourseData('fdmCourses', 'hobbyistEssentials', 'title')}
          subtitle={getCourseData('fdmCourses', 'hobbyistEssentials', 'subtitle')}
          whatYouLearn={getCourseData('fdmCourses', 'hobbyistEssentials', 'whatYouLearn')}
          whatYouGet={getCourseData('fdmCourses', 'hobbyistEssentials', 'whatYouGet')}
          bonusModule={getCourseData('fdmCourses', 'hobbyistEssentials', 'bonusModule')}
          details={getCourseData('fdmCourses', 'hobbyistEssentials', 'details')}
          labels={getLabels('fdmCourses')}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'comprehensive'}
          onClose={handleCloseModal}
          title={getCourseData('fdmCourses', 'comprehensivePro', 'title')}
          subtitle={getCourseData('fdmCourses', 'comprehensivePro', 'subtitle')}
          whatYouMaster={getCourseData('fdmCourses', 'comprehensivePro', 'whatYouMaster')}
          advancedTopics={getCourseData('fdmCourses', 'comprehensivePro', 'advancedTopics')}
          details={getCourseData('fdmCourses', 'comprehensivePro', 'details')}
          labels={getLabels('fdmCourses')}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'sla'}
          onClose={handleCloseModal}
          title={getCourseData('slaCourses', 'completeMastery', 'title')}
          subtitle={getCourseData('slaCourses', 'completeMastery', 'subtitle')}
          coreCurriculum={getCourseData('slaCourses', 'completeMastery', 'coreCurriculum')}
          postProcessing={getCourseData('slaCourses', 'completeMastery', 'postProcessing')}
          handsOnExperience={getCourseData('slaCourses', 'completeMastery', 'handsOnExperience')}
          details={getCourseData('slaCourses', 'completeMastery', 'details')}
          labels={getLabels('slaCourses')}
          currentLang={currentLang}
        />

        <CourseModal
          isOpen={selectedCourse === 'cadcam'}
          onClose={handleCloseModal}
          title={getCourseData('cadcamCourses', 'professionalMastery', 'title')}
          subtitle={getCourseData('cadcamCourses', 'professionalMastery', 'subtitle')}
          cadFundamentals={getCourseData('cadcamCourses', 'professionalMastery', 'cadFundamentals')}
          advancedDesign={getCourseData('cadcamCourses', 'professionalMastery', 'advancedDesign')}
          camIntegration={getCourseData('cadcamCourses', 'professionalMastery', 'camIntegration')}
          manufacturingProcesses={getCourseData('cadcamCourses', 'professionalMastery', 'manufacturingProcesses')}
          industryApplications={getCourseData('cadcamCourses', 'professionalMastery', 'industryApplications')}
          softwareCovered={getCourseData('cadcamCourses', 'professionalMastery', 'softwareCovered')}
          details={getCourseData('cadcamCourses', 'professionalMastery', 'details')}
          labels={getLabels('cadcamCourses')}
          currentLang={currentLang}
        />

        <Footer bgClass="bg-black" textClass="text-white" />
      </main>
    </div>
  );
};

export default CoursesPage; 