import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// Blog post data - updated to only include the 3D Printed Prototype
const blogPosts = [
  {
    id: 1,
    title: "3D Printed Prototype Development",
    excerpt: "Created a fully functional prototype using advanced 3D printing techniques for an Uzbek tech startup.",
    date: "May 15, 2023",
    author: "FabLab Team",
    image: "/blog_images/blog1.png",
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
              ? 'bg-brand-red text-white' 
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow bg-white">
        <div className="bg-white py-16 md:py-24 mt-20 md:mt-24 lg:mt-28 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Insights, updates, and stories from the FabLab Uzbekistan team. 
              Stay informed about the latest innovations and developments in manufacturing.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 bg-white">
          {/* Search and Filter Bar */}
          <div className="mb-10 space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                />
                {searchQuery ? (
                  <button 
                    type="button" 
                    onClick={clearSearch}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : null}
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-3">
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-brand-red text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
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
                      <div className="absolute bottom-0 left-0 bg-brand-red py-2 px-4 z-20">
                        <p className="text-white font-medium">
                          {post.category}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-4 text-gray-900">
                        <Link to={`/blog/${post.slug}`} className="hover:text-brand-red transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-sm mb-5 text-gray-700 leading-relaxed">{post.excerpt}</p>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center bg-brand-red text-white py-1.5 px-3 hover:opacity-90 transition-opacity text-sm"
                      >
                        Read more
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
              <h3 className="text-xl font-medium text-gray-600">No posts found matching your search.</h3>
              <div className="mt-4 space-x-4">
                {searchQuery && (
                  <button 
                    onClick={clearSearch} 
                    className="text-brand-red hover:text-brand-darkred font-medium"
                  >
                    Clear search
                  </button>
                )}
                {selectedCategory !== "All" && (
                  <button 
                    onClick={() => setSelectedCategory("All")} 
                    className="text-brand-red hover:text-brand-darkred font-medium"
                  >
                    View all categories
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Newsletter Subscription Section */}
          <div className="mt-16 py-12 px-4 sm:px-8 bg-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-lg text-gray-600 mb-8">
                Stay updated with the latest news, blog posts, and special announcements from FabLab Uzbekistan.
              </p>
              {subscribed ? (
                <div className="bg-green-50 text-green-800 rounded-lg p-4 mb-4 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                  />
                  <button type="submit" className="bg-brand-red hover:bg-brand-darkred text-white font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </form>
              )}
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogIndex; 