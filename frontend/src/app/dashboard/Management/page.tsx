import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";

const PathSelection = () => {
  const options = [
    {
      title: "COOP Tea State",
      image: "/assets/co-state.jpg",
      color: "bg-blue-500",
      path: "/dashboard/Management/coop",
    },
    {
      title: "State - Kotapola",
      image: "/assets/state.jpg",
      color: "bg-purple-500",
      path: "/state-kotapola",
    },
    {
      title: "Tourist Bangalore",
      image: "/assets/hotel.jpeg",
      color: "bg-green-500",
      path: "/tourist-bangalore",
    },
    {
      title: "Nursery",
      image: "/assets/nursary.jpeg",
      color: "bg-orange-500",
      path: "/nursery",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">
            Choose an option below to continue
          </h1>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option) => (
            <Link href={option.path} key={option.title} passHref>
              <div className="relative rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:scale-105">
                {/* Image Container */}
                <div className="aspect-[4/3] relative ">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300" />
                </div>

                {/* Title and Button Container */}
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {option.title}
                  </h3>
                  <button
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 
                  transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Select
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PathSelection;
