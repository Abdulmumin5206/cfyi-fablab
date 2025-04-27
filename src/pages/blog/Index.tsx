import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dummy blog post data
const blogPosts = [
  {
    id: 1,
    title: "Latest Innovations in 3D Printing Technology",
    excerpt: "Discover the cutting-edge developments in 3D printing that are transforming manufacturing processes.",
    date: "May 15, 2023",
    author: "John Smith",
    image: "/images/blog/3d-printing.jpg",
    category: "Technology",
    slug: "3d-printing-innovations"
  },
  {
    id: 2,
    title: "How Sustainable Manufacturing is Changing the Industry",
    excerpt: "Explore how sustainable practices are reshaping manufacturing standards worldwide.",
    date: "April 28, 2023",
    author: "Emma Johnson",
    image: "/images/blog/sustainable-manufacturing.jpg",
    category: "Sustainability",
    slug: "sustainable-manufacturing"
  },
  {
    id: 3,
    title: "The Impact of AI on Modern Manufacturing",
    excerpt: "An in-depth look at how artificial intelligence is revolutionizing the manufacturing landscape.",
    date: "March 10, 2023",
    author: "David Chen",
    image: "/images/blog/ai-manufacturing.jpg",
    category: "Technology",
    slug: "ai-manufacturing-impact"
  }
];

const BlogIndex = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Blog</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Insights, updates, and stories from the Think Group team. 
              Stay informed about the latest innovations and developments in manufacturing.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <div className="h-56 bg-gray-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <span>Image Placeholder</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-yellow-600 font-medium">{post.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3">
                    <Link to={`/blog/${post.slug}`} className="text-gray-900 hover:text-yellow-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
                    >
                      Read more
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogIndex; 