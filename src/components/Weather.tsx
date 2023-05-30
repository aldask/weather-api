import React, { useState, useEffect } from "react";
import { API_KEY } from "./config";

function Weather() {
  // State variables
  const [city, setCity] = useState("Kaunas");
  const [result, setResult] = useState({
    city: "",
    currentTemp: "",
    img: "",
    description: "",
    humidity: "",
    speed: "",
  });

  // Fetch weather data on city change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (!response.ok) {
          alert("No weather found");
          throw new Error("No weather data found");
        }

        displayWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [city]);

  // Update weather data and background
  const displayWeather = (data: any) => {
    const { name, weather, main, wind } = data;
    const { description, icon } = weather[0];
    const { temp, humidity } = main;
    const { speed } = wind;

    setResult({
      city: name,
      currentTemp: temp,
      img: `https://openweathermap.org/img/wn/${icon}.png`,
      description,
      humidity,
      speed,
    });

    document.body.style.background = `url(https://source.unsplash.com/1600x900/?${name}) no-repeat center/cover`;
  };

  // Handle city search
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput = event.currentTarget.elements.namedItem(
      "searchInput"
    ) as HTMLInputElement;
    setCity(searchInput.value);
  };

  return (
    <section className="weather">
      <div className="weather__box">
        <form className="weather__search" onSubmit={handleSearch}>
          <input
            type="text"
            name="searchInput"
            placeholder="Enter a City to check current weather"
            className="weather__search-input"
          />
          <button type="submit" className="weather__search-button">
            Search
          </button>
        </form>
        <div className="weather__box-data">
          <h2 className="weather__city">{result.city}</h2>
          <p className="weather__temp">{result.currentTemp}°C</p>
          <div className="weather__description">
            <img
              src={result.img}
              alt="weather now"
              className="weather__description-img"
            />
            <p className="weather__description-title">{result.description}</p>
          </div>
          <p className="weather__humidity">
            <span className="strong">Humidity: </span>
            {result.humidity}%
          </p>
          <p className="weather__speed">
            <span className="strong">Speed: </span>
            {result.speed} km/h
          </p>
        </div>
      </div>
    </section>
  );
}

export default Weather;
