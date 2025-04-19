
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "fibres",
    title: "Think: Fibres & Fillings",
    description: "The UK's leading supplier of natural and polyester fibres & fillings. We're pioneering sustainable performance in upholstery, bedding, soft furnishing, toys and more. Discover how we can help you today!",
    image: "/lovable-uploads/3d68e696-90ce-467c-b677-e40541154882.png",
    buttonText: "Explore Fibres & Fillings",
    buttonColor: "bg-brand-yellow",
    buttonLink: "/",
  },
  {
    id: "nonwovens",
    title: "Think: Non-Wovens",
    description: "The UK's leading manufacturer of high performance non-wovens. The home of SpringBond Underlay and SpringBond UltraFlex. Discover our range of high performance sustainable PU foam replacements.",
    image: "/lovable-uploads/3a54883a-8ef0-44a2-bbda-323c7b14b2e3.png",
    buttonText: "Explore Non-Wovens",
    buttonColor: "bg-blue-600",
    buttonLink: "/",
  },
  {
    id: "engineering",
    title: "Think: Engineering",
    description: "Pioneering textile expertise in engineering. We specialise in fibre / feather cusion fillings machines and fabric inspection tables. We also offer general engineering services and emergency repairs.",
    image: "/lovable-uploads/cb16f92b-5607-4200-8b8b-179102266667.png",
    buttonText: "Explore Engineering",
    buttonColor: "bg-brand-red",
    buttonLink: "/",
  },
];

const ProductCategories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white shadow-sm">
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-6">{category.description}</p>
                <a
                  href={category.buttonLink}
                  className={`inline-flex items-center space-x-2 ${category.buttonColor} text-white px-4 py-2`}
                >
                  <span>{category.buttonText}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
