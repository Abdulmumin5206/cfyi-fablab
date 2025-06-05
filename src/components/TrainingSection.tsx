import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const TrainingSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#f7f7f7]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Left side content */}
          <div className="w-full lg:w-1/2 space-y-5 md:space-y-6">
            <div className="inline-block">
              <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full">
                {t('training.ourCourses')}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {t('training.masterManufacturing')}
            </h2>
            
            <p className="text-base sm:text-lg lg:text-lg text-gray-600">
              {t('training.description')}
            </p>

            <div className="space-y-3 md:space-y-4">
              {/* Course Features */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('training.diverseSelection.title')}</h3>
                  <p className="text-sm text-gray-600">{t('training.diverseSelection.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('training.expertInstructors.title')}</h3>
                  <p className="text-sm text-gray-600">{t('training.expertInstructors.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('training.handsOnProjects.title')}</h3>
                  <p className="text-sm text-gray-600">{t('training.handsOnProjects.description')}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link 
                to="/courses" 
                className="px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center justify-center text-sm"
              >
                {t('training.exploreCourses')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-[#329db7] hover:text-[#329db7] transition-all duration-300 text-sm">
                {t('training.downloadBrochure')}
              </button>
            </div>
          </div>

          {/* Right side image grid */}
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/main/training/training.webp" 
                    alt="3D Printing Course" 
                    className="w-full h-36 sm:h-40 lg:h-44 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/main/training/training2.webp" 
                    alt="Laser Cutting Workshop" 
                    className="w-full h-48 sm:h-52 lg:h-56 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/main/training/training3.webp" 
                    alt="CNC Machining Class" 
                    className="w-full h-48 sm:h-52 lg:h-56 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="/main/training/training4.webp" 
                    alt="Digital Fabrication Lab" 
                    className="w-full h-36 sm:h-40 lg:h-44 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 max-w-[220px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">{t('training.courseFormat')}</p>
                  <p className="text-base font-bold text-gray-900">{t('training.handsOnLearning')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#329db7]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">{t('training.duration')}</p>
                  <p className="text-base font-bold text-gray-900">{t('training.durationTime')}</p>
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
