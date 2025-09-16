import "../App.css";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

function BeginYourJourney() {
  const [trekPlaces, setTrekPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [showReportWindow, setShowReportWindow] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyzing terrain...",
    "Finding trails sorted by distance and difficulty",
    "Calculating elevation profiles...",
    "Checking weather conditions...",
    "Finalizing recommendations...",
  ];

  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("userToken");
      const userData =
        localStorage.getItem("userData") || localStorage.getItem("user");
      const sessionToken = sessionStorage.getItem("authToken");
      const hasAuthCookie =
        document.cookie.includes("auth=") ||
        document.cookie.includes("session=");
      const authenticated = !!(
        token ||
        userData ||
        sessionToken ||
        hasAuthCookie
      );

      if (!authenticated) {
        navigate("/login");
      }
    };

    checkAuth();

    if (!isLoading) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 8 + 2;

        if (newProgress >= 100) return 100;

        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));

        return newProgress;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [navigate, isLoading]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const sortTrekPlaces = (places, userLat, userLng) => {
    const difficultyWeight = { easy: 1, moderate: 2, hard: 3 };

    return places
      .map((place) => ({
        ...place,
        distance:
          userLat && userLng
            ? calculateDistance(
                userLat,
                userLng,
                place.coordinates.lat,
                place.coordinates.lng
              )
            : 0,
      }))
      .sort((a, b) => {
        // Primary sort: by distance (ascending)
        const distanceDiff = a.distance - b.distance;
        if (Math.abs(distanceDiff) > 1) {
          // If distance difference > 1km, sort by distance
          return distanceDiff;
        }
        // Secondary sort: by difficulty (easy first, then moderate, then hard)
        return difficultyWeight[a.difficulty] - difficultyWeight[b.difficulty];
      });
  };

  const fetchLocationName = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    return (
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county
    );
  };

  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          const locationName = await fetchLocationName(latitude, longitude);
          setSearchQuery(locationName);
        },
        () => alert("Unable to retrieve your location.")
      );
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
      Generate a JSON array of 8-12 trekking places near ${location}. Each place should have:
      {
        "name": "Place Name",
        "difficulty": "easy|moderate|hard",
        "color": "green|orange|red",
        "altitude": "elevation range in meters",
        "district": "nearest district",
        "image" :"https:// url of image of ${location}"
        "duration" :"duration of trek on foot in hrs or days (no extra text)",
        "scenes": ["scene1(place)", "scene2", "scene3","scene4"],
        "thingsToKnowBeforeVisiting": "detailed advice and precautions",
        "estimatedBudget": "budget with currency",
        "currency": "local currency",
        "availabilityOfRoadTransport": "yes|no",
        "needOfGuide": "yes|no",
        "coordinates": { "lat": latitude, "lng": longitude }
      }
      Make sure to include a good mix of easy, moderate, and hard difficulty trails with accurate coordinates.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let cleanedText = (await response.text())
        .replace(/```json|```/g, "")
        .trim();
      const places = JSON.parse(cleanedText);

      if (Array.isArray(places)) {
        const sortedPlaces = sortTrekPlaces(
          places,
          userLocation?.lat,
          userLocation?.lng
        );
        setTrekPlaces(sortedPlaces);
      }
    } catch (error) {
      console.error("Error generating places:", error);
      const samplePlaces = [
        {
          name: "Sample Easy Trek Near " + location,
          difficulty: "easy",
          color: "green",
          district: "Morang",
          duration: "4 hrs",
          image: "www.facebook.com/image/1",
          altitude: "300 - 500m",
          scenes: ["River views", "Local wildlife", "Easy trails"],
          thingsToKnowBeforeVisiting: "Carry water and snacks.",
          currency: "NPR/USD",
          estimatedBudget: "50-100",
          availabilityOfRoadTransport: "yes",
          needOfGuide: "no",
          coordinates: {
            lat: userLocation?.lat || 0,
            lng: userLocation?.lng || 0,
          },
          distance: 0,
        },
        {
          name: "Sample Moderate Trek Near " + location,
          difficulty: "moderate",
          color: "orange",
          district: "Morang",
          duration: "8 hrs",
          image: "www.facebook.com/image/2",
          altitude: "800 - 1200m",
          scenes: ["Mountain views", "Forest trails", "Rocky paths"],
          thingsToKnowBeforeVisiting:
            "Good fitness required. Carry proper gear.",
          currency: "NPR/USD",
          estimatedBudget: "150-300",
          availabilityOfRoadTransport: "no",
          needOfGuide: "yes",
          coordinates: {
            lat: (userLocation?.lat || 0) + 0.01,
            lng: (userLocation?.lng || 0) + 0.01,
          },
          distance: userLocation ? 1.5 : 0,
        },
      ];
      setTrekPlaces(samplePlaces);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) await generateTrekkingPlaces(searchQuery);
  };

  const colorMap = {
    green: "bg-green-400",
    orange: "bg-amber-400",
    red: "bg-rose-400",
  };
  const colorMap2 = {
    green: "border-green-400",
    orange: "border-amber-400",
    red: "border-rose-400",
  };

  const renderTrekPlaces = () => {
    return trekPlaces.map((place, index) => (
      <div
        key={index}
        id="eachTrekPlace"
        className={`flex flex-col justify-between items-stretch rounded-xl border-2  ${
          colorMap2[place.color]
        } bg-white min-w-[220px] max-w-xs w-full max-h-120 overflow-scroll gap-3 cursor-pointer hover:shadow-lg transition-shadow`}
        onClick={() =>
          navigate("/trekhome", {
            state: {
              name: place.name,
              district: place.district,
              duration: place.duration,
              altitude: place.altitude,
              estimatedBudget: place.estimatedBudget,
              coordinates: place.coordinates,
              difficulty: place.difficulty,
              currency: place.currency,
              image: place.image,
              transport: place.availabilityOfRoadTransport,
              guide: place.needOfGuide,
              advice: place.thingsToKnowBeforeVisiting,
              scenes: place.scenes,
              distance: place.distance,
            },
          })
        }
      >
        <div className="flex items-center justify-between gap-2 mb-1 ">
          <div className="bg-slate-50 w-full p-2 flex justify-between">
            <div className={"flex items-center gap-2"}>
              <span
                className={`w-3 h-3 rounded-full ${
                  colorMap[place.color] || "bg-gray-400"
                }`}
              ></span>
              <span className="text-xs text-gray-600 capitalize">
                {place.difficulty}
              </span>
            </div>
            <span className="text-xs text-gray-600 capitalize">
              {place.duration}
            </span>
            {place.distance > 0 && (
              <span className={`text-xs  font-medium`}>
                {place.distance.toFixed(1)} km
              </span>
            )}
          </div>
        </div>
        <div className="p-1 gap-2 flex flex-col">
          <div className="font-semibold  text-xl text-gray-900 text-center flex  justify-center items-center h-full p-2">
            <span className=" block">{place.name}</span>
          </div>

          <div className="flex flex-col gap-0.5 text-xs text-gray-500 mb-1 px-2">
            <div className="bg-slate-50 w-full p-2 flex justify-between">
              <span>
                <span className="text-gray-700 font-semibold">Altitude:</span>{" "}
                {place.altitude}
              </span>
            </div>
            <div className="bg-slate-50 w-full p-2 flex justify-between">
              <span>
                <span className="text-gray-700 font-semibold">Guide:</span>{" "}
                {place.needOfGuide}
              </span>
            </div>
            <div className="bg-slate-50 w-full p-2 mb-2 flex justify-between">
              <span>
                <span className="text-gray-700 font-semibold">Transport:</span>{" "}
                {place.availabilityOfRoadTransport}
              </span>
            </div>
            <div className="bg-slate-50 w-full rounded-b-xl flex justify-between">
              <div className="text-xs text-gray-600 mb-2 px-2">
                <span className="font-semibold">Scenes:</span>{" "}
                {place.scenes?.join(", ") || "N/A"}
              </div>
            </div>
          </div>

          {index === 0 && place.distance > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 mx-2 mb-2">
              <span className="text-xs text-green-700 font-medium">
                🎯 Closest to you!
              </span>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center gap-8">
      {/* Fixed Buttons */}
      <div className="fixed bottom-8 left-8 flex flex-col gap-3 z-50">
        <button
          // onClick={handleReportClick}
          className="w-12 h-12 bg-red-600 shadow-lg hover:shadow-xl rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 border border-slate-100 cursor-pointer"
          title="Report an issue"
        >
          🚨
        </button>
        <button
          className="w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 border border-slate-100 cursor-pointer"
          title="AI Assistant"
        >
          <svg
            className="w-5 h-5 text-slate-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <form
        className="w-full mt-32 max-w-5xl flex flex-col gap-4 p-6 rounded-lg bg-white shadow-md"
        onSubmit={handleSearch}
      >
        <h2 className="text-2xl font-semibold text-center text-neutral-900">
          Find Treks <span>Nearby</span>
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search treks by place"
            className="flex-1 h-12 px-4 border border-neutral-300 rounded-lg text-neutral-900 text-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
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
          className={`h-12 w-full rounded-xl text-neutral-50 font-semibold text-lg ${
            isLoading ? "bg-neutral-400" : "bg-neutral-800 hover:bg-neutral-900"
          } transition cursor-pointer`}
        >
          {isLoading ? "⏳ Searching..." : "Search"}
        </button>
        {userLocation && (
          <div className="text-sm text-gray-600 text-center">
            📍 Using your location for distance-based sorting
          </div>
        )}
      </form>

      {isLoading && (
        <div className="text-center text-neutral-600">
          <div className="text-3xl font-bold mb-4">
            Generating trekking places...
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="w-full bg-neutral-200 h-1 mb-4 overflow-hidden rounded-full">
              <div
                className="h-full bg-neutral-900 transition-all duration-200 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-4">
              {Math.round(progress)}% Complete
            </div>
          </div>

          <div className="text-sm text-neutral-500 min-h-[1.25rem]">
            {steps[currentStep]}
          </div>
        </div>
      )}

      {trekPlaces.length > 0 && (
        <div className="w-full max-w-7xl">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Found {trekPlaces.length} trails • Sorted by distance & difficulty
            </h3>
            <p className="text-sm text-gray-600">
              Closest and easiest trails appear first
            </p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {renderTrekPlaces()}
          </div>
        </div>
      )}
    </div>
  );
}

export default BeginYourJourney;
