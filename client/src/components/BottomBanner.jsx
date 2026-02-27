import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <section className="mt-24">

      {/* HERO CONTAINER */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.bottom_banner_image})`,
        }}
      >
        {/* Mobile Background Override */}
        <div
          className="md:hidden absolute inset-0 bg-cover bg-center -z-10"
          style={{
            backgroundImage: `url(${assets.bottom_banner_image_sm})`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="bg-gradient-to-r from-black/80 via-black/60 to-green-900/70">

          <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">

            {/* GRID */}
            <div className="flex flex-col md:flex-row items-center gap-12">

              {/* LEFT CONTENT */}
              <div className="text-white flex-1 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                  Why We Are the Best?
                </h1>

                <p className="text-white/90 mb-6 max-w-md mx-auto md:mx-0">
                  Fresh groceries delivered fast at affordable prices.
                  Trusted by thousands of happy customers.
                </p>

                <button className="bg-green-500 hover:bg-green-600 
                px-6 py-3 rounded-full font-medium 
                transition duration-300 shadow-lg hover:scale-105">
                  Shop Now
                </button>
              </div>

              {/* RIGHT FEATURES */}
              <div className="flex-1 w-full">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md 
                      p-5 rounded-xl text-white 
                      hover:bg-white/20 transition duration-300"
                    >
                      {/* ICON CIRCLE */}
                      <div className="w-12 h-12 flex items-center justify-center 
                      bg-green-500/20 rounded-full mb-4">
                        <img
                          src={feature.icon}
                          alt={feature.title}
                          className="w-6 h-6"
                        />
                      </div>

                      <h3 className="font-semibold mb-1">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-white/80">
                        {feature.description}
                      </p>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default BottomBanner;