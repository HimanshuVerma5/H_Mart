import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { 
  user, 
  setUser, 
  setShowUserLogin, 
  navigate, 
  getCartCount 
} = useAppContext();

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
    setSearch("");
  };
const cartCount = getCartCount();
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">

      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
        <img className="h-10 w-auto" src={assets.logo} alt="logo" />
        <h1 className="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
          MART
        </h1>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 font-medium">

        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>

        {/* 🔍 Search */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full focus-within:ring-2 focus-within:ring-green-400 transition"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-40"
            type="text"
            placeholder="Search groceries..."
          />
          <button type="submit">
            <img className="w-4 cursor-pointer" src={assets.search_icon} alt="search" />
          </button>
        </form>

        {/* Cart */}
      <div 
  onClick={() => navigate("/cart")} 
  className="relative cursor-pointer"
>
  <img src={assets.nav_cart_icon} alt="cart" className="w-6" />

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</div>
      
       {/* Login / Profile */}
{!user ? (
  <button
    onClick={() => setShowUserLogin(true)}
    className="px-6 py-2 bg-green-600 text-white rounded-full"
  >
    Login
  </button>
) : (
  <div
    className="relative"
    onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)}
  >
    <img
      src={assets.profile_icon}
      className="w-9 rounded-full border cursor-pointer"
      alt="profile"
    />

    <ul
      className={`absolute right-0 top-full mt-2 w-44 bg-white shadow-xl rounded-lg py-2 transition-all duration-200 ${
        open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
      }`}
    >
      <li
        onClick={() => {
          navigate("/my-orders");
          setOpen(false);
        }}
        className="px-4 py-2 hover:bg-green-100 cursor-pointer"
      >
        My Orders
      </li>

      <li
        onClick={() => {
          logout();
          setOpen(false);
        }}
        className="px-4 py-2 hover:bg-red-100 cursor-pointer"
      >
        Logout
      </li>
    </ul>
  </div>
)}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} className="sm:hidden">
        <img src={assets.menu_icon} className="w-6" alt="menu" />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-lg py-6 flex flex-col gap-4 px-6 sm:hidden">

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex items-center border px-3 py-2 rounded-full">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm"
              placeholder="Search groceries..."
            />
            <button type="submit">
              <img src={assets.search_icon} className="w-4" alt="search" />
            </button>
          </form>

          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;