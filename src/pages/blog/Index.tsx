import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import GradientText from "@/components/GradientText";

// Blog post data - updated to only include the 3D Printed Prototype
const blogPosts = [
  {
    id: 1,
    title: "3D Printed Prototype Development",
    excerpt: "Created a fully functional prototype using advanced 3D printing techniques for an Uzbek tech startup.",
    date: "May 15, 2023",
    author: "FabLab Team",
    image: "/blog_images/blog1.webp",
    category: "3D Printing",
    slug: "3d-printing-innovations"
  }
];

// Extract unique categories
const allCategories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

// Number of posts per page
const POSTS_PER_PAGE = 6;

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number, 
  totalPages: number, 
  onPageChange: (page: number) => void 
}) => {
  const pageNumbers = [];
  const MAX_PAGE_BUTTONS = 5;

  // Generate array of page numbers to display
  let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  let endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

  if (endPage - startPage + 1 < MAX_PAGE_BUTTONS && startPage > 1) {
    startPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {startPage > 1 && (
        <>
          <button 
            onClick={() => onPageChange(1)} 
            className="px-3 py-1 rounded-md hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md ${
            currentPage === number 
              ? 'bg-[#329db7] text-white' 
              : 'hover:bg-gray-100'
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
          <button 
            onClick={() => onPageChange(totalPages)} 
            className="px-3 py-1 rounded-md hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const BlogIndex = () => {
  const { t: tBlog } = useTranslation('blog');
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Handle filtering when category or search query changes
  useEffect(() => {
    let filtered = blogPosts;
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) || 
        post.author.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(filtered);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of posts when page changes
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the email to your newsletter service
    console.log("Subscribing email:", email);
    setSubscribed(true);
    setEmail("");
    // Reset after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useEffect
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      <Header />
      <main className="flex-grow bg-[#f5f5f7]">
        {/* Projects Headline */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px] pt-48 bg-[#f5f5f7]">
          <div className="text-left mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#329db7] font-['Magistral']">
              {tBlog('blog.projectsHeadline')}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 font-['Magistral'] text-gray-700">
              {tBlog('blog.projectsSubtitle')}
            </p>
          </div>
        </div>
        {/* High-Resolution 3D Scanning Section */}
        <section className="pt-12 md:pt-16 pb-8 md:pb-12 bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-full text-left lg:max-w-xl flex flex-col items-start lg:items-start">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral'] mb-8"
                  >
                    {tBlog("blog.biomimeticArm.title")}
                  </GradientText>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {tBlog("blog.biomimeticArm.description")}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.biomimeticArm.features.accuracy")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.biomimeticArm.features.movement")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.biomimeticArm.features.manipulation")}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral'] mt-4">{tBlog("blog.biomimeticArm.technology")}</p>
                </div>
              </div>
              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/blog_images/arm.webp" 
                    alt="3D Scanning Technology" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Versatile Applications Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-full text-left lg:max-w-xl flex flex-col items-start lg:items-start">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral'] mb-8"
                  >
                    {tBlog("blog.droneProject.title")}
                  </GradientText>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {tBlog("blog.droneProject.description")}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.droneProject.features.frame")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.droneProject.features.motorMounts")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.droneProject.features.modular")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.droneProject.features.aerodynamics")}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral'] mt-4">{tBlog("blog.droneProject.technology")}</p>
                </div>
              </div>
              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/blog_images/dron.webp" 
                    alt="3D Scanning Applications" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* High-Resolution 3D Scanning Section (Duplicate) */}
        <section className="pt-8 md:pt-12 pb-8 md:pb-12 bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-full text-left lg:max-w-xl flex flex-col items-start lg:items-start">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral'] mb-8"
                  >
                    {tBlog("blog.rrrArm.title")}
                  </GradientText>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {tBlog("blog.rrrArm.description")}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.rrrArm.features.joints")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.rrrArm.features.toolHolder")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.rrrArm.features.gears")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.rrrArm.features.accuracy")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.rrrArm.features.modular")}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral'] mt-4">{tBlog("blog.rrrArm.technology")}</p>
                </div>
              </div>
              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/blog_images/3rrr.webp" 
                    alt="3D Scanning Technology" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Versatile Applications Section (Duplicate) */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-full text-left lg:max-w-xl flex flex-col items-start lg:items-start">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral'] mb-8"
                  >
                    {tBlog("blog.surveillanceCar.title")}
                  </GradientText>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {tBlog("blog.surveillanceCar.description")}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.surveillanceCar.features.rotation")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.surveillanceCar.features.raspberryPi")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.surveillanceCar.features.camera")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.surveillanceCar.features.wireless")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{tBlog("blog.surveillanceCar.features.chassis")}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral'] mt-4">{tBlog("blog.surveillanceCar.technology")}</p>
                </div>
              </div>
              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/blog_images/car.webp" 
                    alt="3D Scanning Applications" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px] pt-12 md:pt-16 bg-[#f5f5f7]">
          <div className="text-left mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-[#329db7] font-['Magistral']">{t('blog.title')}</h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mb-3 sm:mb-4 font-['Magistral']">{t('blog.subtitle')}</p>
          </div>
          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
                {currentPosts.map((post) => (
                  <article key={post.id} className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="relative aspect-square mb-6 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />
                      <div className="absolute bottom-0 left-0 bg-[#329db7] py-2 px-4 z-20">
                        <p className="text-white font-medium">
                          {t(`blog.categories.${post.category.toLowerCase().replace(/\s+/g, '')}`)}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-gray-900">
                        <Link to={`/projects/${post.slug}`} className="hover:text-[#329db7] transition-colors">
                          {t(`blog.posts.${post.slug}.title`)}
                        </Link>
                      </h2>
                      <Link 
                        to={`/projects/${post.slug}`}
                        className="inline-flex items-center bg-[#329db7] text-white py-1.5 px-3 hover:bg-[#2b86a0] transition-opacity text-sm"
                      >
                        {t('blog.readMore')}
                        <ArrowRight className="ml-1.5 w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              {/* Pagination */}
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600">{t('blog.noPostsFound')}</h3>
            </div>
          )}
        </div>
        {/* Newsletter Subscription Section */}
        <div className="mt-16 py-12 px-4 sm:px-8 bg-[#f5f5f7]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('blog.newsletter.title')}</h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-8">
              {t('blog.newsletter.description')}
            </p>
            {subscribed ? (
              <div className="bg-green-50 text-green-800 rounded-lg p-4 mb-4 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{t('blog.newsletter.thankYou')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('blog.newsletter.emailPlaceholder')}
                  required
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#329db7] focus:border-transparent"
                />
                <button type="submit" className="bg-[#329db7] hover:bg-[#2b86a0] text-white font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
                  {t('blog.newsletter.subscribe')}
                </button>
              </form>
            )}
            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              {t('blog.newsletter.privacyNotice')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogIndex; 