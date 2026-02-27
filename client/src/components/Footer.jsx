import React from "react";
import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-700">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">

      {/* Logo + About */}
<div className="md:w-[35%]">
  <div className="flex items-center gap-4 mb-5">
    <img 
      src={assets.logo} 
      alt="logo" 
      className="h-16 md:h-30 object-contain"
    />
    
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
      
      <span className="text-green-600"> _MART</span>
    </h2>
  </div>

  <p className="text-base text-gray-600 leading-relaxed max-w-sm">
    Fresh groceries delivered fast with quality and care.  
    Bringing farm freshness straight to your doorstep.
  </p>
</div>

          {/* Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:w-[55%]">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  {section.title}
                </h3>

                <ul className="space-y-1 text-sm text-gray-600">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="hover:text-green-600 transition duration-200"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MART. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;