import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { assets } from "../assets/assets";

const Cart = () => {
  const {
    products,
    cartItems,
    currency,
    updateCartItem,
    removeFromCart,
    getCartAmount,
    navigate,
    clearCart,
    addresses = [],
  } = useAppContext();

  const [showCheckout, setShowCheckout] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const cartProducts = products.filter(
    (product) => cartItems[product._id]
  );

  const subtotal = getCartAmount();
  const tax = subtotal * 0.02;
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal + tax + delivery - discount;

  const handleApplyPromo = () => {
    if (promoCode === "SAVE10") {
      setDiscount(subtotal * 0.1);
      alert("Promo Applied 🎉 10% Discount");
    } else {
      alert("Invalid Promo Code ❌");
    }
  };

  const handlePlaceOrder = () => {
    if (!addresses.length) {
      alert("Please add an address first!");
      return;
    }

    alert(
      `Order Placed 🎉
Payment: ${paymentMethod}
Delivering to: ${addresses[selectedAddressIndex].street}, ${addresses[selectedAddressIndex].city}`
    );

    clearCart();
    navigate("/");
  };

  if (cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <img src={assets.cart_icon} className="w-24 opacity-70 mb-6" alt="" />
        <h2 className="text-3xl font-semibold mb-3">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:scale-105 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

        {cartProducts.map((product) => {
          const quantity = cartItems[product._id];

          return (
            <div
              key={product._id}
              className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center mb-6"
            >
              <div className="flex gap-6 items-center">
                <img
                  src={product.image[0]}
                  className="w-24 h-24 object-cover rounded-lg"
                  alt=""
                />

                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-indigo-600 font-bold">
                    {currency}{product.offerPrice}
                  </p>

                  <div className="flex gap-3 mt-3 items-center">
                    <button
                      onClick={() =>
                        updateCartItem(product._id, quantity - 1)
                      }
                      className="px-3 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{quantity}</span>

                    <button
                      onClick={() =>
                        updateCartItem(product._id, quantity + 1)
                      }
                      className="px-3 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(product._id)}
                className="text-red-500 font-medium"
              >
                Remove
              </button>
            </div>
          );
        })}

        <button
          onClick={() => setShowCheckout(true)}
          className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-xl hover:scale-105 transition"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Checkout Panel */}
      {showCheckout && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowCheckout(false)}
          ></div>

          <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6">Checkout</h2>

              {/* ADDRESS SECTION */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3">📍 Delivery Address</h3>

                {addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((address, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedAddressIndex(index)}
                        className={`p-4 rounded-xl cursor-pointer border ${
                          selectedAddressIndex === index
                            ? "border-indigo-600 bg-indigo-50"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <p className="font-medium">{address.street}</p>
                        <p className="text-sm text-gray-600">{address.city}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-3">
                    No address found.
                  </p>
                )}

                {/* ADD NEW ADDRESS BUTTON */}
                <button
                  onClick={() => navigate("/add-address")}
                  className="w-full mt-4 py-3 border-2 border-dashed border-indigo-500 text-indigo-600 rounded-xl hover:bg-indigo-50 transition"
                >
                  + Add New Address
                </button>
              </div>

              {/* PAYMENT METHOD */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3">💳 Payment Method</h3>
                <div className="space-y-2">
                  {["COD", "Online", "UPI"].map((method) => (
                    <div
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 rounded-lg cursor-pointer border ${
                        paymentMethod === method
                          ? "border-indigo-600 bg-indigo-50"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>

              {/* PROMO CODE */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3">🎁 Promo Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 bg-indigo-600 text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="border-t pt-6 space-y-2 text-gray-700 mb-28">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currency}{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (2%)</span>
                  <span>{currency}{tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{currency}{delivery.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{currency}{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>{currency}{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t bg-white">
              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition font-semibold text-lg"
              >
                🚀 Place Order • {currency}{total.toFixed(2)}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;