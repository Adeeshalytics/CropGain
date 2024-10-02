"use client"; // Add this line to specify it's a client-side component

import React, { useState } from "react";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup successful!");
      // Redirect to login or other pages
    } else {
      alert(data.msg || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/login-signup background.webp')", // Path to your background image
      }}
    >
      {/* Container for Form and Image */}
      <div className="relative w-full max-w-4xl p-0 bg-white shadow-lg rounded-lg">
        {/* Right side - Image */}
        <img
          src="/assets/green-tea.jpg"
          alt="Plant background"
          className="absolute inset-0 object-cover w-full h-full rounded-lg"
          style={{ zIndex: -1 }} // Ensure the image is behind other elements
        />

        {/* Signup Form */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white bg-opacity-90 shadow-lg w-full max-w-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              Get Started Now
            </h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="mr-2 leading-tight"
                />
                <label className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-green-600">
                    terms & policy
                  </a>
                </label>
              </div>
              <button className="w-full px-4 py-2 text-white bg-green-800 rounded-md hover:bg-green-700 focus:outline-none">
                Signup
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center space-x-4">
              <span className="text-gray-600">Or</span>
              <button className="flex items-center justify-center p-2 border border-gray-300 rounded-md">
                <img
                  src="/assets/google.png"
                  alt="Google"
                  className="h-5 w-5"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Sign in with Google
                </span>
              </button>
              <button className="flex items-center justify-center p-2 border border-gray-300 rounded-md">
                <img
                  src="/assets/Microsoft.png"
                  alt="Microsoft"
                  className="h-5 w-5"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Sign in with Microsoft
                </span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <span className="text-gray-600">
                Have an account?{" "}
                <a href="/login" className="text-green-600">
                  Sign In
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
