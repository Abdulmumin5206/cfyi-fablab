import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Engineering = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-[url('/fablab/13.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Engineering Services</h1>
                <p className="text-xl text-white/90">
                  Pioneering textile expertise in engineering
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Engineering Expertise</h2>
              <p className="mb-6">
                At Think Engineering, we specialize in fibre/feather cusion fillings machines and fabric inspection tables. 
                Our team of experienced engineers provides innovative solutions for textile manufacturing and processing.
              </p>
              
              <h3 className="text-2xl font-bold mt-12 mb-4">Our Services Include:</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex-shrink-0 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Machine Design & Manufacturing</h4>
                    <p className="text-gray-700">Custom-designed machines for textile processing with high efficiency and precision.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex-shrink-0 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Fabric Inspection Solutions</h4>
                    <p className="text-gray-700">Advanced fabric inspection tables with automated defect detection systems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex-shrink-0 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Emergency Repairs</h4>
                    <p className="text-gray-700">Quick response maintenance and repair services to minimize downtime.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex-shrink-0 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">General Engineering Services</h4>
                    <p className="text-gray-700">Comprehensive engineering support for textile manufacturing operations.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-12 bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Need Engineering Support?</h3>
                <p className="mb-6">
                  Contact our team of experts to discuss your specific requirements and how we can help optimize your textile manufacturing processes.
                </p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition-colors"
                >
                  <span>Contact Our Engineering Team</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Engineering; 