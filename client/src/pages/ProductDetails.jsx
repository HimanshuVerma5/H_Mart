import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ MOVE HERE

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((item) => item._id === id);

  // Set thumbnail when product loads
  useEffect(() => {
    if (product) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // Set related products
  useEffect(() => {
    if (product) {
      const filtered = products.filter(
        (item) =>
          item.category === product.category &&
          item._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 4));
    }
  }, [product, products]);

  if (!product) {
    return <p className="mt-10 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="mt-12">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        <Link to="/">Home</Link> /{" "}
        <Link to="/products">Products</Link> /{" "}
        <span className="text-indigo-500">{product.name}</span>
      </p>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-12 mt-6">

        {/* Left - Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border rounded-lg overflow-hidden cursor-pointer w-20"
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>

          <div className="border rounded-lg overflow-hidden w-80">
            <img
              src={thumbnail}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right - Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          <div className="mt-4">
            <p className="text-gray-400 line-through">
              {currency}{product.price}
            </p>
            <p className="text-2xl font-bold text-indigo-600">
              {currency}{product.offerPrice}
            </p>
            <span className="text-gray-500 text-sm">
              Inclusive of all taxes
            </span>
          </div>

          <div className="mt-6">
            <p className="font-medium">About Product</p>
            <ul className="list-disc ml-5 text-gray-600 mt-2">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 transition rounded-lg"
            >
              Add to Cart
            </button>

           <button
  onClick={() => {
    addToCart(product._id);
    navigate("/cart");
    window.scrollTo(0, 0);
  }}
  className="w-full py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition rounded-lg"
>
  Buy Now
</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;