import { useState } from "react";

const api = {
  key: "6b514428bfcc5cece34fcff58644c496",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherUpdate = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPressed = async () => {
    if (!search.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `${api.base}weather?q=${search.trim()}&appid=${api.key}&units=metric`
      );
      const result = await response.json();

      if (response.ok) {
        setWeather(result);
      } else {
        // Handle API errors
        switch (result.cod) {
          case "404":
            setError(`City "${search}" not found. Please check the spelling and try again.`);
            break;
          case "401":
            setError("API key error. Please check your API configuration.");
            break;
          default:
            setError(result.message || "Something went wrong. Please try again.");
        }
      }
    } catch (err) {
      setError("Network error. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPressed();
    }
  };

  const handleClear = () => {
    setSearch("");
    setWeather(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/30">
        <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Weather Update
        </h1>
        
        <div className="space-y-4 mb-8">
          <div className="relative">
            <input
              type="text"
              className="w-full px-6 py-4 rounded-2xl bg-white/30 border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              placeholder="Enter city name (e.g., London, New York, Tokyo)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            {search && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
          
          <button
            className="w-full bg-white/30 hover:bg-white/40 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 backdrop-blur-sm border border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={searchPressed}
            disabled={loading || !search.trim()}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/80 text-white p-4 rounded-2xl mb-6 backdrop-blur-sm border border-red-400/50">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {weather && weather.main ? (
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow">
                {weather.name}
                {weather.sys && weather.sys.country && (
                  <span className="text-lg font-normal">, {weather.sys.country}</span>
                )}
              </h2>
              <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="text-white/90 text-lg capitalize">
                {weather.weather[0].description}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-white/90">
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-sm opacity-80">Feels like</div>
                <div className="text-lg font-semibold">
                  {Math.round(weather.main.feels_like)}°C
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-sm opacity-80">Humidity</div>
                <div className="text-lg font-semibold">
                  {weather.main.humidity}%
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-sm opacity-80">Wind Speed</div>
                <div className="text-lg font-semibold">
                  {weather.wind ? `${weather.wind.speed} m/s` : "N/A"}
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-sm opacity-80">Pressure</div>
                <div className="text-lg font-semibold">
                  {weather.main.pressure ? `${weather.main.pressure} hPa` : "N/A"}
                </div>
              </div>
            </div>
            
            {weather.main.temp_min !== weather.main.temp_max && (
              <div className="mt-4 text-center text-white/80">
                <span className="text-sm">
                  Low: {Math.round(weather.main.temp_min)}°C • 
                  High: {Math.round(weather.main.temp_max)}°C
                </span>
              </div>
            )}
          </div>
        ) : !loading && !error && (
          <div className="text-center text-white/80 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">🌤️</div>
            <p>Search for any city to see current weather conditions</p>
            <p className="text-sm mt-2 opacity-70">
              Try: London, New York, Tokyo, Paris, Sydney...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherUpdate;