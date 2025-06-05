import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const TrainingSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#f7f7f7]">
      <div className="max-w-[1300px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Left side content */}
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5">
            <div className="inline-block">
              <span className="bg-[#329db7]/10 text-[#329db7] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                {t('training.ourCourses')}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {t('training.masterManufacturing')}
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              {t('training.description')}
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#329db7]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {t('training.diverseSelection.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('training.diverseSelection.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#329db7]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {t('training.expertInstructors.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('training.expertInstructors.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#329db7]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {t('training.handsOnProjects.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('training.handsOnProjects.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base"
              >
                {t('training.exploreCourses')}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-[#329db7] hover:text-[#329db7] transition-all duration-300 text-sm sm:text-base">
                {t('training.downloadBrochure')}
              </button>
            </div>
          </div>

          {/* Right side image grid */}
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="space-y-2 sm:space-y-3">
                <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/main/training/training.webp" 
                    alt="3D Printing Course" 
                    className="w-full h-32 sm:h-36 lg:h-40 object-cover"
                  />
                </div>
                <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/main/training/training2.webp" 
                    alt="Laser Cutting Workshop" 
                    className="w-full h-40 sm:h-44 lg:h-48 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6">
                <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/main/training/training3.webp" 
                    alt="CNC Machining Class" 
                    className="w-full h-40 sm:h-44 lg:h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/main/training/training4.webp" 
                    alt="Digital Fabrication Lab" 
                    className="w-full h-32 sm:h-36 lg:h-40 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{t('training.courseFormat')}</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900">{t('training.handsOnLearning')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{t('training.duration')}</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900">{t('training.durationTime')}</p>
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
