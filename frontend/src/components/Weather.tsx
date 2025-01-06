"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<{ temp: number; description: string; icon: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '37e17a209a784c9eb66113734242810'; 
  const CITY = 'Kotapola'; 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`
        );
        const { current } = response.data;
        
        
        setWeather({
          temp: Math.round(current.temp_c),
          description: current.condition.text,
          icon: `https:${current.condition.icon}`, // Prepend 'https:' to the icon URL
        });
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;

  return (
    <div className="flex items-center ">
      {weather?.icon && (
        <img
          src={weather.icon} 
          alt="Weather Icon"
          style={{ width:'60px' ,height:'60px', marginRight: '10px' }}
        />
      )}
      <span>
        {weather?.temp}°C | {weather?.description.charAt(0).toUpperCase() + weather?.description.slice(1)}
      </span>
    </div>
  );
};

export default Weather;
