import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CoursesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative w-full h-screen bg-white">
          <img 
            src="/courses/hero.webp" 
            alt="Courses Hero" 
            className="w-full h-full object-cover"
          />
          {/* Scroll Down Icon */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </section>

        {/* 3D Printing FDM Course Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
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

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="px-8 py-4 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']">
                    {t("courses.fdm.buttons.enroll")}
                  </button>
                </div>
              </div>

              {/* Right side image grid */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/fdm1.webp" 
                        alt="FDM Basics" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/fdm2.webp" 
                        alt="FDM Advanced" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/fdm3.webp" 
                        alt="FDM Projects" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/fdm4.webp" 
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

        {/* 3D Printing SLA Course Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Content side */}
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

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="px-8 py-4 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']">
                    {t("courses.sla.buttons.enroll")}
                  </button>
                </div>
              </div>

              {/* Image side */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/sla1.webp" 
                        alt="SLA Basics" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/sla2.webp" 
                        alt="SLA Advanced" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/sla3.webp" 
                        alt="SLA Projects" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/sla4.webp" 
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

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="px-8 py-4 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']">
                    {t("courses.precision.buttons.enroll")}
                  </button>
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

        {/* CAD Design with Fusion360 Course Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Content side */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    {t("courses.cad.badge")}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-['Magistral']">
                  {t("courses.cad.title")}
                </h2>
                
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
                  {t("courses.cad.description")}
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
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.cad.features.handsOn.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.cad.features.handsOn.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.cad.features.expert.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.cad.features.expert.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("courses.cad.features.certification.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("courses.cad.features.certification.description")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="px-8 py-4 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']">
                    {t("courses.cad.buttons.enroll")}
                  </button>
                </div>
              </div>

              {/* Image side */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/cad1.webp" 
                        alt="CAD Basics" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/cad2.webp" 
                        alt="CAD Advanced" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/cad3.webp" 
                        alt="CAD Projects" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/courses/cad4.webp" 
                        alt="CAD Software" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                  <button className="w-full px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']">
                    {t("courses.workshops.buttons.enroll")}
                  </button>
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
                  <button className="w-full px-6 py-3 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']">
                    {t("courses.workshops.buttons.enroll")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer bgClass="bg-black" textClass="text-white" />
      </main>
    </div>
  );
};

export default CoursesPage; 