import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const {
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
  } = useAppContext();

  // ✅ Get current quantity from global cart
  const count = cartItems[product._id] || 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product._id);
    toast.success(`${product.name} added to cart 🛒`);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateCartItem(product._id, count + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();

    if (count === 1) {
      removeFromCart(product._id);
      toast(`${product.name} removed from cart`);
    } else {
      updateCartItem(product._id, count - 1);
    }
  };

  const handleNavigate = () => {
    navigate(`/product/${product.category}/${product._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image */}
      <div className="relative flex items-center justify-center h-40 bg-gray-50 rounded-xl overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="h-32 object-contain group-hover:scale-110 transition duration-300"
        />

        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
          {Math.round(
            ((product.price - product.offerPrice) / product.price) * 100
          )}
          % OFF
        </span>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <p className="text-xs text-indigo-500 font-semibold uppercase">
          {product.category}
        </p>

        <h3 className="text-gray-800 font-semibold text-base truncate">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-indigo-600">
              ₹{product.offerPrice}
            </p>
            <p className="text-sm text-gray-400 line-through">
              ₹{product.price}
            </p>
          </div>

          {count === 0 ? (
            <button
              onClick={handleAdd}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-indigo-100 rounded-lg overflow-hidden">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 text-indigo-600 hover:bg-indigo-200"
              >
                -
              </button>
              <span className="px-3 text-sm font-medium">
                {count}
              </span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 text-indigo-600 hover:bg-indigo-200"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;