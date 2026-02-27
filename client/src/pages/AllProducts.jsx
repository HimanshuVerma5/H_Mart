import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const AllProducts = () => {
  const { products = [], addToCart } = useAppContext();
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || "";

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-6 md:px-12 py-10">

      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "All Products"}
        </h1>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 flex-wrap mb-8">
        {["All", "Vegetables", "Fruits", "Drinks", "Dairy", "Bakery", "Grains", "Instant"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              category === cat
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-green-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.map((item) => (
          <div
            key={item._id}
           onClick={() => navigate(`/product/${item.category}/${item._id}`)}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-4 cursor-pointer"
          >
            {/* Image */}
            <div className="h-32 flex items-center justify-center mb-3">
              <img
                src={item.image[0]}
                alt={item.name}
                className="h-full object-contain"
              />
            </div>

            {/* Name */}
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
              {item.name}
            </h3>

            {/* Rating */}
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4].map((star) => (
                <img
                  key={star}
                  src={assets.star_icon}
                  alt="star"
                  className="h-3"
                />
              ))}
              <img
                src={assets.star_dull_icon}
                alt="star"
                className="h-3"
              />
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-600 font-bold">
                ₹{item.offerPrice}
              </span>
              <span className="text-gray-400 text-sm line-through">
                ₹{item.price}
              </span>
            </div>

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 🔥 prevent card click
                addToCart(item._id);
              }}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 rounded-lg transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No products found.
        </div>
      )}
    </div>
  );
};

export default AllProducts;