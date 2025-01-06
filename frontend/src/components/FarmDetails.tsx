"use client";

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const farmData = [
  {
    img: '/assets/co-state.jpg',
    name: 'COOP tea state',
    cropHealth: 'Good',
    sowingDate: 'Feb 21, 2024',
    harvestDate: 'Apr 25, 2024',
  },
  {
    img: '/assets/state.jpg',
    name: 'State - Kotapola',
    cropHealth: 'Average',
    sowingDate: 'Mar 15, 2024',
    harvestDate: 'Jun 10, 2024',
  },
  {
    img: '/assets/hotel.jpeg',
    name: 'Tourist Bangalore',
    status: 'Available',
    availability: 'Full',
    availabledate:'May 12, 2024'
    
  },
  {
    img: '/assets/nursary.jpeg',
    name: 'Nursery',
    plantHealth: 'Excellent',
    fertilizerDay: 'May 12, 2024',
    harvestDay: 'Aug 30, 2024',
  },
];

const FarmDetails: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? farmData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === farmData.length - 1 ? 0 : prevIndex + 1));
  };

  const currentFarm = farmData[currentIndex];

  return (
    <div className="relative w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <img
        src={currentFarm.img}
        alt="Farm"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-3xl"
      >
       <FontAwesomeIcon icon={faChevronLeft} className='text-2xl' />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-3xl"
      >
        <FontAwesomeIcon icon={faChevronRight} className='text-2xl'  /> 
      </button>

      {/* Overlay Box with Name, Status, and Details */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-4 shadow-md font-roboto font-medium text-xl"
       style={{ width: "742px", height: "150px" }}>
        <h4 className="font-semibold text-xl mb-2">{currentFarm.name}</h4>
        
        <div className="flex justify-between text-sm">
          {currentFarm.cropHealth && (
            <>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/3 mr-2">
                <p className="font-semibold mb-2">Crop Health</p>
                <p className="text-green-600">{currentFarm.cropHealth}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/3 mr-2">
                <p className="font-semibold mb-2">Next Fertilizing Date</p>
                <p>{currentFarm.sowingDate}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/3">
                <p className="font-semibold mb-2"> Next Harvest Date</p>
                <p>{currentFarm.harvestDate}</p>
              </div>
            </>
          )}

          {currentFarm.status && (
            <>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/3 mr-2">
                <p className="font-semibold mb-2">Status</p>
                <p className="text-blue-600">{currentFarm.status}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/4">
                <p className="font-semibold mb-2">Availability</p>
                <p className='text-red-600'>{currentFarm.availability}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/3">
                <p className="font-semibold mb-2">Available Date</p>
                <p>{currentFarm.availabledate}</p>
              </div>
            </>
          )}

          {currentFarm.plantHealth && (
            <>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/3 mr-2">
                <p className="font-semibold mb-2">Plant Health</p>
                <p className="text-green-600">{currentFarm.plantHealth}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/3 mr-2">
                <p className="font-semibold mb-2">Next Fertilizer Day</p>
                <p>{currentFarm.fertilizerDay}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md text-center w-1/3">
                <p className="font-semibold mb-2">Next Harvest Day</p>
                <p>{currentFarm.harvestDay}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmDetails;
