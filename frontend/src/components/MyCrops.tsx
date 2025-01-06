import React from 'react';

interface Crop {
  name: string;
  status: string;
  progress: number;
  imageUrl: string;
}

const MyCrops = () => {
  const crops: Crop[] = [
    {
      name: 'Tea',
      status: 'harvesting',
      progress: 90,
      imageUrl: '/assets/tea-pr.jpg'
    },
    {
      name: 'Coconut',
      status: 'flowering',
      progress: 85,
      imageUrl: '/assets/coconut.jpg'
    },
    {
      name: 'Cinnamon',
      status: 'drying',
      progress: 23,
      imageUrl: '/assets/cinnamon.avif'
    },
    {
      name: 'Pepper',
      status: 'mature',
      progress: 75,
      imageUrl: '/assets/pepper.jpg'
    },
   
  ];

  const getProgressBarColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'harvesting':
        return 'bg-emerald-600';   
      case 'flowering':
        return 'bg-yellow-400';    
      case 'growing':
        return 'bg-green-500';     
      case 'sprouting':
        return 'bg-lime-400';      
      case 'drying':
        return 'bg-orange-500';    
      case 'mature':
        return 'bg-red-600';      
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-lg p-6 bg-white ml-4" style={{width:'560px'}}>
       <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">My Crops</h1>
      </div>


      <div className="space-y-5">
        {crops.map((crop) => (
          <div key={crop.name} className="relative">
            <div className="flex items-start gap-4">
              {/* Crop Image */}
              <img
                src={crop.imageUrl}
                alt={crop.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              
              {/* Crop Details */}
              <div className="flex-1 ">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium min-w-[60px]">{crop.name}</span>
                  
                  {/* Progress Bar */}
                  <div className="flex-1 relative h-2 bg-gray-100 rounded-full ml-3">
                    <div
                      className={`absolute left-0 top-0 h-full rounded-full ${getProgressBarColor(crop.status)}`}
                      style={{ width: `${crop.progress}%` }}
                    />
                  </div>
                  
                  {/* Progress Percentage */}
                  <span className="text-sm font-medium min-w-[40px] text-right font-roboto">
                    {crop.progress}%
                  </span>
                </div>
                
                {/* Status Text */}
                <div className="text-sm text-gray-500 ml-[calc(75px+0.75rem)]">
                  {crop.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCrops;