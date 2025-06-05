import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star, Users, Target, BookOpen, Phone, Gift, Box } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMemo, useCallback, useRef } from "react";

const MembershipSection = () => {
  const { t } = useTranslation();
  const scrollRef = useRef(null); // Ref for the scrollable container

  // Memoize all data to prevent unnecessary re-renders
  const membershipFeatures = useMemo(() => [
    {
      title: t('membership.types.student.title'),
      price: "500,000",
      description: t('membership.types.student.description'),
      features: t('membership.types.student.features', { returnObjects: true }) as string[],
      restrictions: t('membership.types.student.restrictions', { returnObjects: true }) as string[],
      color: "bg-[#309eb7]",
      image: "/main/membership/students.webp",
      badge: "Perfect for Learning",
      popularFeatures: t('membership.types.student.popularFeatures', { returnObjects: true }) as string[]
    },
    {
      title: t('membership.types.maker.title'),
      price: "1,000,000",
      description: t('membership.types.maker.description'),
      features: t('membership.types.maker.features', { returnObjects: true }) as string[],
      color: "bg-[#309eb7]",
      image: "/main/membership/maker.webp",
      badge: "Most Popular",
      popular: true,
      perfectFor: t('membership.types.maker.perfectFor', { returnObjects: true }) as string[]
    },
    {
      title: t('membership.types.professional.title'),
      price: "2,000,000",
      description: t('membership.types.professional.description'),
      features: t('membership.types.professional.features', { returnObjects: true }) as string[],
      color: "bg-[#309eb7]",
      image: "/main/membership/professional.webp",
      badge: "Business Ready",
      businessBenefits: t('membership.types.professional.businessBenefits', { returnObjects: true }) as string[]
    },
    {
      title: t('membership.types.startup.title'),
      price: "1,500,000",
      description: t('membership.types.startup.description'),
      features: t('membership.types.startup.features', { returnObjects: true }) as string[],
      color: "bg-[#309eb7]",
      image: "/main/membership/startup.webp",
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

  // Framer Motion scroll logic
  // We'll tie the animation to the scroll of the entire window for simplicity,
  // or you can tie it to a specific ref if you want the animation to start/stop
  // as the section comes into view. For continuous, looping effect, tying to window scroll
  // or a sufficiently large scroll area often works best.

  // We are creating a hypothetical scrollable area that covers the entire animation cycle
  // The scroll progress will then be mapped to the translateX values.
  const { scrollYProgress } = useScroll();

  // For the first row (right to left): 0% to -100% of its total set width
  // We map the scroll progress (0 to 1) to a translation range.
  // The `[-firstRowSetWidth, 0]` means it starts at -`firstRowSetWidth` and moves to `0`.
  // To make it loop, we need a larger input range and then reset the position.
  // However, for an infinite carousel, a simpler approach is to use `animate`
  // directly on the `motion.div` with an infinite loop.
  // The `useScroll` and `useTransform` are more for scroll-based animations where the animation
  // starts/stops or changes direction with scroll.
  // For a truly continuous loop that is independent of specific scroll progress (unless you want it to pause on scroll),
  // a plain `animate` prop with `repeat: Infinity` is more suitable and performant.

  // Let's refine the solution for continuous loop that is not tied to window scroll directly
  // but runs independently once the component is mounted.
  // We can still use useScroll for detecting when the section is in view,
  // but the looping animation itself will be managed by `animate` property for true infinite loop.


  // Memoized plan card component
  const PlanCard = useCallback(({ plan }: { plan: typeof membershipFeatures[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`group relative bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col ${
        plan.popular ? 'ring-2 ring-[#309eb7] transform scale-105' : ''
      }`}
    >
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={plan.image}
          alt={plan.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          width={400}
          height={176}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 bg-[#309eb7] text-white px-4 py-2 transition-transform duration-500 group-hover:translate-y-[-5px]">
          <span className="text-sm font-medium block">{t('membership.planCard.startingFrom')}</span>
          <div className="text-lg font-bold">{plan.price} UZS</div>
        </div>
        {plan.popular && (
          <div className="absolute top-0 left-0 bg-[#309eb7] text-white px-3 py-1.5 text-xs transition-transform duration-500 group-hover:translate-y-[5px]">
            <Star className="inline-block mr-1" size={12} />
            {t('membership.planCard.mostPopular')}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-sm font-semibold text-[#309eb7] mb-2 transition-colors duration-500">
          {plan.badge === "Perfect for Learning" && t('membership.planCard.perfectForLearning')}
          {plan.badge === "Business Ready" && t('membership.planCard.businessReady')}
          {plan.badge === "Growth Package" && t('membership.planCard.growthPackage')}
          {plan.badge === "Most Popular" && t('membership.planCard.mostPopular')}
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-black transition-colors duration-500">{plan.title}</h3>
        <p className="text-gray-600 text-sm mb-4 transition-colors duration-500">{plan.description}</p>
        <ul className="space-y-2 mb-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-gray-600 transition-all duration-500 hover:translate-x-2">
              <Check className="w-4 h-4 text-[#309eb7] mr-2 flex-shrink-0 mt-0.5 transition-transform duration-500" />
              <span className="text-sm transition-colors duration-500">{feature}</span>
            </li>
          ))}
        </ul>
        {plan.restrictions && (
          <div className="mb-4 bg-gray-50 p-3 transition-all duration-500 hover:bg-gray-100">
            <h4 className="font-semibold mb-1 text-sm text-gray-500">{t('membership.restrictions')}</h4>
            <ul className="space-y-1">
              {plan.restrictions.map((restriction, idx) => (
                <li key={idx} className="text-gray-500 text-sm transition-colors duration-500">• {restriction}</li>
              ))}
            </ul>
          </div>
        )}
        {(plan.popularFeatures || plan.perfectFor || plan.businessBenefits) && (
          <div className="mb-4 bg-gray-50 p-3 transition-all duration-500 hover:bg-gray-100">
            <h4 className="font-semibold mb-1 text-sm text-gray-500">
              {plan.popularFeatures ? t('membership.popularFeatures') : 
               plan.perfectFor ? t('membership.perfectFor') : 
               t('membership.businessBenefits')}
            </h4>
            <ul className="space-y-1">
              {(plan.popularFeatures || plan.perfectFor || plan.businessBenefits)?.map((item, idx) => (
                <li key={idx} className="text-gray-500 text-sm transition-colors duration-500">• {item}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-auto">
          <a
            href="https://t.me/+998770884977"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-[#309eb7] text-white py-2.5 px-4 hover:bg-[#2a8ca3] transition-all duration-500 hover:translate-y-[-2px] hover:shadow-lg text-sm"
          >
            <span>{t('membership.cta.button')}</span>
            <ArrowRight size={14} className="ml-2 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  ), [t]);

  return (
    <section id="membership-section" className="py-16 bg-gray-200 relative overflow-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-black">
              {t('membership.title')}
            </h2>
            <p className="text-left text-gray-700 text-base sm:text-lg mb-8 sm:mb-12 max-w-3xl">
              {t('membership.subtitle')}
            </p>
          </div>

          {/* Membership Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {membershipFeatures.map((plan, index) => (
              <PlanCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        {/* Universal Benefits with optimized animation */}
        <div className="w-full">
          {/* First Row - Moving Left */}
          <div className="relative overflow-hidden">
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
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-[260px] bg-white p-4 sm:p-5 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="text-[#309eb7] mb-3">{benefit.icon}</div>
                  <h3 className="text-sm sm:text-base font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{benefit.description}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="relative overflow-hidden mt-4">
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
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-[260px] bg-white p-4 sm:p-5 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="text-[#309eb7] mb-3">{benefit.icon}</div>
                  <h3 className="text-sm sm:text-base font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{benefit.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;