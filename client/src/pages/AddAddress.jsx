import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { assets } from "../assets/assets";

const AddAddress = () => {
  const { navigate, addresses, setAddresses } = useAppContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const values = Object.values(formData);
    if (values.some((val) => val === "")) {
      alert("Please fill all fields");
      return;
    }

    const newAddress = {
      ...formData,
      _id: Date.now().toString(),
    };

    setAddresses([...addresses, newAddress]);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-6 py-12">
      
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-emerald-50 p-10">
          <img
            src={assets.add_address_iamge}
            alt="Add Address"
            className="w-96 drop-shadow-xl hover:scale-105 transition duration-500"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 mb-6"
          >
            ← Back to Cart
          </button>

          <h2 className="text-3xl font-bold mb-2">
            Add New Address
          </h2>
          <p className="text-gray-500 mb-8">
            Fill in your delivery details below
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          </div>

          <div className="mt-4">
            <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="mt-4">
            <Input name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input name="zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={handleChange} />
            <Input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-8 py-4 rounded-xl font-semibold text-lg
            bg-emerald-600 text-white
            hover:bg-emerald-700
            hover:scale-[1.02]
            transition duration-300 shadow-lg"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ name, placeholder, value, onChange }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-3 rounded-xl border border-gray-300 
    focus:outline-none focus:ring-2 focus:ring-emerald-500 
    transition duration-200"
  />
);

export default AddAddress;