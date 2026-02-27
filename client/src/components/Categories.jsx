import React from "react";
import { categories } from "../assets/assets";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="px-6 md:px-16 py-12">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
        Shop by Category
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">

        {categories.map((item, index) => (
          <Link
            key={index}
            to={`/category/${item.path}`}
            className="group relative rounded-2xl p-5 
            transition-all duration-300 
            hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: item.bgColor }}
          >

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt={item.text}
                className="w-20 h-20 object-contain 
                transition-transform duration-300 
                group-hover:scale-105"
              />
            </div>

            {/* Text */}
            <p className="text-center mt-4 font-semibold text-gray-700 
            group-hover:text-green-600 transition">
              {item.text}
            </p>

            {/* Soft Glow (Very Light, No Blur) */}
            <div className="absolute inset-0 rounded-2xl 
            opacity-0 group-hover:opacity-100 
            bg-white/5 transition duration-300 pointer-events-none"></div>

          </Link>
        ))}

      </div>
    </div>
  );
};

export default Categories;