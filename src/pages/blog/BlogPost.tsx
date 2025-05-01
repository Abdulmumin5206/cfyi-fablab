import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

// Define types for our blog post structure
type Section = {
  id: string;
  title: string;
  content: string;
};

type BlogPostData = {
  title: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
  image: string;
  category: string;
  sections?: Section[];
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState("");
  
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
      title: "How Companies Take Ideas From Concept to Reality in Under 24 Hours with 3D Printing",
      date: "May 15, 2023",
      author: "John Smith",
      readTime: "7 minutes read",
      category: "Interviews",
      content: `
        <p>3D printing technology continues to revolutionize product development workflows across multiple industries. In this article, we explore how companies are leveraging additive manufacturing to dramatically reduce their time-to-market and enable rapid prototyping that was previously impossible.</p>
      `,
      sections: [
        {
          id: "behind-the-scenes",
          title: "Behind the Scenes at the State of the Art R&D Facility",
          content: `
            <p>The journey from concept to finished product used to take weeks or even months. Today, with advanced 3D printing capabilities, companies can transform ideas into physical prototypes within hours. We went behind the scenes at several cutting-edge R&D facilities to see how they're implementing these workflows.</p>
            <p>Equipped with industrial-grade 3D printers capable of producing parts with micron-level precision, these facilities have revolutionized their design process. Engineers can now iterate through multiple design versions in a single day, testing form, fit, and function in real-time.</p>
            <p>The ability to rapidly prototype has fundamentally changed how these teams approach problem-solving. Instead of lengthy design discussions, they can quickly print multiple solutions and test them empirically, leading to better products and more innovative designs.</p>
          `
        },
        {
          id: "rethinking-workflows",
          title: "Rethinking Traditional Workflows with 3D Printing",
          content: `
            <p>Traditional manufacturing processes often require expensive tooling and setup procedures that make small production runs or one-off prototypes prohibitively expensive. 3D printing eliminates these constraints, enabling a more fluid and iterative approach to product development.</p>
            <p>Companies are now able to test market reception with small batch productions before committing to full-scale manufacturing. This reduces financial risk and allows for more experimental approaches to product design.</p>
            <p>The flexibility of 3D printing also means that customization no longer comes with a significant cost premium. Products can be tailored to specific requirements without the traditional manufacturing penalties associated with customization.</p>
          `
        },
        {
          id: "design-to-print",
          title: "From Design to Print in a Matter of Minutes",
          content: `
            <p>Modern 3D printing workflows have eliminated many of the barriers between digital design and physical production. With advanced slicing software and cloud-connected printers, the time from CAD model to printed part continues to shrink.</p>
            <p>Engineers at leading companies now use intuitive design software that directly interfaces with their 3D printers, allowing them to move from concept to production with just a few clicks. Some systems even incorporate AI-assisted design optimization to improve printability and performance.</p>
            <p>The result is a dramatically compressed development cycle where designers can have physical prototypes in their hands within hours of the initial concept, allowing them to test, refine, and iterate at unprecedented speeds.</p>
          `
        },
        {
          id: "custom-projects",
          title: "Rapid Response Project With Custom Product Development",
          content: `
            <p>When disaster struck in Australia with the bushfires, one company was able to design, develop, and produce a custom relief product in just 72 hours. Using 3D printing, they created specialized soap molds in the shape of koalas, with proceeds going to wildlife recovery efforts.</p>
            <p>This rapid response would have been impossible with traditional manufacturing methods. The ability to quickly design, iterate, and produce functional molds demonstrates how 3D printing enables companies to be more agile and responsive to market needs or humanitarian opportunities.</p>
            <p>The project not only raised significant funds for bushfire relief but also showcased how additive manufacturing can compress product development timelines from months to days.</p>
          `
        },
        {
          id: "thinking-outside",
          title: "Thinking Outside of the Box",
          content: `
            <p>The design freedom offered by 3D printing is pushing companies to rethink product development fundamentals. Structures and geometries that would be impossible to manufacture with traditional methods are now not only possible but practical.</p>
            <p>This capability is driving innovation in fields from medical devices to aerospace. Companies are creating lighter, stronger, and more efficient products by leveraging the unique capabilities of additive manufacturing.</p>
            <p>By removing the constraints of traditional manufacturing processes, designers are free to focus on optimal functionality rather than manufacturing limitations, leading to breakthroughs in product performance and user experience.</p>
          `
        },
        {
          id: "saving-costs",
          title: "Saving Costs and Increasing Productivity",
          content: `
            <p>The economic impact of integrating 3D printing into product development workflows extends beyond just faster time-to-market. Companies report significant cost savings in prototyping, with reductions of 70-90% compared to traditional methods.</p>
            <p>These savings come from eliminating tooling costs, reducing material waste, decreasing labor requirements, and shortening the overall development cycle. The ability to quickly test and validate designs also reduces costly design errors that might otherwise only be discovered during mass production.</p>
            <p>Additionally, the productivity gains from faster iteration cycles mean that development teams can explore more design options and refinements within the same timeframe, leading to better end products.</p>
          `
        },
        {
          id: "roi-in-house",
          title: "The ROI of In-House 3D Printing",
          content: `
            <p>Companies that have invested in in-house 3D printing capabilities report compelling returns on investment, often recouping their equipment costs within 6-18 months. The combination of reduced prototyping costs, faster development cycles, and improved products creates a clear business case for these investments.</p>
            <p>Beyond the direct financial benefits, companies also report improvements in team collaboration, increased innovation, and greater customer satisfaction due to the ability to respond quickly to feedback and requirements.</p>
            <p>As 3D printing technology continues to advance and become more affordable, the business case for incorporating these capabilities becomes even stronger, particularly for companies where rapid innovation and customization are competitive advantages.</p>
          `
        }
      ],
      image: "/blog_images/1.png"
    },
    "sustainable-manufacturing": {
      title: "How Sustainable Manufacturing is Changing the Industry",
      date: "April 28, 2023",
      author: "Emma Johnson",
      readTime: "5 minutes read",
      content: `<p>Sustainable manufacturing practices are revolutionizing how products are made...</p>`,
      image: "/images/blog/sustainable-manufacturing.jpg",
      category: "Sustainability"
    },
    "ai-manufacturing-impact": {
      title: "The Impact of AI on Modern Manufacturing",
      date: "March 10, 2023",
      author: "David Chen",
      readTime: "6 minutes read",
      content: `<p>Artificial intelligence is transforming manufacturing processes in unprecedented ways...</p>`,
      image: "/images/blog/ai-manufacturing.jpg",
      category: "Technology"
    }
  };
  
  // Get post data based on the slug
  const post: BlogPostData = blogPosts[slug as keyof typeof blogPosts] || {
    title: "Blog Post Not Found",
    date: "",
    author: "",
    readTime: "",
    content: "<p>The requested blog post could not be found.</p>",
    image: "/images/blog/placeholder.jpg",
    category: "",
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
              <div className="container mx-auto px-4">
                <Link to="/blog" className="inline-flex items-center text-black hover:text-gray-600 transition-colors text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  All Posts
                </Link>
              </div>
            </div>
          )}

          <div className="container mx-auto px-4 py-6 md:py-10">
            {is3DPrintingPost ? (
              <div className="flex flex-col md:flex-row">
                {/* Left sidebar with table of contents */}
                <div className="w-full md:w-1/4 md:pr-8 mb-8 md:mb-0">
                  <div className="sticky top-24">
                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-4">Table of Contents</h4>
                      <nav className="space-y-2">
                        {post.sections?.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`block text-left text-sm hover:text-gray-700 w-full ${
                              activeSection === section.id ? 'font-semibold text-black' : 'text-gray-600'
                            }`}
                          >
                            {section.title}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="w-full md:w-3/4">
                  <div className="mb-4">
                    <div className="uppercase text-sm font-semibold mb-2">{post.category}</div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                      <div className="flex items-center gap-2">
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-2">
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured image */}
                  <div className="mb-10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  {/* Intro content */}
                  <div className="prose prose-lg max-w-none mb-10">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  {/* Sections */}
                  {post.sections?.map((section) => (
                    <section key={section.id} id={section.id} className="mb-12">
                      <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                      <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </section>
                  ))}

                  {/* Share links */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Share this article</h3>
                      <div className="flex items-center gap-4">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"></path>
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Regular blog post display (not the 3D printing post)
              <div className="max-w-3xl mx-auto">
                <Link to="/blog" className="inline-flex items-center text-brand-red hover:text-brand-darkred mb-6 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to Blog
                </Link>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-yellow px-3 py-1 rounded-full text-gray-800 font-medium text-sm">{post.category}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <span>By {post.author}</span>
                  </div>
                </div>
                
                {/* Featured image */}
                <div className="my-8">
                  <div className="h-80 md:h-96 lg:h-[500px] rounded-lg relative overflow-hidden shadow-md">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>
            )}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-gray-50 py-12">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedPosts.map((relatedPost) => (
                      <article key={relatedPost.slug} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                        <div className="h-40 bg-gray-200 relative">
                          <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${relatedPost.image})` }}
                          />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-brand-yellow px-2 py-1 rounded-full text-gray-800 font-medium">{relatedPost.category}</span>
                          </div>
                          <h4 className="text-lg font-bold mb-2 text-gray-900">
                            <Link to={`/blog/${relatedPost.slug}`} className="hover:text-brand-red transition-colors">
                              {relatedPost.title}
                            </Link>
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{relatedPost.date}</span>
                            <Link 
                              to={`/blog/${relatedPost.slug}`}
                              className="text-brand-red hover:text-brand-darkred font-medium flex items-center gap-1 text-sm transition-colors"
                            >
                              Read more
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost; 