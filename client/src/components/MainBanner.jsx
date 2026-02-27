import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative w-full">

      {/* Desktop Image */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block object-cover"
      />

      {/* Mobile Image */}
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full block md:hidden object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16">

        <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight max-w-xl">
          Freshness You Can Trust,  
          <br className="hidden md:block" />
          Savings You’ll Love!
        </h1>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 mt-6">
          <Link
            to="/products"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 
            text-white px-6 py-3 rounded-full font-semibold 
            shadow-lg hover:scale-105 transition-all duration-300"
          >
            Shop Now
            <img src={assets.white_arrow_icon} alt="" className="w-4" />
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-2 bg-white text-gray-800 
            px-6 py-3 rounded-full font-semibold 
            shadow-lg hover:bg-gray-100 
            transition-all duration-300"
          >
            Explore Deals
            <img src={assets.black_arrow_icon} alt="" className="w-4" />
          </Link>
        </div>

        {/* Mobile Single Button */}
        <div className="md:hidden mt-6">
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 
            bg-green-500 text-white 
            px-8 py-3 rounded-full font-semibold 
            shadow-lg active:scale-95 transition-all duration-200"
          >
            Shop Now
            <img src={assets.white_arrow_icon} alt="" className="w-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default MainBanner