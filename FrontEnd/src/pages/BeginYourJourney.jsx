import "../App.css";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

// Enhanced AI Service with completely free alternatives
class AIService {
  constructor() {
    this.services = [
      {
        name: "Gemini",
        apiKey: import.meta.env.VITE_REACT_APP_GEMINI_API_KEY,
        generate: this.generateWithGemini.bind(this),
      },
      {
        name: "Hugging Face (Mistral)",
        apiKey: import.meta.env.VITE_REACT_APP_HUGGINGFACE_API_KEY,
        generate: this.generateWithHuggingFaceMistral.bind(this),
      },
      {
        name: "Hugging Face (CodeLlama)",
        apiKey: import.meta.env.VITE_REACT_APP_HUGGINGFACE_API_KEY,
        generate: this.generateWithHuggingFaceCodeLlama.bind(this),
      },
      {
        name: "Groq",
        apiKey: import.meta.env.VITE_REACT_APP_GROQ_API_KEY,
        generate: this.generateWithGroq.bind(this),
      },
    ];
  }

  async generateTrekkingPlaces(location) {
    const prompt = this.createPrompt(location);
    const generateFallbackImages = (placeName) => {
      const fallbackImages = [
        {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          description: "Mountain landscape",
          photographer: "John Doe",
          source: "Unsplash",
        },
        {
          url: "https://images.unsplash.com/photo-1464822759844-d150f39bf2c8?w=800&h=600&fit=crop",
          description: "Hiking trail",
          photographer: "Jane Smith",
          source: "Unsplash",
        },
        {
          url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
          description: "Forest path",
          photographer: "Mike Johnson",
          source: "Unsplash",
        },
      ];
      return fallbackImages.map((img) => ({
        ...img,
        description: `${placeName} - ${img.description}`,
      }));
    };

    for (const service of this.services) {
      if (!service.apiKey) {
        console.log(`Skipping ${service.name} - no API key configured`);
        continue;
      }

      try {
        console.log(`Attempting with ${service.name}...`);
        const result = await service.generate(prompt);
        console.log(`✅ Success with ${service.name}`);
        return { data: result, service: service.name };
      } catch (error) {
        console.error(`❌ ${service.name} failed:`, error.message);
        continue;
      }
    }
    if (Array.isArray(result.data) && result.data.length > 0) {
      // Ensure each place has galleryImages
      const placesWithImages = result.data.map((place) => ({
        ...place,
        galleryImages:
          place.galleryImages && place.galleryImages.length > 0
            ? place.galleryImages
            : generateFallbackImages(place.name),
      }));

      const sortedPlaces = sortTrekPlaces(
        placesWithImages,
        userLocation?.lat,
        userLocation?.lng
      );
      setTrekPlaces(sortedPlaces);
    }

    throw new Error("All AI services failed or no API keys configured");
  }

  createPrompt(location) {
    return `Generate a JSON array of 8-10 trekking places near ${location}. Each place should have:
  {
    "name": "Place Name",
    "difficulty": "easy|moderate|hard",
    "color": "green|orange|red",
    "altitude": "elevation range in meters",
    "district": "nearest district/region",
    "duration": "duration of trek on foot in hrs or days (no extra text)",
    "scenes": ["scene1(place)", "scene2", "scene3", "scene4"],
    "thingsToKnowBeforeVisiting": "detailed advice and precautions",
    "estimatedBudget": "budget with currency",
    "currency": "local currency",
    "availabilityOfRoadTransport": "yes|no|partial",
    "needOfGuide": "yes|no|recommended",
    "coordinates": { "lat": latitude, "lng": longitude },
    "galleryImages": [
      {
        "url": "https://images.unsplash.com/photo-realistic-url",
        "description": "scenic description",
        "photographer": "photographer name",
        "source": "Unsplash"
      },
      {
        "url": "https://images.unsplash.com/photo-realistic-url2",
        "description": "scenic description2",
        "photographer": "photographer name",
        "source": "Unsplash"
      }
    ]
  }
  Include 3-4 realistic gallery images per place. Return only valid JSON array.`;
  }

