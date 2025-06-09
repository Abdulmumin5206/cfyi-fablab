import React, { useEffect } from 'react';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  whatYouLearn?: {
    items: string[];
  };
  whatYouGet?: {
    items: string[];
  };
  whatYouMaster?: {
    items: string[];
  };
  advancedTopics?: {
    items: string[];
  };
  bonusModule?: {
    items: string[];
  };
  coreCurriculum?: {
    items: string[];
  };
  postProcessing?: {
    items: string[];
  };
  handsOnExperience?: {
    items: string[];
  };
  cadFundamentals?: {
    items: string[];
  };
  advancedDesign?: {
    items: string[];
  };
  camIntegration?: {
    items: string[];
  };
  manufacturingProcesses?: {
    items: string[];
  };
  industryApplications?: {
    items: string[];
  };
  softwareCovered?: {
    items: string[];
  };
  details: {
    duration: string;
    level: string;
    prerequisites: string;
  };
  labels: {
    whatYouLearn?: string;
    whatYouGet?: string;
    whatYouMaster?: string;
    advancedTopics?: string;
    bonusModule?: string;
    duration: string;
    level: string;
    prerequisites: string;
    coreCurriculum?: string;
    postProcessing?: string;
    handsOnExperience?: string;
    cadFundamentals?: string;
    advancedDesign?: string;
    camIntegration?: string;
    manufacturingProcesses?: string;
    industryApplications?: string;
    softwareCovered?: string;
  };
}

const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  whatYouLearn,
  whatYouGet,
  whatYouMaster,
  advancedTopics,
  bonusModule,
  coreCurriculum,
  postProcessing,
  handsOnExperience,
  cadFundamentals,
  advancedDesign,
  camIntegration,
  manufacturingProcesses,
  industryApplications,
  softwareCovered,
  details,
  labels,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="mt-2 text-gray-600">{subtitle}</p>
            </div>

            {/* Course Content */}
            <div className="space-y-6">
              {whatYouLearn && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{labels.whatYouLearn}</h4>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                    {whatYouLearn.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {whatYouGet && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{labels.whatYouGet}</h4>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                    {whatYouGet.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What You Master Section */}
              {whatYouMaster && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.whatYouMaster}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {whatYouMaster.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Advanced Topics Section */}
              {advancedTopics && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.advancedTopics}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {advancedTopics.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Core Curriculum Section */}
              {coreCurriculum && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.coreCurriculum}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {coreCurriculum.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Post Processing Section */}
              {postProcessing && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.postProcessing}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {postProcessing.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hands-on Experience Section */}
              {handsOnExperience && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.handsOnExperience}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {handsOnExperience.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CAD Fundamentals Section */}
              {cadFundamentals && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.cadFundamentals}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {cadFundamentals.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Advanced Design Section */}
              {advancedDesign && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.advancedDesign}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {advancedDesign.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CAM Integration Section */}
              {camIntegration && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.camIntegration}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {camIntegration.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Manufacturing Processes Section */}
              {manufacturingProcesses && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.manufacturingProcesses}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {manufacturingProcesses.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Industry Applications Section */}
              {industryApplications && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.industryApplications}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {industryApplications.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Software Covered Section */}
              {softwareCovered && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{labels.softwareCovered}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {softwareCovered.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bonus Module Section */}
              {bonusModule && bonusModule.items && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{labels.bonusModule || 'Bonus Module'}</h4>
                  <p className="mt-2 text-gray-700">{bonusModule.items.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Course Details */}
            <div className="flex flex-wrap gap-4">
              <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                {labels.duration}: {details.duration}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                {labels.level}: {details.level}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                {labels.prerequisites}: {details.prerequisites}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal; 