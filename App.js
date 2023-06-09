import React, { useState } from "react";
import axios from 'axios';
import { Audio } from 'react-loader-spinner'
import "./App.css";

const API_KEY = "24da1441bed1fc9afe4269790801b66e";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const fetchWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        const { name, main, weather, wind, sys, rain, snow, dt } = response.data;

        const weatherInfo = {
          city: name,
          temperature: main.temp,
          weather: weather[0].main,
          icon: weather[0].icon,
          humidity: main.humidity,
          windSpeed: wind.speed,
          localTime: new Date(dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          rain: rain ? rain["1h"] || 0 : 0,
          snow: snow ? snow["1h"] || 0 : 0,
        };

        setWeatherData((prevData) => [...prevData, weatherInfo]);
        setCity("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter a city"
        />
        <button type="submit">Search</button>
      </form>
      <div className="weather-cards">
        {weatherData.map((weatherInfo) => (
          <div className="weather-card" key={weatherInfo.city}>
            <h2>{weatherInfo.city}</h2>
            <div className="weather-info">
              <img
                src={`http://openweathermap.org/img/w/${weatherInfo.icon}.png`}
                alt="Weather Icon"
              />
              <p>{weatherInfo.weather}</p>
              <p>{weatherInfo.temperature}°C</p>
            </div>
            <div className="additional-info">
              <p>Humidity: {weatherInfo.humidity}%</p>
              <p>Wind Speed: {weatherInfo.windSpeed} m/s</p>
              <p>Local Time: {weatherInfo.localTime}</p>
              <p>Rain: {weatherInfo.rain} mm</p>
              <p>Snow: {weatherInfo.snow} mm</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
