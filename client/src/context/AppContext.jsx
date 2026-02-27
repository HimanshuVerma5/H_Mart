import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts, dummyAddress } from "../assets/assets"; // ✅ FIXED IMPORT
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [addresses, setAddresses] = useState(dummyAddress); // ✅ Now works

  // 🔹 Fetch Products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // 🔹 Add To Cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      };

      toast.success("Added to Cart");
      return updatedCart;
    });
  };

  // 🔹 Update Cart Quantity
  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const cartData = { ...prev };

      if (quantity <= 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId] = quantity;
      }

      return cartData;
    });
  };

  // 🔹 Remove From Cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const cartData = { ...prev };
      delete cartData[itemId];
      return cartData;
    });

    toast.success("Removed from Cart");
  };

  // 🔹 Clear Cart
  const clearCart = () => {
    setCartItems({});
  };

  // 🔹 Get Total Cart Items Count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, item) => total + item, 0);
  };

  // 🔹 Get Total Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);

      if (product) {
        totalAmount += product.offerPrice * cartItems[itemId]; // ✅ better than price
      }
    }

    return totalAmount;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartAmount,
    addresses,
    setAddresses,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};