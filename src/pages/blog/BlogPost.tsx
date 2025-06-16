import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Define types for our blog post structure
type Section = {
  id: string;
  titleKey: string;
  contentKey: string;
};

type BlogPostData = {
  titleKey: string;
  dateKey: string;
  authorKey: string;
  readTimeKey: string;
  contentKey: string;
  image: string;
  categoryKey: string;
  sections?: Section[];
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState("");
  const { t } = useTranslation();
  
  // Function to handle section navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Effect to handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Sample blog posts data for demonstration
  const blogPosts: Record<string, BlogPostData> = {
    "3d-printing-innovations": {
      titleKey: "blog.posts.3d-printing-innovations.title",
      dateKey: "blog.posts.3d-printing-innovations.date",
      authorKey: "blog.posts.3d-printing-innovations.author",
      readTimeKey: "blog.posts.3d-printing-innovations.readTime",
      contentKey: "blog.posts.3d-printing-innovations.content",
      categoryKey: "blog.posts.3d-printing-innovations.category",
      sections: [
        {
          id: "challenge",
          titleKey: "blog.posts.3d-printing-innovations.sections.challenge.title",
          contentKey: "blog.posts.3d-printing-innovations.sections.challenge.content"
        },
        {
          id: "design-process",
          titleKey: "blog.posts.3d-printing-innovations.sections.design-process.title",
          contentKey: "blog.posts.3d-printing-innovations.sections.design-process.content"
        },
        {
          id: "optimization",
          titleKey: "blog.posts.3d-printing-innovations.sections.optimization.title",
          contentKey: "blog.posts.3d-printing-innovations.sections.optimization.content"
        },
        {
          id: "production",
          titleKey: "blog.posts.3d-printing-innovations.sections.production.title",
          contentKey: "blog.posts.3d-printing-innovations.sections.production.content"
        },
        {
          id: "results",
          titleKey: "blog.posts.3d-printing-innovations.sections.results.title",
          contentKey: "blog.posts.3d-printing-innovations.sections.results.content"
        },
        {
          id: "conclusion",
          titleKey: "blog.posts.3d-printing-innovations.sections.conclusion.title",
          contentKey: "blog.posts.3d-printing-innovations.sections.conclusion.content"
        }
      ],
      image: "/blog_images/1.webp"
    },
    "sustainable-manufacturing": {
      titleKey: "blog.posts.sustainable-manufacturing.title",
      dateKey: "blog.posts.sustainable-manufacturing.date",
      authorKey: "blog.posts.sustainable-manufacturing.author",
      readTimeKey: "blog.posts.sustainable-manufacturing.readTime",
      contentKey: "blog.posts.sustainable-manufacturing.content",
      categoryKey: "blog.posts.sustainable-manufacturing.category",
      image: "/images/blog/sustainable-manufacturing.jpg"
    },
    "ai-manufacturing-impact": {
      titleKey: "blog.posts.ai-manufacturing-impact.title",
      dateKey: "blog.posts.ai-manufacturing-impact.date",
      authorKey: "blog.posts.ai-manufacturing-impact.author",
      readTimeKey: "blog.posts.ai-manufacturing-impact.readTime",
      contentKey: "blog.posts.ai-manufacturing-impact.content",
      categoryKey: "blog.posts.ai-manufacturing-impact.category",
      image: "/images/blog/ai-manufacturing.jpg"
    }
  };
  
  // Get post data based on the slug
  const post: BlogPostData = blogPosts[slug as keyof typeof blogPosts] || {
    titleKey: "blog.posts.notFound.title",
    dateKey: "",
    authorKey: "",
    readTimeKey: "",
    contentKey: "<p>The requested blog post could not be found.</p>",
    categoryKey: "",
    image: "/images/blog/placeholder.jpg",
    sections: []
  };

  // Related posts (excluding current post)
  const relatedPosts = Object.entries(blogPosts)
    .filter(([postSlug]) => postSlug !== slug)
    .map(([postSlug, postData]) => ({
      slug: postSlug,
      ...postData
    }))
    .slice(0, 2); // Limit to 2 related posts

  // Check if we're viewing the 3D printing blog post
  const is3DPrintingPost = slug === "3d-printing-innovations";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-20 md:pt-24">
        <article>
          {/* White header bar for 3D printing post */}
          {is3DPrintingPost && (
            <div className="w-full bg-white py-4">
              <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
                <Link to="/blog" className="inline-flex items-center text-black hover:text-gray-600 transition-colors text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  {t('blog.backToAllPosts')}
                </Link>
              </div>
            </div>
          )}

          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px] py-6 md:py-10">
            {is3DPrintingPost ? (
              <div className="flex flex-col md:flex-row">
                {/* Left sidebar with table of contents */}
                <div className="w-full md:w-1/4 md:pr-8 mb-8 md:mb-0">
                  <div className="sticky top-24">
                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-4">{t('blog.tableOfContents')}</h4>
                      <nav className="space-y-2">
                        {post.sections?.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`block text-left text-sm hover:text-gray-700 w-full ${
                              activeSection === section.id ? 'font-semibold text-black' : 'text-gray-600'
                            }`}
                          >
                            {t(section.titleKey)}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="w-full md:w-3/4">
                  <div className="prose prose-lg max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{t(post.titleKey)}</h1>
                    <div className="flex items-center text-gray-600 mb-8">
                      <span className="mr-4">{t(post.dateKey)}</span>
                      <span className="mr-4">{t(post.authorKey)}</span>
                      <span>{t('blog.readTime', { minutes: 7 })}</span>
                    </div>
                    <div className="mb-8">
                      <img 
                        src={post.image} 
                        alt={t(post.titleKey)}
                        className="max-w-3xl h-auto rounded-lg"
                      />
                    </div>
                    <div className="mb-8">
                      <p>{t(post.contentKey)}</p>
                    </div>
                    {post.sections?.map((section) => (
                      <section key={section.id} id={section.id} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">{t(section.titleKey)}</h2>
                        <div dangerouslySetInnerHTML={{ __html: t(section.contentKey) }} />
                        {section.id === "challenge" && (
                          <img 
                            src="/blog_images/2.webp" 
                            alt="SLA Printing Setup" 
                            className="max-w-3xl h-auto rounded-lg my-6"
                          />
                        )}
                        {section.id === "design-process" && (
                          <img 
                            src="/blog_images/3.webp" 
                            alt="Material Testing Process" 
                            className="max-w-3xl h-auto rounded-lg my-6"
                          />
                        )}
                        {section.id === "optimization" && (
                          <img 
                            src="/blog_images/4.webp" 
                            alt="Production Optimization" 
                            className="max-w-3xl h-auto rounded-lg my-6"
                          />
                        )}
                        {section.id === "production" && (
                          <img 
                            src="/blog_images/5.webp" 
                            alt="Production Process" 
                            className="max-w-3xl h-auto rounded-lg my-6"
                          />
                        )}
                        {section.id === "results" && (
                          <img 
                            src="/blog_images/blog1.webp" 
                            alt="Final Results" 
                            className="max-w-3xl h-auto rounded-lg my-6"
                          />
                        )}
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold mb-4">{t('blog.posts.notFound.title')}</h1>
                <p className="text-gray-600 mb-8">{t('blog.posts.notFound.content')}</p>
                <Link 
                  to="/blog"
                  className="inline-flex items-center text-brand-red hover:text-red-700 font-medium"
                >
                  {t('blog.backToAllPosts')}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost; 