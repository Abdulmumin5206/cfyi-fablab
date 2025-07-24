import { motion } from "framer-motion";
import { ArrowRight, Check, Star, Users, Target, BookOpen, Phone, Gift, Box, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMemo, useCallback } from "react";

const MembershipSection = () => {
  const { t } = useTranslation();

  // Memoize all data to prevent unnecessary re-renders
  const membershipFeatures = useMemo(() => [
    {
      title: t('membership.types.student.title'),
      price: "1,000,000",
      description: t('membership.types.student.description'),
      features: t('membership.types.student.features', { returnObjects: true }) as string[],
      restrictions: t('membership.types.student.restrictions', { returnObjects: true }) as string[],
      color: "bg-[#309eb7]",
      image: "/main/membership/students.webp",
      badge: "Perfect for Learning"
    },
    {
      title: t('membership.types.maker.title'),
      price: "2,000,000",
      description: t('membership.types.maker.description'),
      features: t('membership.types.maker.features', { returnObjects: true }) as string[],
      color: "bg-[#309eb7]",
      image: "/main/membership/maker.webp",
      badge: "Most Popular",
      popular: true
    },
    {
      title: t('membership.types.startup.title'),
      price: "5,000,000",
      description: t('membership.types.startup.description'),
      features: t('membership.types.startup.features', { returnObjects: true }) as string[],
      color: "bg-[#309eb7]",
      image: "/main/membership/professional.webp",
      badge: "Growth Package",
      startupPerks: t('membership.types.startup.startupPerks', { returnObjects: true }) as string[]
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
  const CARD_WIDTH = 260; // Tailwind w-[260px]
  const GAP_WIDTH = 16;   // Tailwind space-x-4 (16px)

  // Calculate the width of one full set of original cards plus their gaps
  // (e.g., 4 cards in first row)
  const firstRowSetWidth = useMemo(() => (CARD_WIDTH * firstRowBenefits.length) + (GAP_WIDTH * (firstRowBenefits.length - 1)), [firstRowBenefits.length]);
  const secondRowSetWidth = useMemo(() => (CARD_WIDTH * secondRowBenefits.length) + (GAP_WIDTH * (secondRowBenefits.length - 1)), [secondRowBenefits.length]);




  // Memoized plan card component
  const PlanCard = useCallback(({ plan }: { plan: typeof membershipFeatures[0] }) => (
    <motion.div
      className={`group relative bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col ${plan.popular ? 'ring-2 ring-[#309eb7] transform scale-105' : ''
        }`}
    >
      {/* Image Section */}
      <div className="relative h-36 sm:h-40 lg:h-44 overflow-hidden">
        <img
          src={plan.image}
          alt={plan.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          width={400}
          height={176}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 transition-opacity duration-500" />
        {plan.popular && (
          <div className="absolute top-0 left-0 bg-[#309eb7] text-white px-2 sm:px-3 py-1 sm:py-1.5 text-xs transition-transform duration-500 group-hover:translate-y-[5px]">
            <Star className="inline-block mr-1" size={12} />
            {t('membership.planCard.mostPopular')}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
        <div className="text-xs sm:text-sm font-semibold text-[#309eb7] mb-1 sm:mb-2 transition-colors duration-500">
          {plan.badge === "Perfect for Learning" && t('membership.planCard.perfectForLearning')}
          {plan.badge === "Business Ready" && t('membership.planCard.businessReady')}
          {plan.badge === "Growth Package" && t('membership.planCard.growthPackage')}
          {plan.badge === "Most Popular" && t('membership.planCard.mostPopular')}
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-black transition-colors duration-500">{plan.title}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 transition-colors duration-500">{plan.description}</p>
        <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-gray-600 transition-all duration-500 hover:translate-x-2">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#309eb7] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5 transition-transform duration-500" />
              <span className="text-xs sm:text-sm transition-colors duration-500">{feature}</span>
            </li>
          ))}
        </ul>
        {plan.restrictions && (
          <div className="mb-3 sm:mb-4 bg-gray-50 p-2 sm:p-3 transition-all duration-500 hover:bg-gray-100">
            <h4 className="font-semibold mb-1 text-xs sm:text-sm text-gray-500">{t('membership.restrictions')}</h4>
            <ul className="space-y-0.5 sm:space-y-1">
              {plan.restrictions.map((restriction, idx) => (
                <li key={idx} className="text-gray-500 text-xs sm:text-sm transition-colors duration-500">• {restriction}</li>
              ))}
            </ul>
          </div>
        )}
        {plan.startupPerks && (
          <div className="mb-3 sm:mb-4 bg-gray-50 p-2 sm:p-3 transition-all duration-500 hover:bg-gray-100">
            <h4 className="font-semibold mb-1 text-xs sm:text-sm text-gray-500">{t('membership.businessBenefits')}</h4>
            <ul className="space-y-0.5 sm:space-y-1">
              {plan.startupPerks.map((item, idx) => (
                <li key={idx} className="text-gray-500 text-xs sm:text-sm transition-colors duration-500">• {item}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-auto">
          <a
            href="https://t.me/+998770884977"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-[#309eb7] text-white py-2 sm:py-2.5 px-3 sm:px-4 hover:bg-[#2a8ca3] transition-all duration-500 hover:translate-y-[-2px] hover:shadow-lg text-xs sm:text-sm"
          >
            <span>{t('membership.cta.button')}</span>
            <ArrowRight size={12} className="ml-1.5 sm:ml-2 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  ), [t]);

  // Removed animation variants

  return (
    <section id="membership-section" className="py-8 sm:py-12 lg:py-16 bg-gray-200 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1400px]">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black">
              {t('membership.title')}
            </h2>
            <p className="text-center text-gray-700 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto">
              {t('membership.subtitle')}
            </p>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-4 sm:mb-6 max-w-[1200px] mx-auto">
          {membershipFeatures.map((plan, index) => (
            <div key={index}>
              <PlanCard plan={plan} />
            </div>
          ))}
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
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ width: 'fit-content' }}
          >
            {duplicatedFirstRow.map((benefit, index) => (
              <div key={index}>
                <div className="flex flex-col items-center p-4 sm:p-5 lg:p-6 bg-white shadow-md rounded-lg min-w-[260px] max-w-[260px] h-[200px] transition-transform duration-500 hover:scale-105">
                  <div className="mb-3 text-[#309eb7]">
                    {benefit.icon}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-center mb-1 text-black">{benefit.title}</h4>
                  <p className="text-gray-600 text-center text-xs sm:text-sm flex-grow">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Right */}
        <div className="relative overflow-hidden w-full mt-4">
          <motion.div
            className="flex space-x-4 will-change-transform"
            animate={{ x: [`-${secondRowSetWidth + GAP_WIDTH}px`, `0px`] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ width: 'fit-content' }}
          >
            {duplicatedSecondRow.map((benefit, index) => (
              <div key={index}>
                <div className="flex flex-col items-center p-4 sm:p-5 lg:p-6 bg-white shadow-md rounded-lg min-w-[260px] max-w-[260px] h-[200px] transition-transform duration-500 hover:scale-105">
                  <div className="mb-3 text-[#309eb7]">
                    {benefit.icon}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-center mb-1 text-black">{benefit.title}</h4>
                  <p className="text-gray-600 text-center text-xs sm:text-sm flex-grow">{benefit.description}</p>
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