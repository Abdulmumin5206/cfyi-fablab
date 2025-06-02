import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const TrainingSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-[#309eb7] to-[#2a8ca3] overflow-hidden rounded-2xl"
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
              <ul className="space-y-3">
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Structured Learning</span>
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Expert Instructors</span>
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Hands-on Projects</span>
                </li>
              </ul>
              <Link 
                to="/training" 
                className="mt-6 inline-flex items-center bg-white text-[#309eb7] px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Image Side */}
            <div className="relative h-full min-h-[500px] md:min-h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent z-10" />
              <img
                src="/main/training/training.webp"
                alt={t('training.imageAlt')}
                className="w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingSection;
