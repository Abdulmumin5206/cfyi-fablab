import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Sample project data - replace with actual data when available
// These should match the structure of your existing blog posts
const recentProjects = [
  {
    id: 1,
    titleKey: "projects.1.title",
    excerptKey: "projects.1.excerpt",
    image: "/blog_images/blog1.webp", 
    categoryKey: "projects.1.category",
    slug: "3d-printing-innovations" // Should match existing blog slugs
  }
];

const RecentProjects = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('projects.title')}</h2>
              <p className="text-gray-600 max-w-2xl">
                {t('projects.subtitle')}
              </p>
            </div>
            <Link 
              to="/blog"
              className="text-brand-red hover:text-red-700 font-medium mt-4 md:mt-0 flex items-center gap-1 transition-colors"
            >
              {t('projects.viewAll')}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentProjects.map((project, index) => (
              <motion.article 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link 
                  to={`/blog/${project.slug}`} 
                  className="block w-full pt-[100%] relative"
                  style={{ 
                    backgroundImage: `url(${project.image})`, 
                    backgroundSize: '95% 95%',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-brand-red text-white text-xs font-medium px-2.5 py-1 rounded">
                      {t(project.categoryKey)}
                    </span>
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    <Link to={`/blog/${project.slug}`} className="text-gray-900 hover:text-brand-red transition-colors">
                      {t(project.titleKey)}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{t(project.excerptKey)}</p>
                  <Link 
                    to={`/blog/${project.slug}`}
                    className="text-brand-red hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    {t('projects.readMore')}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects; 