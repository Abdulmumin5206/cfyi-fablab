import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-40 h-24 flex items-center justify-center">
                <img 
                  src="/fablab/cfyi.svg" 
                  alt="CFYI Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/200x100/gray/white?text=CFYI";
                  }}
                />
              </div>
              <div className="w-40 h-24 flex items-center justify-center">
                <img 
                  src="/fablab/logo.png" 
                  alt="FabLab Logo" 
                  className="w-[85%] h-[85%] object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/200x100/gray/white?text=FabLab";
                  }}
                />
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              FabLab Uzbekistan, in collaboration with Center for Youth Initiatives, is committed to advancing technical education and digital manufacturing. We provide modern equipment and expert support to inspire future innovators.
            </p>
            
            <address className="not-italic mb-6">
              <p>17 Olmachi St., Mirzo-Ulugbek,</p>
              <p>Tashkent, Uzbekistan</p>
            </address>
            <div className="space-y-1">
              <p>Phone: +998 (77) 088 39 77 (ru/uz)</p>
              <p>Phone: +998 (77) 088 49 77 (ru/en)</p>
              <p>
                <a href="mailto:info@cfyi.uz" className="hover:text-brand-yellow">
                  info@cfyi.uz
                </a>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Navigate</h3>
              <ul className="space-y-3">
                <li>
                  <div className="flex flex-col space-y-2">
                    <span className="hover:text-brand-yellow">
                      Services
                    </span>
                    <ul className="pl-3 space-y-2 border-l border-gray-800">
                      <li>
                        <Link to="/3d-printing" className="text-sm text-gray-400 hover:text-brand-yellow">
                          3D Printing
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="text-sm text-gray-400 hover:text-brand-yellow">
                          CNC Machining
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="text-sm text-gray-400 hover:text-brand-yellow">
                          Laser Cutting
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="text-sm text-gray-400 hover:text-brand-yellow">
                          Finishing Services
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="text-sm text-gray-400 hover:text-brand-yellow">
                          Design Consultation
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link to="/" className="hover:text-brand-yellow">
                    Engineering
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-brand-yellow">
                    About Fablab
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-brand-yellow">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-brand-yellow">
                    Our Story
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">About Us</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/blog" className="hover:text-brand-yellow">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-brand-yellow">
                    News
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-brand-yellow">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between">
            <p>© {new Date().getFullYear()} FabLab Uzbekistan. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-white">
                Terms of Service
              </Link>
              <Link to="/" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
