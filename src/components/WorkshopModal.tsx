import React from 'react';
import { useTranslation } from 'react-i18next';

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  skills: string[];
  duration: string;
  level: string;
  currentLang: string;
}

const WorkshopModal: React.FC<WorkshopModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  skills,
  duration,
  level,
  currentLang,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl max-w-2xl w-full mx-auto shadow-xl">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-['Magistral']">{title}</h2>
                <p className="mt-2 text-gray-600 font-['Magistral']">{subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Skills Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-['Magistral']">
                {t("courses.workshops.skillsTitle")}
              </h3>
              <ul className="space-y-3">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-[#329db7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-['Magistral']">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Duration and Level */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-[#329db7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 font-['Magistral']">{duration}</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-[#329db7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700 font-['Magistral']">{level}</span>
                </div>
              </div>
            </div>

            {/* Language Availability Notice */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                {currentLang === 'en' && "This workshop is available in English, Uzbek, and Russian languages."}
                {currentLang === 'uz' && "Bu workshop ingliz, o'zbek va rus tillarida mavjud."}
                {currentLang === 'ru' && "Этот мастер-класс доступен на английском, узбекском и русском языках."}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-colors duration-300 font-['Magistral']"
              >
                {t("common.close")}
              </button>
              <a
                href="https://t.me/+998770884977"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']"
              >
                {t("courses.enrollNow")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopModal; 