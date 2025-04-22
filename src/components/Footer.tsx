import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              Think<span className="text-sm">:</span>
              <span className="text-sm font-normal">Group</span>
            </div>
            <address className="not-italic mb-6">
              <p>Millersdale Ct, Euroway Industrial Estate</p>
              <p>Bradford</p>
              <p>BD4 6RX, UK</p>
            </address>
            <div className="space-y-1">
              <p>T: +44 (0) 1274 689400</p>
              <p>
                <a href="mailto:info@thinkgroupuk.co.uk" className="hover:text-brand-yellow">
                  info@thinkgroupuk.co.uk
                </a>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Navigate</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="hover:text-brand-yellow">
                    Services
                  </Link>
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
                  <Link to="/" className="hover:text-brand-yellow">
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
            <p>© {new Date().getFullYear()} Think Group. All rights reserved.</p>
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
