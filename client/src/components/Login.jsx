import React, { useState } from "react";
import { useAppContext } from "../context/appContext";

const Login = () => {
  const { setShowUserLogin, setUser } = useAppContext();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password || (isSignup && !name)) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      // 👉 Yaha future me API call karna
      // Example dummy login:
      setUser({
        name: isSignup ? name : "Himanshu Verma",
        email: email,
      });

      setShowUserLogin(false);

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative"
      >
        {/* Close */}
        <button
          onClick={() => setShowUserLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          {isSignup
            ? "Sign up to start shopping fresh groceries."
            : "Login to continue your shopping."}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {isSignup && (
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignup}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {!isSignup && (
            <div className="text-right text-sm">
              <span className="text-green-600 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-2.5 rounded-lg font-semibold transition duration-300"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-green-600 font-medium cursor-pointer ml-1 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;