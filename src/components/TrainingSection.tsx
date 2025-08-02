import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import GradientText from "./GradientText";

const TrainingSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('training.diverseSelection.title'),
      description: t('training.diverseSelection.description'),
      icon: <Check className="w-5 h-5 text-[#329db7]" />
    },
    {
      title: t('training.expertInstructors.title'),
      description: t('training.expertInstructors.description'),
      icon: <Check className="w-5 h-5 text-[#329db7]" />
    },
    {
      title: t('training.handsOnProjects.title'),
      description: t('training.handsOnProjects.description'),
      icon: <Check className="w-5 h-5 text-[#329db7]" />
    }
  ];

  return (
    <section className="section-spacing bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          {/* Left side content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="section-title-wrapper">
              <div className="flex items-baseline gap-1">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('training.ourCourses')}
                </GradientText>
                <span className="hidden sm:block text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
                  {t('training.subtitle')}
                </span>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight font-['Magistral']">
              {t('training.masterManufacturing')}
            </h2>
            
            <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4 font-['Magistral']">
              {t('training.description')}
            </p>

            {/* Course Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-['Magistral']">{t('training.diverseSelection.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm font-['Magistral']">{t('training.diverseSelection.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-['Magistral']">{t('training.expertInstructors.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm font-['Magistral']">{t('training.expertInstructors.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-['Magistral']">{t('training.handsOnProjects.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm font-['Magistral']">{t('training.handsOnProjects.description')}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/courses" 
                className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']"
              >
                <span>{t('training.exploreCourses')}</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right side image grid */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/3dprinters/course1.webp" 
                    alt="3D Printing Basics" 
                    className="w-full h-40 sm:h-44 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/3dprinters/course2.webp" 
                    alt="Advanced Techniques" 
                    className="w-full h-56 sm:h-60 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/3dprinters/course3.webp" 
                    alt="Project Work" 
                    className="w-full h-56 sm:h-60 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/3dprinters/course4.webp" 
                    alt="Professional Equipment" 
                    className="w-full h-40 sm:h-44 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
