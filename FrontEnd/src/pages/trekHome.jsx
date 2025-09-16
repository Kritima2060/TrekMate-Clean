import React, { useState, useEffect } from "react";
  const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;
const api = {
  key: apiKey,
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function TrekHome() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showHotels, setShowHotels] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [trekData, setTrekData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    const currentState = history.state?.usr;
    if (currentState) {
      setTrekData(currentState);
    }
  }, []);

  const fetchWeather = async () => {
    if (!trekData?.district) {
      setWeatherError("Location information not available");
      return;
    }

    setWeatherLoading(true);
    setWeatherError("");
    setWeather(null);

    const searchOptions = [
      trekData.district,
      trekData.district.split('/')[0].trim(),
      trekData.district.split('/')[1]?.trim(),
      trekData.district.split(' ')[0],
      `${trekData.district}, Nepal`,
      `${trekData.district.split('/')[0].trim()}, Nepal`,
      `${trekData.district.split(' ')[0]}, Nepal`
    ].filter(Boolean);

    for (const location of searchOptions) {
      try {
        const response = await fetch(
          `${api.base}weather?q=${location}&appid=${api.key}&units=metric`
        );
        const result = await response.json();

        if (response.ok) {
          setWeather(result);
          setWeatherLoading(false);
          return;
        }
      } catch (err) {
        continue;
      }
    }

    setWeatherError("Weather data not available for this region");
    setWeatherLoading(false);
  };

  const handleWeatherToggle = () => {
    const newShowWeather = !showWeather;
    setShowWeather(newShowWeather);
    
    if (newShowWeather && !weather && !weatherLoading) {
      fetchWeather();
    }
  };

  const nextPhoto = () =>
    setGalleryIndex((i) => (i + 1) % (gallery?.length || 1));
  const prevPhoto = () =>
    setGalleryIndex((i) => (i === 0 ? (gallery?.length || 1) - 1 : i - 1));

  const gallery = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
  ];

  const hotels = [
    { name: "Hotel Everest View", location: "Syangboche", price: "$200" },
    { name: "Namche Hotel", location: "Namche Bazaar", price: "$50" },
    { name: "Yeti Mountain Home", location: "Lukla", price: "$80" },
  ];

  if (!trekData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-1 h-12 bg-neutral-900 animate-pulse"></div>
          <p className="text-xs text-neutral-400 tracking-[0.2em] uppercase">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-32 bg-white">
      <section className="px-8 pb-16  text-center">
        <h1 className="text-4xl md:text-6xl font-extralight text-neutral-900 mb-6 tracking-tight leading-none">
          {trekData?.name}
        </h1>
        <p className="text-neutral-400 font-light tracking-wide text-sm uppercase">
          {trekData?.district}
        </p>
      </section>

      <section className="px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="relative group mb-12">
            <div className="aspect-[16/9] overflow-hidden bg-neutral-100">
              <img
                src={gallery[galleryIndex]}
                alt="Trek"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="hover:cursor-pointer absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="hover:cursor-pointer absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </div>
          
          {gallery.length > 1 && (
            <div className="flex justify-center gap-3">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryIndex(idx)}
                  className={`h-2 hover:cursor-pointer transition-all duration-300 ${
                    idx === galleryIndex 
                      ? "bg-neutral-900 w-12" 
                      : "bg-neutral-300 w-6 hover:bg-neutral-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-8 mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Duration", value: trekData?.duration },
              { label: "Difficulty", value: trekData?.difficulty },
              { label: "Altitude", value: trekData?.altitude },
              { label: "Guide", value: trekData?.guide },
              { label: "Transport", value: trekData?.transport },
              { label: "Budget", value: trekData?.estimatedBudget },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <p className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-4">
                  {stat.label}
                </p>
                <p className="text-xl font-light text-neutral-900 capitalize">
                  {stat.value}
                </p>
                <div className="w-8 h-px bg-neutral-900 mx-auto mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 mb-32">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-24">
          
          <div>
            <h2 className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-12">
              Things to Know
            </h2>
            <div className="space-y-12">
              <div>
                <p className="text-sm text-neutral-600 mb-2">Currency</p>
                <p className="text-lg font-light text-neutral-900">
                  {trekData?.currency || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-3">Distance</p>
                <p className="text-lg font-light text-neutral-900">
                  {trekData?.distance
                    ? `${trekData?.distance.toFixed(1)} km`
                    : "Not available"}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-3">Advice</p>
                <p className="text-neutral-700 leading-relaxed font-light">
                  {trekData?.advice || "No specific advice available"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-12">
              Places to View
            </h2>
            
            <div className="mb-16">
              {trekData?.scenes?.map((place, idx) => (
                <div key={idx} className="py-3 border-b border-neutral-100 last:border-0">
                  <p className="text-neutral-700 font-light">{place}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <button
                className="w-full h-14 hover:cursor-pointer bg-neutral-900 text-white text-sm uppercase tracking-[0.1em] hover:bg-neutral-800 transition-colors duration-300"
                onClick={() => setShowHotels((v) => !v)}
              >
                {showHotels ? "Hide Hotels" : "Find Hotels"}
              </button>

              <button
                className="w-full h-14 hover:cursor-pointer border border-neutral-900 text-neutral-900 text-sm uppercase tracking-[0.1em] hover:bg-neutral-50 transition-colors duration-300"
                onClick={handleWeatherToggle}
              >
                {showWeather ? "Hide Weather" : "Check Weather"}
              </button>
            </div>

            {showHotels && (
              <div className="space-y-1 animate-in fade-in duration-500 mt-8">
                {hotels.map((hotel, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-4 border-b border-neutral-100 last:border-0 group hover:bg-neutral-50 px-4 -mx-4 transition-colors duration-200"
                  >
                    <div>
                      <h4 className="text-neutral-900 font-light mb-1">
                        {hotel.name}
                      </h4>
                      <p className="text-sm text-neutral-500">{hotel.location}</p>
                    </div>
                    <p className="text-neutral-900 font-light">{hotel.price}</p>
                  </div>
                ))}
              </div>
            )}

            {showWeather && (
              <div className="mt-8 animate-in fade-in duration-500">
                {weatherLoading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-1 h-8 bg-neutral-900 animate-pulse"></div>
                  </div>
                )}

                {weatherError && (
                  <div className="border border-neutral-200 bg-neutral-50 px-6 py-8 text-center">
                    <p className="text-sm text-neutral-600 font-light">
                      {weatherError}
                    </p>
                  </div>
                )}

                {weather && weather.main && (
                  <div className="border border-neutral-200 bg-neutral-50 px-6 py-8">
                    <div className="text-center mb-8">
                      <h3 className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-4">
                        Current Weather
                      </h3>
                      <div className="text-3xl font-extralight text-neutral-900 mb-2">
                        {Math.round(weather.main.temp)}°C
                      </div>
                      <p className="text-sm text-neutral-600 capitalize font-light">
                        {weather.weather[0].description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] mb-2">
                          Feels like
                        </p>
                        <p className="text-lg font-light text-neutral-900">
                          {Math.round(weather.main.feels_like)}°C
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] mb-2">
                          Humidity
                        </p>
                        <p className="text-lg font-light text-neutral-900">
                          {weather.main.humidity}%
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] mb-2">
                          Wind
                        </p>
                        <p className="text-lg font-light text-neutral-900">
                          {weather.wind ? `${weather.wind.speed} m/s` : "N/A"}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] mb-2">
                          Pressure
                        </p>
                        <p className="text-lg font-light text-neutral-900">
                          {weather.main.pressure} hPa
                        </p>
                      </div>
                    </div>

                    {weather.main.temp_min !== weather.main.temp_max && (
                      <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                        <p className="text-sm text-neutral-600 font-light">
                          Low {Math.round(weather.main.temp_min)}°C • High {Math.round(weather.main.temp_max)}°C
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}