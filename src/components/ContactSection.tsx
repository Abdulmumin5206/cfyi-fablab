import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get inquiry parameter from URL if exists
  const urlInquiry = typeof window !== 'undefined' ? 
    new URLSearchParams(window.location.search).get('inquiry') || '' : '';
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    inquiry: urlInquiry
  });

  // Effect to update form if URL changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newInquiry = new URLSearchParams(window.location.search).get('inquiry') || '';
      setFormData(prev => ({
        ...prev,
        inquiry: newInquiry,
        // If there's a new inquiry from URL and message is empty, add a starter message
        message: newInquiry && !prev.message ? 
          `I'm interested in learning more about ${newInquiry}` : prev.message
      }));
    }
  }, [typeof window !== 'undefined' ? window.location.search : '']);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        inquiry: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact-section" className="py-8 sm:py-10 md:py-12 lg:py-14 bg-gray-100">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-8 md:mb-10"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
              {t('contact.title')}
            </h2>
            <div className="h-1 w-12 sm:w-16 md:w-20 bg-brand-red mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-white shadow-lg overflow-hidden"
            >
              <div className="bg-[#309eb7] text-white p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold mb-1">{t('contact.title')}</h3>
                <p className="opacity-90 text-xs sm:text-sm">{t('contact.subtitle')}</p>
              </div>
              
              <div className="p-4 sm:p-5">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-50 p-2 sm:p-2.5 rounded-full mr-2 sm:mr-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">{t('contact.address')}</h4>
                      <p className="text-xs sm:text-sm text-gray-700">17 Olmachi St., Mirzo-Ulugbek,</p>
                      <p className="text-xs sm:text-sm text-gray-700">Tashkent, Uzbekistan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-50 p-2 sm:p-2.5 rounded-full mr-2 sm:mr-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">{t('contact.phone')}</h4>
                      <p className="text-xs sm:text-sm text-gray-700">+998 (77) 088 39 77 (ru/uz)</p>
                      <p className="text-xs sm:text-sm text-gray-700">+998 (77) 088 49 77 (ru/en)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-50 p-2 sm:p-2.5 rounded-full mr-2 sm:mr-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">{t('contact.emailContact')}</h4>
                      <a href="mailto:info@cfyi.uz" className="text-xs sm:text-sm text-[#309eb7] hover:underline transition-colors">
                        info@cfyi.uz
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">{t('contact.connectWithUs')}</h4>
                  <div className="flex space-x-2 sm:space-x-3">
                    <a href="https://www.linkedin.com/company/center-for-youth-initiatives" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-[#fb8500] hover:text-white transition-all duration-300 p-2 sm:p-2.5 rounded-full">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a href="https://t.me/+998770884977" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-[#fb8500] hover:text-white transition-all duration-300 p-2 sm:p-2.5 rounded-full">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.306.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/fablab.cfyi" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-[#fb8500] hover:text-white transition-all duration-300 p-2 sm:p-2.5 rounded-full">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                    <a href="https://www.facebook.com/centerforyouthinitiatives" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-[#fb8500] hover:text-white transition-all duration-300 p-2 sm:p-2.5 rounded-full">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 bg-white shadow-lg overflow-hidden"
            >
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t('contact.sendMessage')}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5">
                        {t('contact.name')} <span className="text-brand-red">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact.namePlaceholder')}
                        required
                        className="w-full border border-gray-300 rounded-none px-2.5 sm:px-3 py-1.5 sm:py-2 focus:ring-2 focus:ring-[#309eb7] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5">
                        {t('contact.email')} <span className="text-brand-red">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact.emailPlaceholder')}
                        required
                        className="w-full border border-gray-300 rounded-none px-2.5 sm:px-3 py-1.5 sm:py-2 focus:ring-2 focus:ring-[#309eb7] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5">
                      {t('contact.phone')} <span className="text-gray-400">(Optional)</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.phonePlaceholder')}
                      className="w-full border border-gray-300 rounded-none px-2.5 sm:px-3 py-1.5 sm:py-2 focus:ring-2 focus:ring-[#309eb7] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5">
                      {t('contact.message')} <span className="text-brand-red">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.messagePlaceholder')}
                      rows={4}
                      required
                      className="w-full border border-gray-300 rounded-none px-2.5 sm:px-3 py-1.5 sm:py-2 focus:ring-2 focus:ring-[#309eb7] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white min-h-[100px] sm:min-h-[120px] resize-y text-sm"
                    />
                  </div>
                  
                  {/* Hidden inquiry field to capture industry inquiries */}
                  <input 
                    type="hidden" 
                    id="inquiry" 
                    name="inquiry" 
                    value={formData.inquiry}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-[#309eb7] hover:bg-[#2a8ca3] text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-colors rounded-none shadow-sm hover:shadow-md overflow-hidden group relative"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        t('contact.send')
                      )}
                    </span>
                    <span className="absolute top-0 left-0 w-full h-0 bg-[#2a8ca3] transition-all duration-300 group-hover:h-full"></span>
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
          
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 sm:mt-8 md:mt-10 overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.6504900120997!2d69.312132!3d41.3205264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5005adfee5b%3A0x40d4ef6aaf3894d6!2sCenter%20For%20Youth%20Initiatives!5e0!3m2!1sen!2suk!4v1719448231018!5m2!1sen!2suk"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Center for Youth Initiatives Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 