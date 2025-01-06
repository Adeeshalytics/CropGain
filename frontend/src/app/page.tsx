import Aboutus from "@/components/Aboutus";
import About from "../components/About";
import Goal from "../components/Goal";
import "./globals.css";
import Footer from "@/components/Footer";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-between items-center text-white"
      style={{
        minHeight: "100vh",
        background: `linear-gradient(to bottom right, rgba(28, 53, 45, 0.98) 0%, rgba(28, 53, 45, 1) 100%)`,
      }}
    >
      <div className="absolute top-4 left-4 text-5xl font-semi-bold text-white pr-20 ml-24 mt-3">
        CropGain
      </div>

      <nav className="absolute top-0 left-0 right-0 p-4 flex justify-end space-x-32 mr-28 mt-4">
        <a href="#" className="text-2xl hover:underline">
          Home
        </a>
        <a href="/dashboard" className="text-2xl hover:underline">
          About us
        </a>
        <Link href="/login" className="text-2xl hover:underline">
          Login
        </Link>
        <a href="/signup" className="text-2xl hover:underline">
          Signup
        </a>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-center w-full mt-14">
        <div className="text-left ml-8 font-fanwood mt-9">
          <h1 className="text-8xl mb-4 px-20 mt-14 ">
            Make your <br />
            farm profitable!
          </h1>
          <p className="text-xl mb-8 px-20 mt-8">
            Our deep respect for the land and its harvest is the legacy of
            <br />
            generations of farmers who put food on our tables, preserved
            <br /> our landscape, and inspired us with a powerful work ethic.
          </p>
          <div className="flex justify-start">
            <button className="px-12 py-3 bg-green-700 rounded-full hover:bg-green-800 text-2xl ml-20">
              Learn More
            </button>
          </div>
        </div>

        <div className="mr-36 mt-4">
          <img
            src="/assets/leave.png"
            alt="leave"
            className="w-[435px] h-auto object-cover"
          />
        </div>
      </div>

      <div className="w-full mt-12">
        <About />
      </div>

      <div className="w-full">
        <Goal />
      </div>

      <div className="w-full">
        <Aboutus />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
