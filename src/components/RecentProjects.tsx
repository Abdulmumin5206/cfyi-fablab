import React from "react";
import { Link } from "react-router-dom";

const featureImage = "/main/3dprinting1.jpg";
const cardImages = [
  "/blog_images/1.webp",
  "/main/prototyping1.webp",
  "/main/scrolling1.webp"
];

const cardLinks = [
  "/project/1",
  "/project/2",
  "/project/3"
];

const RecentProjects = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gray-200">
      <div className="container mx-auto px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Latest News</h2>
        {/* Top Feature Card */}
        <div className="w-full mb-4 sm:mb-6">
          <div className="bg-white overflow-hidden flex flex-col md:flex-row h-full border-none">
            <div className="w-full md:w-2/3 h-48 sm:h-64 md:h-96 relative">
              <img
                src={featureImage}
                alt="Feature"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-center p-4 sm:p-6 md:p-8 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200">
              <div className="uppercase text-xs font-semibold mb-2 text-gray-500">Blazing Fast Post-Curing</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Form Cure (2nd Generation): Post-Cure Parts 2x-8.6x Faster</h3>
              <p className="mb-3 sm:mb-4 text-gray-700 text-xs sm:text-sm">Introducing Form Cure (2nd Generation), offering blazing fast curing and nearly instant heat up time. Save 2x-8.6x in cure time over Form Cure (1st Generation) in a bigger cure that can fit any part printed on Form 4.</p>
              <button className="bg-black text-white px-4 sm:px-5 py-2 rounded-none font-semibold w-max text-xs sm:text-sm">Learn More</button>
            </div>
          </div>
        </div>
        {/* Bottom Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cardImages.map((img, idx) => (
            <Link
              to={cardLinks[idx]}
              key={idx}
              className="bg-white overflow-hidden shadow-lg flex flex-col h-full transition-transform hover:scale-105 focus:scale-105 outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 mb-4 md:mb-0 border-none"
              tabIndex={0}
              style={{ borderRadius: 0 }}
            >
              <div className="w-full h-52 sm:h-64 relative" style={{ borderRadius: 0 }}>
                <img
                  src={img}
                  alt={`Project ${idx + 1}`}
                  className="object-cover w-full h-full"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-1 justify-center" style={{ borderRadius: 0 }}>
                <div className="uppercase text-[10px] sm:text-xs font-semibold mb-1 text-gray-500">Category</div>
                <h4 className="text-xs sm:text-sm font-bold mb-1">Project Title {idx + 1}</h4>
                <p className="text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">Short description of the project goes here. This is placeholder text.</p>
              </div>
            </Link>
          ))}
        </div>
        {/* Read All News Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <button className="bg-[#309eb7] hover:bg-[#2a8ca3] text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-none text-base sm:text-lg transition-all">READ ALL NEWS</button>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects; 