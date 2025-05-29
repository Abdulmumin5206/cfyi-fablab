import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star, Users, Clock, Shield, BookOpen, Target, Building, Phone, Gift, Box } from "lucide-react";
import { useTranslation } from "react-i18next";

const MembershipSection = () => {
  const { t } = useTranslation();
  
  const membershipFeatures = [
    {
      title: "Student",
      price: "500,000",
      description: "Perfect for students, recent graduates, and learning enthusiasts",
      features: [
        "10 hours monthly access",
        "Free basic training (8-hour program)",
        "Community workshop access (2/month)",
        "Student project storage (1m³)",
        "Email technical support",
        "Basic materials included",
        "Educational discounts (30% off)",
        "Study group access"
      ],
      restrictions: [
        "Off-peak hours only (9AM-5PM)",
        "No commercial use"
      ],
      color: "bg-[#309eb7]",
      image: "/main/membership/students.webp",
      badge: "Perfect for Learning",
      popularFeatures: [
        "Perfect for university projects",
        "Learn at your own pace",
        "Network with fellow students"
      ]
    },
    {
      title: "Maker",
      price: "1,000,000",
      description: "Best for hobbyists, freelancers, and creative entrepreneurs",
      features: [
        "25 hours monthly access",
        "Advanced training workshops",
        "Priority booking system",
        "Project consultation (30min/month)",
        "Extended storage (2m³)",
        "Phone + email support",
        "Material discounts (20% off)",
        "Weekend access included",
        "2 guest passes/month"
      ],
      color: "bg-[#309eb7]",
      image: "/main/membership/maker.webp",
      badge: "Most Popular",
      popular: true,
      perfectFor: [
        "Weekend warriors",
        "Etsy shop owners",
        "Prototype development"
      ]
    },
    {
      title: "Professional",
      price: "2,000,000",
      description: "Ideal for entrepreneurs, small businesses, and serious creators",
      features: [
        "Unlimited access",
        "Dedicated storage (5m³)",
        "Business hours priority",
        "Technical consultation (2hrs/month)",
        "Rush job priority",
        "Marketing collaboration",
        "Bulk material discounts (30% off)",
        "Commercial license",
        "Advanced software access",
        "Business networking events"
      ],
      color: "bg-[#309eb7]",
      image: "/main/membership/professional.webp",
      badge: "Business Ready",
      businessBenefits: [
        "Scale your production",
        "Professional credibility",
        "Network with entrepreneurs"
      ]
    }
  ];

  const universalBenefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Expert Training",
      description: "Free workshops and ongoing technical support"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Professional Space",
      description: "Clean, well-lit environment with all tools"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Access",
      description: "Connect with Tashkent's innovative makers"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Learning Resources",
      description: "Access to tutorials and design libraries"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Insurance Coverage",
      description: "All projects covered under equipment insurance"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Technical Support",
      description: "Get help via phone, email, or in-person"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Member Discounts",
      description: "20-50% off materials and advanced courses"
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: "Storage Space",
      description: "Keep your projects and materials secure"
    }
  ];

  // Split benefits into two groups
  const firstRowBenefits = universalBenefits.slice(0, 4);
  const secondRowBenefits = universalBenefits.slice(4);

  // Create duplicated arrays for seamless looping
  const duplicatedFirstRow = [...firstRowBenefits, ...firstRowBenefits];
  const duplicatedSecondRow = [...secondRowBenefits, ...secondRowBenefits];

  // Calculate the width of one set of cards
  const cardWidth = 260;
  const gapWidth = 24;
  const rowWidth = (cardWidth * 4) + (gapWidth * 3);

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-left mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-black">Unlock Your Potential</h2>
          <p className="text-left text-gray-700 text-lg mb-8 sm:mb-12">
            From students to professionals, find the perfect plan to bring your ideas to life. 
            Join our community of makers and innovators.
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {membershipFeatures.map((plan, index) => (
            <motion.div
              key={index}
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
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${plan.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 bg-[#309eb7] text-white px-4 py-2 transition-transform duration-500 group-hover:translate-y-[-5px]">
                  <span className="text-sm font-medium block">Starting from</span>
                  <div className="text-lg font-bold">{plan.price} UZS</div>
                </div>
                {plan.popular && (
                  <div className="absolute top-0 left-0 bg-[#309eb7] text-white px-3 py-1.5 text-xs transition-transform duration-500 group-hover:translate-y-[5px]">
                    <Star className="inline-block mr-1" size={12} />
                    Most Popular
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow transition-all duration-500">
                <div className="text-sm font-semibold text-[#309eb7] mb-2 transition-colors duration-500">{plan.badge}</div>
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
                    <h4 className="font-semibold mb-1 text-sm text-gray-500">Restrictions:</h4>
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
                      {plan.popularFeatures ? "Popular Features:" : plan.perfectFor ? "Perfect For:" : "Business Benefits:"}
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
                    <span>Get Started</span>
                    <ArrowRight size={14} className="ml-2 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple text notes */}
        <div className="text-left text-sm text-gray-600 mb-6 pl-4">
          <p>* All prices exclude governmental fees | Available support in English, Russian, and Uzbek languages</p>
        </div>

        {/* Universal Benefits with Two-Way Horizontal Scroll */}
        <div className="space-y-4 mb-10">
          {/* First Row - Moving Left */}
          <div className="relative overflow-hidden">
            <div 
              className="flex space-x-4 animate-scroll-left"
              style={{
                width: "fit-content",
                animation: "scrollLeft 40s linear infinite",
              }}
            >
              {duplicatedFirstRow.map((benefit, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-[260px] bg-white p-5 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="text-[#309eb7] mb-3">{benefit.icon}</div>
                  <h3 className="text-base font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="relative overflow-hidden">
            <div 
              className="flex space-x-4 animate-scroll-right"
              style={{
                width: "fit-content",
                animation: "scrollRight 40s linear infinite",
              }}
            >
              {duplicatedSecondRow.map((benefit, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-[260px] bg-white p-5 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="text-[#309eb7] mb-3">{benefit.icon}</div>
                  <h3 className="text-base font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Special Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 bg-black text-white p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-bold mb-2">Special Limited-Time Offer</h3>
        </motion.div>

        {/* Training Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-[#309eb7] to-[#2a8ca3] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Master Your Skills
              </h2>
              <p className="text-white/90 text-lg mb-6">
                From beginner workshops to advanced masterclasses, discover our comprehensive 
                training programs designed to elevate your making journey.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Structured Learning</h3>
                    <p className="text-sm text-white/80">Step-by-step curriculum for all levels</p>
                  </div>
                </div>
                <div className="flex items-center text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Expert Instructors</h3>
                    <p className="text-sm text-white/80">Learn from industry professionals</p>
                  </div>
                </div>
                <div className="flex items-center text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hands-on Projects</h3>
                    <p className="text-sm text-white/80">Apply skills to real-world challenges</p>
                  </div>
                </div>
              </div>
              <Link
                to="/training"
                className="inline-flex items-center justify-center bg-white text-[#309eb7] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 w-fit"
              >
                Explore Training Programs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Image Side */}
            <div className="relative h-full min-h-[500px] md:min-h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent z-10" />
              <img
                src="/main/training/training.webp"
                alt="Training Programs"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${rowWidth}px);
            }
          }

          @keyframes scrollRight {
            0% {
              transform: translateX(-${rowWidth}px);
            }
            100% {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default MembershipSection; 