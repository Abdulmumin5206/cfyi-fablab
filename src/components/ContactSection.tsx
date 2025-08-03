import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Send, Youtube } from "lucide-react";
import GradientText from "./GradientText";

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
    <section id="contact-section" className="section-spacing bg-[#f5f5f7]">
              <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <div className="flex items-baseline gap-1">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={4}
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
            >
              {t('contact.title')}
            </GradientText>
            <span className="text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
              {t('contact.subtitle')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact Info Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#329db7] text-white p-5">
              <h3 className="text-lg font-bold mb-1">{t('contact.title')}</h3>
              <p className="text-white/90 text-sm">{t('contact.subtitle')}</p>
            </div>
            
            <div className="p-5">
              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-[#329db7]/10 p-2.5 rounded-full">
                    <MapPin className="w-4 h-4 text-[#329db7]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{t('contact.address')}</h4>
                    <p className="text-gray-600 text-xs">17 Olmachi St., Mirzo-Ulugbek,</p>
                    <p className="text-gray-600 text-xs">Tashkent, Uzbekistan</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-[#329db7]/10 p-2.5 rounded-full">
                    <Phone className="w-4 h-4 text-[#329db7]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{t('contact.phone')}</h4>
                    <p className="text-gray-600 text-xs">+998 (77) 088 39 77 (ru/uz)</p>
                    <p className="text-gray-600 text-xs">+998 (77) 088 49 77 (ru/en)</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-[#329db7]/10 p-2.5 rounded-full">
                    <Mail className="w-4 h-4 text-[#329db7]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{t('contact.emailContact')}</h4>
                    <a href="mailto:info@cfyi.uz" className="text-[#329db7] hover:underline transition-colors text-xs">
                      info@cfyi.uz
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">{t('contact.connectWithUs')}</h4>
                  <div className="flex space-x-2">
                    <a 
                      href="https://www.linkedin.com/company/center-for-youth-initiatives" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gray-100 hover:bg-[#329db7] hover:text-white transition-all duration-300 p-2.5 rounded-full"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://www.instagram.com/cfyi.uz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gray-100 hover:bg-[#329db7] hover:text-white transition-all duration-300 p-2.5 rounded-full"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://www.facebook.com/centerforyouthinitiatives" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gray-100 hover:bg-[#329db7] hover:text-white transition-all duration-300 p-2.5 rounded-full"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://t.me/+998770884977" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gray-100 hover:bg-[#329db7] hover:text-white transition-all duration-300 p-2.5 rounded-full"
                    >
                      <Send className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://www.youtube.com/@centerforyouthinitiatives" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gray-100 hover:bg-[#329db7] hover:text-white transition-all duration-300 p-2.5 rounded-full"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-5">
              <h3 className="text-lg font-bold mb-4">{t('contact.sendMessage')}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                      {t('contact.name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#329db7] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                      {t('contact.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#329db7] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                    {t('contact.phone')} <span className="text-gray-400">(Optional)</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.phonePlaceholder')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#329db7] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    rows={4}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#329db7] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white min-h-[100px] resize-y"
                  />
                </div>
                
                {/* Hidden inquiry field */}
                <input 
                  type="hidden" 
                  id="inquiry" 
                  name="inquiry" 
                  value={formData.inquiry}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-[#329db7] hover:bg-[#2a8ca3] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    t('contact.send')
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-6 md:mt-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.6504900120997!2d69.312132!3d41.3205264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5005adfee5b%3A0x40d4ef6aaf3894d6!2sCenter%20For%20Youth%20Initiatives!5e0!3m2!1sen!2suk!4v1719448231018!5m2!1sen!2suk"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Center for Youth Initiatives Location"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 