import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const trekData = {
    name: "Everest Base Camp",
    duration: "12 days",
    altitude: "5,364 m",
    currency: "Nepalese Rupee (NPR)",
    district: "Solukhumbu",
    estimatedBudget: "$1200 - $2000",
    thingsToKnow: [
        "Weather can be unpredictable; pack accordingly.",
        "Permits required: TIMS & Sagarmatha National Park.",
        "Altitude sickness is a risk; acclimatize properly.",
        "Limited ATM access; carry enough cash.",
    ],
    placesToView: [
        "Namche Bazaar",
        "Tengboche Monastery",
        "Kala Patthar",
        "Lukla",
        "Sagarmatha National Park",
    ],
    gallery: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1464983953574-0892a716854b",
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        "https://images.unsplash.com/photo-1517821099601-1a7c1e1e8a5e",
    ],
    hotels: [
        { name: "Hotel Everest View", location: "Syangboche", price: "$200/night" },
        { name: "Namche Hotel", location: "Namche Bazaar", price: "$50/night" },
        { name: "Yeti Mountain Home", location: "Lukla", price: "$80/night" },
    ],
};

export default function TrekHome() {
    
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [showHotels, setShowHotels] = useState(false);
    const location = useLocation();
    const trekData = location.state;
    console.log(trekData)
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
        // Redirect to login if not logged in
        window.location.href = "/login";
        }
        if (!trekData) {
      // redirect if no data (maybe user opened page directly)
      console.log("notrekdata")
      window.location.href = "/";
    }
  }, [trekData]);


    // const nextPhoto = () =>
    //     setGalleryIndex((i) => (i + 1) % trekData.gallery.length);
    // const prevPhoto = () =>
    //     setGalleryIndex((i) => (i === 0 ? trekData.gallery.length - 1 : i - 1));
    console.log(trekData?.coordinates.lat)
    console.log(trekData?.coordinates.lng)
    return (
        <main className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row items-start justify-center px-6 py-12 gap-10">
            {/* Left Section */}
            <section className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-200">
                {/* Header */}
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{trekData?.name}</h1>
                    <span className="text-lg text-gray-600 font-semibold">{trekData?.district}</span>
                </header>

                {/* Gallery */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 shadow">
                        <img 
                        src={trekData?.image}
                            // src={trekData.gallery[galleryIndex]}
                            // alt={`Gallery ${galleryIndex + 1}`}
                            className="object-cover w-full h-full transition duration-300 scale-105 hover:scale-110"
                        />
                        <button
                            // onClick={prevPhoto}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-700 rounded-full p-2 border shadow hover:bg-gray-100 transition"
                            aria-label="Previous photo"
                        >
                            &#8592;
                        </button>
                        <button
                            // onClick={nextPhoto}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-700 rounded-full p-2 border shadow hover:bg-gray-100 transition"
                            aria-label="Next photo"
                        >
                            
                        </button>
                        <span className="absolute bottom-3 right-3 bg-gray-100/90 text-md px-3 py-1 rounded-full shadow text-gray-700 font-semibold">
                            {/* {galleryIndex + 1}/{trekData.gallery.length} */}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <ul className="space-y-2 text-base">
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Duration:</span>
                        <span className="text-gray-500">{trekData?.duration}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Difficulty:</span>
                        <span className="text-gray-500">{trekData?.difficulty}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Need of Guide:</span>
                        <span className="text-gray-500">{trekData?.guide}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Avialability of Roads:</span>
                        <span className="text-gray-500">{trekData?.transport}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Altitude:</span>
                        <span className="text-gray-500">{trekData?.altitude}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Budget:</span>
                        <span className="text-gray-500">{trekData?.estimatedBudget}</span>
                    </li>
                </ul>
            </section>

            {/* Right Section */}
            <div className="flex flex-col gap-10 w-full max-w-md">
                {/* Things to Know */}
                <div className="bg-white rounded-xl shadow p-8 border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="inline-block w-1 h-5 bg-gray-400 rounded-full mr-2"></span>
                        Things to Know
                    </h2>
                    <ul className="space-y-2 text-base">
                        <li>
                            <span className="font-medium text-gray-700">Currency:</span>{" "}
                            <span className="text-gray-500">{trekData?.currency}</span>
                        </li>
                    
                            <li>
                                {trekData?.advice}
                            </li>
                    </ul>
                </div>

                {/* Places to View */}
                <div className="bg-white rounded-xl shadow p-8 border border-gray-200 ">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="inline-block w-1 h-5 bg-gray-400 rounded-full mr-2"></span>
                        Places to View
                    </h2>
                    <div className="flex flex-wrap gap-2 ">
                        {trekData.scenes?.map((place, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium shadow-sm text-base"
                            >
                                {place}
                            </span>
                            
                        ))}
                                            <button
                        className="w-full mt-4 bg-gray-800 text-white rounded-lg h-12 text-base font-semibold hover:bg-gray-700 transition "
                        onClick={() => setShowHotels((v) => !v)}
                    >
                        {showHotels ? "Hide Hotels Nearby" : "Find Hotels Nearby"}
                    </button>
                    {showHotels && (
                        <div className="mt-2 space-y-3">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Hotels Nearby</h3>
                            <ul className="space-y-3">
                                {trekData.hotels.map((hotel, idx) => (
                                    <li
                                        key={idx}
                                        className="flex flex-col md:flex-row md:justify-between md:items-center bg-gray-100 border border-gray-200 rounded-lg p-3 text-base shadow-sm"
                                    >
                                        <span className="font-semibold text-gray-900">{hotel.name}</span>
                                        <span className="text-gray-700">{hotel.location}</span>
                                        <span className="text-gray-900 font-semibold">{hotel.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </main>
    );
}