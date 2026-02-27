import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const navigate = useNavigate();
  const { products } = useAppContext();

  // ✅ In-stock products
  const firstFive = products
    .filter((item) => item.inStock)
    .slice(0, 5);

  return (
    <section className="py-12 px-6 md:px-16 bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          Best Sellers
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="text-green-600 font-medium hover:underline"
        >
          View All →
        </button>
      </div>

      {/* Product Grid */}
      {firstFive.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {firstFive.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No products available
        </p>
      )}
    </section>
  );
};

export default BestSeller;