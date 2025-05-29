import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star, Users, Clock, Shield, BookOpen, Target, Building, Phone, Gift, Box } from "lucide-react";
import { useTranslation } from "react-i18next";

const MembershipSection = () => {
  const { t } = useTranslation();
  
  const membershipFeatures = [
    {
      title: "Student",
      price: "200,000",
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
      color: "bg-[#cb2026]",
      image: "/fablab/1.jpg",
      badge: "Perfect for Learning",
      popularFeatures: [
        "Perfect for university projects",
        "Learn at your own pace",
        "Network with fellow students"
      ]
    },
    {
      title: "Maker",
      price: "500,000",
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
      color: "bg-[#0e9a48]",
      image: "/fablab/3.jpg",
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
      price: "1,000,000",
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
      color: "bg-[#35469d]",
      image: "/fablab/11.jpg",
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

  // Calculate the width of one set of cards (4 cards * 280px + 3 gaps * 24px)
  const cardWidth = 280;
  const gapWidth = 24;
  const rowWidth = (cardWidth * 4) + (gapWidth * 3);

  return (
    <section className="py-20 bg-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-left mb-6">
          <h2 className="text-4xl font-bold mb-4 text-black">Choose Your Creative Freedom</h2>
          <p className="text-gray-700 text-lg max-w-3xl">
            Whether you're just starting your maker journey or running a growing business, 
            we have the perfect membership plan to unlock your creative potential. All memberships 
            include expert support, community access, and the tools to bring your ideas to life.
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {membershipFeatures.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-green-500 transform scale-105' : ''
              }`}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${plan.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className={`absolute top-0 right-0 ${plan.color} text-white px-4 py-2`}>
                  <span className="text-sm font-medium">Starting from</span>
                  <div className="text-2xl font-bold">{plan.price} UZS</div>
                </div>
                {plan.popular && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white px-4 py-2">
                    <Star className="inline-block mr-2" size={16} />
                    Most Popular
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="text-sm font-semibold text-blue-600 mb-2">{plan.badge}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <Check className={`w-5 h-5 ${plan.color} mr-2 flex-shrink-0 mt-0.5`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.restrictions && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm text-gray-500">Restrictions:</h4>
                    <ul className="space-y-2">
                      {plan.restrictions.map((restriction, idx) => (
                        <li key={idx} className="text-gray-500 text-sm">• {restriction}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {(plan.popularFeatures || plan.perfectFor || plan.businessBenefits) && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm text-gray-500">
                      {plan.popularFeatures ? "Popular Features:" : plan.perfectFor ? "Perfect For:" : "Business Benefits:"}
                    </h4>
                    <ul className="space-y-2">
                      {(plan.popularFeatures || plan.perfectFor || plan.businessBenefits)?.map((item, idx) => (
                        <li key={idx} className="text-gray-500 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link
                  to="/membership"
                  className={`inline-flex items-center ${plan.color} text-white py-2 px-4 hover:opacity-90 transition-opacity`}
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>

              {/* Corner Accent */}
              <div className={`absolute top-0 left-0 w-16 h-16 ${plan.color} opacity-10`} />
            </motion.div>
          ))}
        </div>

        {/* Simple text notes */}
        <div className="text-left text-sm text-gray-600 mb-6 pl-4">
          <p>* All prices exclude governmental fees | Available support in English, Russian, and Uzbek languages</p>
        </div>

        {/* Universal Benefits with Two-Way Horizontal Scroll */}
        <div className="space-y-6 mb-12">
          {/* First Row - Moving Left */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex space-x-6"
              animate={{
                x: [0, -rowWidth],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedFirstRow.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[280px] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-blue-600 mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex space-x-6"
              animate={{
                x: [-rowWidth, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedSecondRow.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[280px] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-blue-600 mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Special Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-black text-white p-8 rounded-lg text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Special Limited-Time Offer</h3>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipSection; 