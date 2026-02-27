import React from "react";

const NewsLetter = () => {
  return (
    <section className="mt-24 px-6">
      <div className="max-w-3xl mx-auto  to-purple-50 
      p-8 md:p-12  text-center">

        <h1 className="text-2xl md:text-4xl font-bold mb-3">
          Never Miss a Deal!
        </h1>

        <p className="text-gray-600 mb-8">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </p>

        <form className="flex flex-col sm:flex-row items-center gap-4">

          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-full 
            border border-gray-300 outline-none 
            focus:ring-2 focus:ring-indigo-400 
            transition"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-full 
            bg-indigo-500 hover:bg-indigo-600 
            text-white font-medium 
            transition duration-300 shadow-md hover:scale-105"
          >
            Subscribe
          </button>

        </form>

      </div>
    </section>
  );
};

export default NewsLetter;