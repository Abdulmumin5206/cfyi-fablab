import { motion } from "framer-motion";
import { Check, Users, Target, BookOpen, Phone, Gift, Box, User, Briefcase, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMemo, useCallback } from "react";
import GradientText from "./GradientText";
import React from "react";

const MembershipSection = () => {
  const { t } = useTranslation('membership');

  // Function to handle Telegram contact
  const handleTelegramContact = useCallback((planType: string) => {
    const telegramUrl = "https://t.me/+998770884977"
    window.open(telegramUrl, '_blank');
  }, []);

  // Memoize all data to prevent unnecessary re-renders
  const membershipFeatures = useMemo(() => [
    {
      title: t('membership.types.student.title', 'Student'),
      subtitle: t('membership.types.student.subtitle', 'Perfect for Learning'),
      description: t('membership.types.student.description', 'Perfect for students, recent graduates, and learning enthusiasts'),
      features: [
        t('membership.types.student.features.0', '20 hours of machine access per month (2.5 hours/session, up to 8 days)'),
        t('membership.types.student.features.1', 'Access during off-peak hours (9:00–14:00)'),
        t('membership.types.student.features.2', 'Basic 2-hour training program'),
        t('membership.types.student.features.3', 'Access to Prusa MK3+ 3D printer (one unit)'),
        t('membership.types.student.features.4', 'Access to UV printer and sticker machine'),
        t('membership.types.student.features.5', 'Use of CNC desktop machine'),
        t('membership.types.student.features.6', '30% discount on materials'),
        t('membership.types.student.features.7', 'Basic materials included'),
        t('membership.types.student.features.8', 'Student project storage'),
        t('membership.types.student.features.9', 'PC access included')
      ],
      restrictions: [
        t('membership.types.student.restrictions.0', 'Age: 16–25 years old'),
        t('membership.types.student.restrictions.1', 'Valid student ID required'),
        t('membership.types.student.restrictions.2', 'Maximum 2 projects at a time')
      ],
      icon: <User className="w-7 h-7" />,
      buttonText: t('membership.types.student.buttonText', 'Choose Student'),
      buttonStyle: "bg-[#329db7] hover:bg-[#2a8aa0] text-white",
      popular: false
    },
    {
      title: t('membership.types.maker.title', 'Maker'),
      subtitle: t('membership.types.maker.subtitle', 'Most Popular'),
      description: t('membership.types.maker.description', 'Best choice for hobbyists, freelancers, and creative entrepreneurs'),
      features: [
        t('membership.types.maker.features.0', '30 hours of machine access per month (2.5 hours/session, up to 12 days)'),
        t('membership.types.maker.features.1', 'Flexible access'),
        t('membership.types.maker.features.2', 'Basic 3.5-hour training program'),
        t('membership.types.maker.features.3', 'Access to Prusa MK3S+ 3D printer with MMU'),
        t('membership.types.maker.features.4', 'Access to SLA Prusa 3D printer'),
        t('membership.types.maker.features.5', 'Access to UV printer and sticker machine'),
        t('membership.types.maker.features.6', 'Use of CNC desktop machine'),
        t('membership.types.maker.features.7', 'Laser cutting access'),
        t('membership.types.maker.features.8', '15% discount on extra materials'),
        t('membership.types.maker.features.9', 'Free basic materials (monthly allowance)'),
        t('membership.types.maker.features.10', 'Project storage (2 m³)'),
        t('membership.types.maker.features.11', 'PC access included')
      ],
      icon: <Briefcase className="w-7 h-7" />,
      buttonText: t('membership.types.maker.buttonText', 'Choose Maker'),
      buttonStyle: "bg-[#329db7] hover:bg-[#2a8aa0] text-white",
      popular: true,
      badge: t('membership.types.maker.badge', 'MOST POPULAR')
    },
    {
      title: t('membership.types.startup.title', 'Startup'),
      subtitle: t('membership.types.startup.subtitle', 'Growth Package'),
      description: t('membership.types.startup.description', 'Designed for early-stage startups and growing businesses'),
      features: [
        t('membership.types.startup.features.0', 'Unlimited machine and workshop access'),
        t('membership.types.startup.features.1', 'Private after-hours access and lounge area'),
        t('membership.types.startup.features.2', 'Weekly consulting session (2 hours/week)'),
        t('membership.types.startup.features.3', 'Dedicated technical lead support'),
        t('membership.types.startup.features.4', '30% discount on extra materials'),
        t('membership.types.startup.features.5', 'Free premium materials (highest tier allowance)'),
        t('membership.types.startup.features.6', 'Priority storage (10 m³)'),
        t('membership.types.startup.features.7', 'PC access included')
      ],
      businessBenefits: [
        t('membership.types.startup.businessBenefits.0', 'Team workspace'),
        t('membership.types.startup.businessBenefits.1', 'Business mentorship'),
        t('membership.types.startup.businessBenefits.2', 'Access to startup community')
      ],
      icon: <Building2 className="w-7 h-7" />,
      buttonText: t('membership.types.startup.buttonText', 'Choose Startup'),
      buttonStyle: "bg-[#329db7] hover:bg-[#2a8aa0] text-white",
      popular: false
    }
  ], [t]);

  const universalBenefits = useMemo(() => [
    {
      icon: <Target className="w-5 h-5" />,
      title: t('membership.universalBenefits.expertTraining.title', 'Expert Training'),
      description: t('membership.universalBenefits.expertTraining.description', 'Professional guidance from experienced makers')
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: t('membership.universalBenefits.communityAccess.title', 'Community Access'),
      description: t('membership.universalBenefits.communityAccess.description', 'Join a vibrant community of creators and innovators')
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: t('membership.universalBenefits.learningResources.title', 'Learning Resources'),
      description: t('membership.universalBenefits.learningResources.description', 'Access to comprehensive learning materials and tutorials')
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: t('membership.universalBenefits.professionalSpace.title', 'Professional Space'),
      description: t('membership.universalBenefits.professionalSpace.description', 'Modern, well-equipped workspace for all your projects')
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: t('membership.universalBenefits.technicalSupport.title', 'Technical Support'),
      description: t('membership.universalBenefits.technicalSupport.description', 'Get help when you need it from our technical team')
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: t('membership.universalBenefits.memberDiscounts.title', 'Member Discounts'),
      description: t('membership.universalBenefits.memberDiscounts.description', 'Special pricing on materials and additional services')
    },
    {
      icon: <Box className="w-5 h-5" />,
      title: t('membership.universalBenefits.storageSpace.title', 'Storage Space'),
      description: t('membership.universalBenefits.storageSpace.description', 'Secure storage for your projects and materials')
    }
  ], [t]);

  // Split benefits into two groups
  const [firstRowBenefits, secondRowBenefits] = useMemo(() => [
    universalBenefits.slice(0, 4),
    universalBenefits.slice(4)
  ], [universalBenefits]);

  // Create duplicated arrays for seamless looping
  const duplicatedFirstRow = useMemo(() => [...firstRowBenefits, ...firstRowBenefits, ...firstRowBenefits], [firstRowBenefits]);
  const duplicatedSecondRow = useMemo(() => [...secondRowBenefits, ...secondRowBenefits, ...secondRowBenefits], [secondRowBenefits]);

  // Determine the width of a single set of cards + gaps for calculation
  const CARD_WIDTH = 260;
  const GAP_WIDTH = 20;

  // Calculate the width of one full set of original cards plus their gaps
  const firstRowSetWidth = useMemo(() => (CARD_WIDTH * firstRowBenefits.length) + (GAP_WIDTH * (firstRowBenefits.length - 1)), [firstRowBenefits.length]);
  const secondRowSetWidth = useMemo(() => (CARD_WIDTH * secondRowBenefits.length) + (GAP_WIDTH * (secondRowBenefits.length - 1)), [secondRowBenefits.length]);

  // Memoized plan card component
  const PlanCard = useCallback(({ plan }: { plan: typeof membershipFeatures[0] }) => (
    <motion.div
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col h-full ${plan.popular ? 'border-2 border-[#329db7] transform scale-105' : 'border border-gray-200'}`}
    >
      {/* Popular Badge */}
      {plan.popular && plan.badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#329db7] text-white px-4 py-1 rounded-full text-xs font-semibold">
            {plan.badge}
          </div>
        </div>
      )}

      {/* Icon */}
      <div className="flex justify-center mb-3">
        <div className="text-gray-600">
          {plan.icon}
        </div>
      </div>

      {/* Plan Title and Subtitle */}
      <div className="text-center mb-5">
        {plan.popular ? (
          <div className="flex justify-center">
            <GradientText 
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} 
              animationSpeed={4}
              className="text-lg font-bold mb-1"
            >
              {plan.title}
            </GradientText>
          </div>
        ) : (
          <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.title}</h3>
        )}
        {plan.popular ? (
          <div className="flex justify-center">
            <GradientText 
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} 
              animationSpeed={4} 
              className="text-xs"
            >
              {plan.subtitle}
            </GradientText>
          </div>
        ) : (
          <p className="text-gray-600 text-xs">{plan.subtitle}</p>
        )}
      </div>

      {/* Action Button */}
      <div className="mb-5">
        <button
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${plan.buttonStyle}`}
          onClick={() => handleTelegramContact(plan.title)}
        >
          {plan.buttonText}
        </button>
      </div>

      {/* Features List */}
      <ul className="space-y-2.5 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#329db7]/10 flex items-center justify-center mr-2 mt-0.5">
              <Check className="w-2.5 h-2.5 text-[#329db7]" />
            </div>
            <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  ), []);

  return (
    <section id="membership-section" className="section-spacing bg-[#f5f5f7] relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
        {/* Header */}
        <div className="section-title-wrapper">
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline sm:gap-1">
            <div className="text-center sm:text-left mb-2 sm:mb-0">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={4}
                className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
              >
                {t('membership.title', 'Membership Plans')}
              </GradientText>
            </div>
            <span className="hidden sm:block text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
              {t('membership.subtitle', 'Choose the perfect plan for your creative journey')}
            </span>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="section-inner-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {membershipFeatures.map((plan, index) => (
              <div key={index}>
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Universal Benefits with full width sliding cards */}
      <div className="w-full">
        {/* First Row - Moving Left */}
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex space-x-4 will-change-transform"
            animate={{ x: [`0px`, `-${firstRowSetWidth + GAP_WIDTH}px`] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: 'fit-content' }}
          >
            {duplicatedFirstRow.map((benefit, index) => (
              <div key={index}>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl min-w-[260px] max-w-[260px] h-[200px] border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="mb-3 text-[#329db7] bg-[#329db7]/10 p-2.5 rounded-full">
                    {React.cloneElement(benefit.icon, { className: "w-6 h-6" })}
                  </div>
                  <h4 className="text-sm font-semibold text-center mb-2 text-gray-900 leading-tight">{benefit.title}</h4>
                  <p className="text-gray-600 text-center text-xs leading-relaxed flex-grow overflow-hidden">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Right */}
        <div className="relative overflow-hidden w-full mt-5">
          <motion.div
            className="flex space-x-4 will-change-transform"
            animate={{ x: [`-${secondRowSetWidth + GAP_WIDTH}px`, `0px`] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: 'fit-content' }}
          >
            {duplicatedSecondRow.map((benefit, index) => (
              <div key={index}>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl min-w-[260px] max-w-[260px] h-[200px] border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="mb-3 text-[#329db7] bg-[#329db7]/10 p-2.5 rounded-full">
                    {React.cloneElement(benefit.icon, { className: "w-6 h-6" })}
                  </div>
                  <h4 className="text-sm font-semibold text-center mb-2 text-gray-900 leading-tight">{benefit.title}</h4>
                  <p className="text-gray-600 text-center text-xs leading-relaxed flex-grow overflow-hidden">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;