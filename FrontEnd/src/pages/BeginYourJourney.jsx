import "../App.css";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

function BeginYourJourney() {
  const [trekPlaces, setTrekPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const navigate = useNavigate();

  const fetchLocationName = async (lat, lng) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await res.json();
    return data.address.city || data.address.town || data.address.village || data.address.county;
  };

  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const locationName = await fetchLocationName(position.coords.latitude, position.coords.longitude);
        setSearchQuery(locationName);
      }, () => alert("Unable to retrieve your location."));
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const generateTrekkingPlaces = async (location) => {
    if (!apiKey) return alert("API key not configured.");
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `
      Generate a JSON array of 5-8 trekking places near ${location}. Each place should have:
      {
        "name": "Place Name",
        "difficulty": "easy|moderate|hard",
        "color": "green|orange|red",
        "altitude": "elevation range in meters",
        "district": "nearest district",
        "image" :"image url of ${location} using google places photoUri"
        "duration" :"duration of trek on foot",
        "scenes": ["scene1(place)", "scene2", "scene3","scene4"],
        "thingsToKnowBeforeVisiting": "detailed advice and precautions",
        "estimatedBudget": budget with currency,
        "currency": "local currency",
        "availabilityOfRoadTransport": "yes|no",
        "needOfGuide": "yes|no",
        "coordinates": { "lat": latitude, "lng": longitude }
      }`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let cleanedText = (await response.text()).replace(/```json|```/g, "").trim();
      const places = JSON.parse(cleanedText);
      if (Array.isArray(places)) setTrekPlaces(places);
    } catch {
      setTrekPlaces([{
        name: "Sample Trek Near " + location,
        difficulty: "easy",
        color: "green",
        district: "Morang",
        duration: "6 hrs",
        image: "www.facebook.com/image/1",
        altitude: "500 - 800m",
        scenes: ["Mountain views", "Local wildlife", "Forest trails"],
        thingsToKnowBeforeVisiting: "Carry water and snacks.",
        currency: "NPR/USD",
        estimatedBudget: "100-200",
        availabilityOfRoadTransport: "yes",
        needOfGuide: "no",
        coordinates: { lat: 0, lng: 0 }
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) await generateTrekkingPlaces(searchQuery);
  };

  const colorMap = { green: "bg-green-400", orange: "bg-amber-400", red: "bg-rose-400" };



const renderTrekPlaces = () => {
  const navigate = useNavigate();

  return trekPlaces.map((place, index) => (
    <div
      key={index}
      id="eachTrekPlace"
      className="flex flex-col justify-between items-stretch rounded-xl border border-gray-300 bg-white  min-w-[220px] max-w-xs w-full max-h-120 overflow-scroll gap-3 cursor-pointer"
      onClick={() =>
        navigate("/trekhome", {
          state: {
            name: place.name,
            district: place.district,
            duration: place.duration,
            altitude: place.altitude,
            estimatedBudget: place.estimatedBudget,
            coordinates:place.coordinates,
            difficulty:place.difficulty,
            currency:place.currency,
            image:place.image,
            transport:place.availabilityOfRoadTransport,
            guide:place.needOfGuide,
            advice:place.thingsToKnowBeforeVisiting,
            scenes:place.scenes,


          },
        })
      }
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`w-3 h-3 rounded-full ${colorMap[place.color] || "bg-gray-400"}`}
        ></span>
        <span className="text-xs text-gray-600 capitalize">{place.difficulty}</span>
      </div>
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-lg border border-gray-100 mb-1">
       <img srcSet={place.image} alt="" srcset="" />
      </div>
      <div className="font-semibold text-xl text-gray-900 text-center mb-1 ">
        {place.name}
      </div>
      <div className="flex flex-col gap-0.5 text-xs text-gray-500 mb-1">
        <span><span className="text-gray-700">Altitude:</span> {place.altitude}</span>
        <span><span className="text-gray-700">Guide:</span> {place.needOfGuide}</span>
        <span><span className="text-gray-700">Transport:</span> {place.availabilityOfRoadTransport}</span>
      </div>
      <div className="text-xs text-gray-600 mb-1">
        <span className="text-indigo-500">Scenes:</span> {place.scenes?.join(", ") || "N/A"}
      </div>
    </div>
  ));
};


  return (
    <div className="min-h-screen bg-neutral-50 p-4 flex flex-col items-center gap-8">
      <form className="w-full max-w-3xl flex flex-col gap-4 p-6 rounded-3xl bg-white shadow-md" onSubmit={handleSearch}>
        <h2 className="text-2xl font-semibold text-center text-neutral-900">Trekking Place Booking</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search treks by place"
            className="flex-1 h-12 px-4 border border-neutral-300 rounded-xl text-neutral-900 text-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={handleLocationClick}
            title="Use current location"
            className="h-12 w-12 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-neutral-800 transition flex items-center justify-center cursor-pointer"
          >
            📍
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          title="Search trekking places"
          className={`h-12 w-full rounded-xl text-neutral-50 font-semibold text-lg ${isLoading ? "bg-neutral-400" : "bg-neutral-800 hover:bg-neutral-900"} transition cursor-pointer`}
        >
          {isLoading ? "⏳ Searching..." : "Search"}
        </button>
      </form>
      {isLoading && <div className="text-center text-neutral-600">Generating trekking places...</div>}
      <div className="flex flex-wrap gap-6 justify-center w-full max-w-7xl">{renderTrekPlaces()}</div>
    </div>
  );
}

export default BeginYourJourney;
