import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

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
    <section className="py-16 md:py-24 bg-[#f7f7f7]">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12">
          {/* Left side content */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="inline-block mb-4">
                <span className="bg-[#329db7]/10 text-[#329db7] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  {t('training.ourCourses')}
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight text-gray-900">
                {t('training.masterManufacturing')}
              </h2>
              
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                {t('training.description')}
              </p>

              <div className="space-y-4 sm:space-y-5 w-full">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  {t('training.exploreCourses')}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <button className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-[#329db7] hover:text-[#329db7] transition-all duration-300 text-sm sm:text-base">
                  {t('training.downloadBrochure')}
                  <Download className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right side image grid */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <img 
                    src="/main/training/training.webp" 
                    alt="3D Printing Course" 
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <img 
                    src="/main/training/training2.webp" 
                    alt="Laser Cutting Workshop" 
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </motion.div>
              </div>
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <img 
                    src="/main/training/training3.webp" 
                    alt="CNC Machining Class" 
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <img 
                    src="/main/training/training4.webp" 
                    alt="Digital Fabrication Lab" 
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white p-4 sm:p-5 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3 sm:gap-4">
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
              <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
