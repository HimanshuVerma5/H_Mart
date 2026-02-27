import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, categories } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const ProductCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useAppContext();

  // 🔥 Category banner data
  const categoryData = categories.find(
    (cat) => cat.path.toLowerCase() === category.toLowerCase()
  );

  // 🔥 Filter products from context
  const filteredProducts = products.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="px-6 md:px-12 py-10">

      {/* ✅ Category Banner */}
      {categoryData && (
        <div
          className="rounded-2xl p-6 mb-10 flex items-center justify-between flex-wrap gap-6"
          style={{ backgroundColor: categoryData.bgColor }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {categoryData.text}
            </h1>
            <p className="text-gray-600 mt-2">
              Fresh and high quality products delivered fast.
            </p>
          </div>

          <img
            src={categoryData.image}
            alt={categoryData.text}
            className="w-32 md:w-40 object-contain"
          />
        </div>
      )}

      {/* ✅ Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/product/${item.category}/${item._id}`)
              }
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

              {/* Add To Cart */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 prevent navigation
                  addToCart(item._id);
                }}
                className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default ProductCategory;