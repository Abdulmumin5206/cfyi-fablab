import { useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

// Memoize products to prevent re-renders
const products: Product[] = [
  {
    id: "springbond",
    category: "Non-Wovens",
    title: "SpringBond®",
    description: "The PU foam replacement technology for underlay",
    image: "/images/product1.jpg.webp",
    link: "/",
  },
  {
    id: "ultraflex",
    category: "Non-Wovens",
    title: "SpringBond UltraFlex®",
    description: "Bespoke high performance foam replacement solutions for the world's leading brands.",
    image: "/images/product2.jpg.webp",
    link: "/",
  },
  {
    id: "hollow-conjugate",
    category: "Fibres & Fillings",
    title: "Hollow Conjugate Fibres",
    description: "A spring-like structure that adds extra loft, providing superior comfort and resilience.",
    image: "/images/product3.jpg.webp",
    link: "/",
  },
  {
    id: "carded-fibres",
    category: "Fibres & Fillings",
    title: "Carded Fibres",
    description: "A soft, uniformly processed fibre ideal for hand-filling.",
    image: "/images/product4.jpg.webp",
    link: "/",
  },
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, products.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  return (
    <section className="py-16 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Our Top Products</h2>
          
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 bg-black text-white disabled:opacity-50"
              aria-label="Previous slide"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === products.length - 1}
              className="p-2 bg-black text-white disabled:opacity-50"
              aria-label="Next slide"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden relative h-[500px]">
          <div 
            className="flex transition-transform duration-300 ease-out" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                  <div className="bg-white p-8">
                    <div className="mb-4 text-gray-600">{product.category}</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h3>
                    <p className="text-lg mb-6">{product.description}</p>
                    <a
                      href={product.link}
                      className="inline-flex items-center space-x-1 border border-black py-2 px-4 hover:bg-black hover:text-white transition-colors"
                    >
                      <span className="ml-1">Learn More</span>
                    </a>
                  </div>
                  <div className="bg-white flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      width={800}
                      height={500}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
