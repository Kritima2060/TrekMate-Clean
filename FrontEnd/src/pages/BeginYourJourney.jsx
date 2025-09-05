import "../App.css";
import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function BeginYourJourney() {
  const [trekPlaces, setTrekPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);


  const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
  
  // api availibility 
  if (!apiKey) {
    console.error("REACT_APP_GEMINI_API_KEY is not set in environment variables");
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          alert(
            `Location captured: ${location.lat}, ${location.lng}`
          );
          // Optionally search for places near current location
          // setSearchQuery(`${location.lat},${location.lng}`);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const generateTrekkingPlaces = async (location) => {
    if (!apiKey) {
      alert("API key not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file");
      return;
    }

    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
      Generate a JSON array of 5-8 trekking places near ${location}. Each place should have exactly this structure:
      {
        "name": "Place Name",
        "difficulty": "easy|moderate|hard",
        "color": "green|orange|red",
        "altitude": "elevation range in meters",
        "distanceToPlaceFromSearch" :"distance from ${location} to treking spot",
        "scenes": ["scene1", "scene2", "scene3"],
        "thingsToKnowBeforeVisiting": "detailed advice",
        "currency": "local currency",
        "availabilityOfRoadTransport": "yes|no",
        "needOfGuide": "yes|no",
        "coordinates": { "lat": latitude, "lng": longitude }
      }

      Rules:
      - Use "green" for easy difficulty, "orange" for moderate, "red" for hard
      - Include real trekking places if they exist near the location
      - Provide realistic coordinates near the searched location
      - Give practical advice in thingsToKnowBeforeVisiting
      - Return only valid JSON array, no additional text or markdown formatting
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      //yo cleanedtext vayena vane error auxa most cases ma
      let cleanedText = text.replace(/```json|```/g, '').trim();
      cleanedText = cleanedText.replace(/^```[\s\S]*?\n/, '').replace(/```$/, '');
      
      try {
        const places = JSON.parse(cleanedText);
  
        if (Array.isArray(places) && places.length > 0) {
          setTrekPlaces(places);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.log("Cleaned text:", cleanedText);
        throw new Error("Failed to parse response as JSON");
      }

    } catch (error) {
      console.error("Error generating trekking places:", error);
      
      let errorMessage = "Failed to generate trekking places. ";
      
      if (error.message && error.message.includes("API key not valid")) {
        errorMessage += "Please check your API key.";
      } else if (error.message && error.message.includes("quota")) {
        errorMessage += "API quota exceeded. Please try again later.";
      } else {
        errorMessage += "Please try again.";
      }
      
      alert(errorMessage);
      
      //sample data
      setTrekPlaces([
        {
          name: "Sample Trek Near " + location,
          difficulty: "easy",
          color: "green",
          altitude: "500 - 800m",
          scenes: ["Mountain views", "Local wildlife", "Forest trails"],
          thingsToKnowBeforeVisiting: "Carry water and snacks. Weather can change quickly.",
          currency: "Local Currency",
          availabilityOfRoadTransport: "yes",
          needOfGuide: "no",
          coordinates: { lat: 0, lng: 0 }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const colorMap = {
    green: "bg-green-500",
    orange: "bg-orange-500",
    red: "bg-red-500"
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a location to search for trekking places.");
      return;
    }
    await generateTrekkingPlaces(searchQuery);
  };

  const renderTrekPlaces = () => {
    return trekPlaces.map((place, index) => (
      <div
      key={index}
      className="flex flex-col justify-between items-stretch rounded-xl border border-gray-300 bg-white  min-w-[220px] max-w-xs w-full max-h-120 overflow-scroll gap-3"
      >
      <div className="flex items-center gap-2 mb-1">
        <span
        className={`w-3 h-3 rounded-full ${colorMap[place.color] || 'bg-gray-400'}`}
        ></span>
        <span className="text-xs text-gray-600 capitalize">{place.difficulty}</span>
      </div>
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-lg border border-gray-100 mb-1">
        <span className="text-gray-300 text-2xl">📸</span>
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
      {/* <div className="text-xs text-gray-600 flex-grow mb-2">
        {place.thingsToKnowBeforeVisiting}
      </div> */}
      {/* <button
        type="button"
        className="bg-indigo-600 text-white w-full py-3 rounded-lg text-sm font-medium mt-1"
      >
        Find Hotels Nearby
      </button> */}
    
      </div>
    ))
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 bg-white p-4">
      <form 
        className="rounded-2xl max-w-3xl w-full mx-auto flex flex-col gap-6" 
        onSubmit={handleSearch}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Trekking Place Booking
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search treks by place (e.g., Kathmandu, Nepal)"
            className="flex-1 border h-12 px-4 border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={handleLocationClick}
            className="bg-blue-600 text-white h-12 w-12 hover:cursor-pointer rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            📍
          </button>
        </div>
        <div className="opacity-70 text-base">
          <input
            type="text"
            placeholder="Direct trek search (optional)"
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-100 text-lg focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white h-12 w-40 mx-auto rounded-xl font-semibold text-lg transition`}
        >
          {isLoading ? '⏳ Searching...' : '🔍 Search'}
        </button>
      </form>

      {isLoading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Generating trekking places...</p>
        </div>
      )}

      <div className="flex flex-wrap gap-6 justify-center items-start w-full max-w-7xl mx-auto">
        {renderTrekPlaces()}
      </div>
    </div>
  );
}

export default BeginYourJourney;