  async generateWithGemini(prompt) {
    const genAI = new GoogleGenerativeAI(
      import.meta.env.VITE_REACT_APP_GEMINI_API_KEY
    );
    // Fixed model name - use gemini-1.5-flash instead of gemini-2.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return this.parseJSON(text);
  }

  async generateWithHuggingFaceMistral(prompt) {
    // Using Mistral 7B Instruct - completely free
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_REACT_APP_HUGGINGFACE_API_KEY
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 4000,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Hugging Face Mistral API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const text = data[0]?.generated_text || data.generated_text || "";
    return this.parseJSON(text);
  }

  async generateWithHuggingFaceCodeLlama(prompt) {
    // Using CodeLlama for structured output
    const response = await fetch(
      "https://api-inference.huggingface.co/models/codellama/CodeLlama-7b-Instruct-hf",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_REACT_APP_HUGGINGFACE_API_KEY
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 4000,
            temperature: 0.3,
            do_sample: true,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Hugging Face CodeLlama API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const text = data[0]?.generated_text || data.generated_text || "";
    return this.parseJSON(text);
  }

  async generateWithGroq(prompt) {
    // Groq offers free fast inference
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_REACT_APP_GROQ_API_KEY
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama3-8b-8192", // Free model on Groq
          max_tokens: 4000,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Groq API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return this.parseJSON(data.choices[0]?.message?.content || "");
  }

  parseJSON(text) {
    if (!text || text.trim() === "") {
      throw new Error("Empty response from AI service");
    }

    // Clean the text by removing markdown code blocks and extra whitespace
    let cleanedText = text
      .replace(/```json|```/g, "")
      .replace(/```/g, "")
      .trim();

    // Remove any text before the first [ and after the last ]
    const firstBracket = cleanedText.indexOf("[");
    const lastBracket = cleanedText.lastIndexOf("]");

    if (
      firstBracket !== -1 &&
      lastBracket !== -1 &&
      lastBracket > firstBracket
    ) {
      cleanedText = cleanedText.substring(firstBracket, lastBracket + 1);
    }

    try {
      const result = JSON.parse(cleanedText);
      if (Array.isArray(result) && result.length > 0) {
        return result;
      }
      throw new Error("Parsed result is not a valid array");
    } catch (error) {
      try {
        // Try to find JSON objects in the text
        const jsonMatches = cleanedText.match(
          /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g
        );
        if (jsonMatches && jsonMatches.length > 0) {
          const objects = jsonMatches
            .map((match) => {
              try {
                return JSON.parse(match);
              } catch (e) {
                return null;
              }
            })
            .filter((obj) => obj !== null);

          if (objects.length > 0) {
            return objects;
          }
        }
      } catch (e) {
        console.error("Alternative parsing failed:", e);
      }

      throw new Error(`Failed to parse JSON response: ${error.message}`);
    }
  }
}

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
  const [currentAIService, setCurrentAIService] = useState("");

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const aiService = new AIService();

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
    }, 5000);

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
    if (!location.trim()) {
      alert("Please enter a location to search for treks.");
      return;
    }

    setIsLoading(true);
    setCurrentAIService("");

    try {
      const result = await aiService.generateTrekkingPlaces(location);
      setCurrentAIService(result.service);

      if (Array.isArray(result.data) && result.data.length > 0) {
        const sortedPlaces = sortTrekPlaces(
          result.data,
          userLocation?.lat,
          userLocation?.lng
        );
        setTrekPlaces(sortedPlaces);
      } else {
        throw new Error("Invalid response format from AI service");
      }
    } catch (error) {
      console.error("All AI services failed:", error);

      // Show user-friendly error message
      alert(
        `Unable to generate trek recommendations. Using sample data instead.`
      );

      // Fallback to enhanced sample data
      const samplePlaces = [
        {
          name: "Sample Trek Near " + location,
          difficulty: "easy",
          color: "green",
          district: "Local District",
          duration: "3-4 hrs",
          image:
            "https://images.unsplash.com/photo-1464822759844-d150f39bf2c8?w=400",
          altitude: "200 - 600m",
          scenes: [
            "Mountain sunrise",
            "Forest trails",
            "Bird watching",
            "Local villages",
          ],
          thingsToKnowBeforeVisiting:
            "Carry water, wear comfortable shoes. Best visited early morning for sunrise views.",
          currency: "USD",
          estimatedBudget: "30-80",
          availabilityOfRoadTransport: "yes",
          needOfGuide: "no",
          coordinates: {
            lat: userLocation?.lat || 27.7172,
            lng: userLocation?.lng || 85.324,
          },
          distance: 0,
        },
        {
          name: "Sample Forest Trek Near " + location,
          difficulty: "moderate",
          color: "orange",
          district: "Mountain District",
          duration: "6-8 hrs",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
          altitude: "600 - 1400m",
          scenes: [
            "Dense forests",
            "Rocky ridges",
            "Mountain streams",
            "Wildlife spotting",
          ],
          thingsToKnowBeforeVisiting:
            "Moderate fitness required. Carry rain gear and first aid. Inform someone about your trek.",
          currency: "USD",
          estimatedBudget: "100-200",
          availabilityOfRoadTransport: "partial",
          needOfGuide: "recommended",
          coordinates: {
            lat: (userLocation?.lat || 27.7172) + 0.01,
            lng: (userLocation?.lng || 85.324) + 0.01,
          },
          distance: userLocation ? 1.5 : 0,
        },
        {
          name: " Sample Summit Challenge Near " + location,
          difficulty: "hard",
          color: "red",
          district: "High Altitude District",
          duration: "2-3 days",
          image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
          altitude: "1400 - 3200m",
          scenes: [
            "Snow-capped peaks",
            "Alpine meadows",
            "Glacier views",
            "Dramatic cliffs",
          ],
          thingsToKnowBeforeVisiting:
            "Expert level trek. Professional guide mandatory. Weather dependent. Proper mountaineering gear required.",
          currency: "USD",
          estimatedBudget: "400-800",
          availabilityOfRoadTransport: "no",
          needOfGuide: "yes",
          coordinates: {
            lat: (userLocation?.lat || 27.7172) + 0.02,
            lng: (userLocation?.lng || 85.324) + 0.02,
          },
          distance: userLocation ? 3.2 : 0,
        },
        {
          name: "Sample Waterfall Circuit Near " + location,
          difficulty: "easy",
          color: "green",
          district: "Valley District",
          duration: "4-5 hrs",
          image:
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400",
          altitude: "300 - 800m",
          scenes: [
            "Multiple waterfalls",
            "Swimming spots",
            "Lush vegetation",
            "Picnic areas",
          ],
          thingsToKnowBeforeVisiting:
            "Carry swimwear if you plan to swim. Slippery rocks near waterfalls - be careful.",
          currency: "USD",
          estimatedBudget: "40-100",
          availabilityOfRoadTransport: "yes",
          needOfGuide: "no",
          coordinates: {
            lat: (userLocation?.lat || 27.7172) - 0.005,
            lng: (userLocation?.lng || 85.324) + 0.005,
          },
          distance: userLocation ? 0.8 : 0,
        },
      ];

      const sortedSamplePlaces = sortTrekPlaces(
        samplePlaces,
        userLocation?.lat,
        userLocation?.lng
      );
      setTrekPlaces(sortedSamplePlaces);
      setCurrentAIService("Sample Data");
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
              transport: place.availabilityOfRoadTransport,
              guide: place.needOfGuide,
              advice: place.thingsToKnowBeforeVisiting,
              scenes: place.scenes,
              distance: place.distance,
              galleryImages: place.galleryImages, // NEW: Pass gallery images
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
            <h3 className="text-2xl font-semibold text-gray-800">
              Found {trekPlaces.length} trails
            </h3>
            <p className="text-sm text-gray-600">
              Closest and easiest trails appear first
            </p>
            {currentAIService && (
              <p className="text-xs text-blue-600 mt-1">
                ✨ Generated using: {currentAIService}
              </p>
            )}
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
