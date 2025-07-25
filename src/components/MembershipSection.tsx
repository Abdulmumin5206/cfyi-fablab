import { motion } from "framer-motion";
import { Check, Users, Target, BookOpen, Phone, Gift, Box, User, Briefcase, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMemo, useCallback } from "react";

const MembershipSection = () => {
  const { t } = useTranslation();

  // Function to handle Telegram contact
  const handleTelegramContact = useCallback((planType: string) => {
    const telegramNumber = "+998712345678"; // FabLab CFYI Telegram contact
    const message = `Hi! I'm interested in the ${planType} membership plan at FabLab CFYI. Could you please provide more information?`;
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
      icon: <User className="w-8 h-8" />,
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
      icon: <Briefcase className="w-8 h-8" />,
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
      icon: <Building2 className="w-8 h-8" />,
      buttonText: t('membership.types.startup.buttonText', 'Choose Startup'),
      buttonStyle: "bg-[#329db7] hover:bg-[#2a8aa0] text-white",
      popular: false
    }
  ], [t]);

  const universalBenefits = useMemo(() => [
    {
      icon: <Target className="w-6 h-6" />,
      title: t('membership.universalBenefits.expertTraining.title'),
      description: t('membership.universalBenefits.expertTraining.description')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('membership.universalBenefits.communityAccess.title'),
      description: t('membership.universalBenefits.communityAccess.description')
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t('membership.universalBenefits.learningResources.title'),
      description: t('membership.universalBenefits.learningResources.description')
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: t('membership.universalBenefits.professionalSpace.title'),
      description: t('membership.universalBenefits.professionalSpace.description')
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('membership.universalBenefits.technicalSupport.title'),
      description: t('membership.universalBenefits.technicalSupport.description')
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: t('membership.universalBenefits.memberDiscounts.title'),
      description: t('membership.universalBenefits.memberDiscounts.description')
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: t('membership.universalBenefits.storageSpace.title'),
      description: t('membership.universalBenefits.storageSpace.description')
    }
  ], [t]);

  // Split benefits into two groups
  const [firstRowBenefits, secondRowBenefits] = useMemo(() => [
    universalBenefits.slice(0, 4),
    universalBenefits.slice(4)
  ], [universalBenefits]);

  // Create duplicated arrays for seamless looping (x2 for a full loop)
  // We duplicate enough times to ensure smooth transition
  const duplicatedFirstRow = useMemo(() => [...firstRowBenefits, ...firstRowBenefits, ...firstRowBenefits], [firstRowBenefits]);
  const duplicatedSecondRow = useMemo(() => [...secondRowBenefits, ...secondRowBenefits, ...secondRowBenefits], [secondRowBenefits]);


  // Determine the width of a single set of cards + gaps for calculation
  // A consistent card width and gap is assumed.
  const CARD_WIDTH = 220; // Smaller card width
  const GAP_WIDTH = 12;   // Smaller gap between cards

  // Calculate the width of one full set of original cards plus their gaps
  // (e.g., 4 cards in first row)
  const firstRowSetWidth = useMemo(() => (CARD_WIDTH * firstRowBenefits.length) + (GAP_WIDTH * (firstRowBenefits.length - 1)), [firstRowBenefits.length]);
  const secondRowSetWidth = useMemo(() => (CARD_WIDTH * secondRowBenefits.length) + (GAP_WIDTH * (secondRowBenefits.length - 1)), [secondRowBenefits.length]);




  // Memoized plan card component
  const PlanCard = useCallback(({ plan }: { plan: typeof membershipFeatures[0] }) => (
    <motion.div
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full ${plan.popular ? 'border-2 border-[#329db7] transform scale-105' : 'border border-gray-200'
        }`}
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
      <div className="flex justify-center mb-4">
        <div className="text-gray-600">
          {plan.icon}
        </div>
      </div>

      {/* Plan Title and Subtitle */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.title}</h3>
        <p className="text-gray-600 text-sm">{plan.subtitle}</p>
      </div>

      {/* Action Button */}
      <div className="mb-6">
        <button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${plan.buttonStyle}`}
          onClick={() => handleTelegramContact(plan.title)}
          disabled={plan.buttonText === "Current plan"}
        >
          {plan.buttonText}
        </button>
      </div>

      {/* Features List */}
      <ul className="space-y-3 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#329db7]/10 flex items-center justify-center mr-3 mt-0.5">
              <Check className="w-3 h-3 text-[#329db7]" />
            </div>
            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  ), []);

  // Removed animation variants

  return (
    <section id="membership-section" className="py-16 sm:py-20 lg:py-24 bg-gray-200 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1400px]">
        {/* Header */}
        <div className="text-left mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black">
            {t('membership.title')}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8">
            {t('membership.subtitle')}
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-[1200px] mx-auto">
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
            className="flex space-x-3 will-change-transform"
            animate={{ x: [`0px`, `-${firstRowSetWidth + GAP_WIDTH}px`] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            style={{ width: 'fit-content' }}
          >
            {duplicatedFirstRow.map((benefit, index) => (
              <div key={index}>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl min-w-[220px] max-w-[220px] h-[180px] border border-gray-100">
                  <div className="mb-3 text-[#329db7] bg-[#329db7]/10 p-2 rounded-full">
                    {benefit.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-center mb-2 text-gray-900 leading-tight">{benefit.title}</h4>
                  <p className="text-gray-600 text-center text-xs leading-relaxed flex-grow overflow-hidden">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Right */}
        <div className="relative overflow-hidden w-full mt-4">
          <motion.div
            className="flex space-x-3 will-change-transform"
            animate={{ x: [`-${secondRowSetWidth + GAP_WIDTH}px`, `0px`] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            style={{ width: 'fit-content' }}
          >
            {duplicatedSecondRow.map((benefit, index) => (
              <div key={index}>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl min-w-[220px] max-w-[220px] h-[180px] border border-gray-100">
                  <div className="mb-3 text-[#329db7] bg-[#329db7]/10 p-2 rounded-full">
                    {benefit.icon}
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