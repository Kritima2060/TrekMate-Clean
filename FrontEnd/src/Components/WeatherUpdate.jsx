import "../App.css";

import { useState } from "react";

const api = {
  key: "6b514428bfcc5cece34fcff58644c496",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherUpdate = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="WeatherUpdate">
      <header className="WeatherUpdate_header">
        <h1>Weather Update</h1>
        <div className="SearchCity">
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {weather && weather.main ? (
          <div style={{ marginTop: "20px" }}>
            <p>
              {weather.name}, {weather.sys.country}
            </p>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>
              {weather.weather[0].main} ({weather.weather[0].description})
            </p>
            
          </div>
        ) : (
          <p style={{ marginTop: "20px" }}>Search a city to see weather...</p>
        )}
      </header>
    </div>
  );
};

export default WeatherUpdate;
