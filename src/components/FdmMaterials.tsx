import { useRef } from "react";

export default function FdmMaterials() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center">
        {/* Left side content */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Build with <span className="text-orange-500">premium quality filaments</span> for any application
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>PLA</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>ABS</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>PETG</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>TPU</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>PC</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>Nylon</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>Carbon Fiber</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>ASA</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>HIPS</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <span>Custom Materials</span>
            </button>
          </div>
          
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium">
            REQUEST A SAMPLE PART
          </button>
        </div>
        
        {/* Right side video/image */}
        <div className="w-full lg:w-1/2 lg:pl-8">
          <div className="relative rounded-md overflow-hidden border-2 border-orange-500 shadow-xl">
            <video
              ref={videoRef}
              className="w-full aspect-[16/9] object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source 
                src="/video/The best 3D prints from our office, vol. 1.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-orange-600 text-white p-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold">FDM SHOWCASE</span> The best 3D prints from our office
                </div>
                <button className="flex items-center gap-1 font-medium">
                  LEARN MORE
                  <span>›</span>
                </button>
              </div>
            </div>
            <button className="absolute top-4 right-4 bg-orange-600 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <span className="sr-only">Pause</span>
              ⏸
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 