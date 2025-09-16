import React, { useState, useEffect } from "react";

export default function TrekHome() {
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [showHotels, setShowHotels] = useState(false);
    const [trekData, setTrekData] = useState(null);

    useEffect(() => {
        const currentState = history.state?.usr;
        if (currentState) {
            setTrekData(currentState);
        }
    }, []);

    const nextPhoto = () => setGalleryIndex((i) => (i + 1) % (gallery?.length || 1));
    const prevPhoto = () => setGalleryIndex((i) => (i === 0 ? (gallery?.length || 1) - 1 : i - 1));

    const gallery = [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
    ];

    const hotels = [
        { name: "Hotel Everest View", location: "Syangboche", price: "$200/night" },
        { name: "Namche Hotel", location: "Namche Bazaar", price: "$50/night" },
        { name: "Yeti Mountain Home", location: "Lukla", price: "$80/night" }
    ];

    if (!trekData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 mb-2">Loading...</div>
                    <div className="text-slate-600">Please wait while we load the trek details</div>
                </div>
            </div>
        );
    }
    
    return (
        <main className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row items-start justify-center px-4 py-8 gap-8">
            <section className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">{trekData?.name}</h1>
                    <span className="text-xl text-slate-600 font-medium">{trekData?.district}</span>
                </header>

                <div className="mb-8">
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        <img 
                            src={gallery[galleryIndex]}
                            alt={`Gallery ${galleryIndex + 1}`}
                            className="object-cover w-full h-full"
                        />
                        {gallery.length > 1 && (
                            <>
                                <button
                                    onClick={prevPhoto}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-white"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={nextPhoto}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-white"
                                >
                                    →
                                </button>
                            </>
                        )}
                    </div>
                    {gallery.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {gallery.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setGalleryIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition ${
                                        idx === galleryIndex ? 'bg-slate-800' : 'bg-slate-300 hover:bg-slate-400'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg px-4 py-3 border border-blue-100">
                        <span className="text-xs font-medium text-blue-700 block mb-1">Duration</span>
                        <span className="text-slate-900 font-semibold text-sm">{trekData?.duration}</span>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg px-4 py-3 border border-emerald-100">
                        <span className="text-xs font-medium text-emerald-700 block mb-1">Difficulty</span>
                        <span className="text-slate-900 font-semibold text-sm capitalize">{trekData?.difficulty}</span>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg px-4 py-3 border border-amber-100">
                        <span className="text-xs font-medium text-amber-700 block mb-1">Guide</span>
                        <span className="text-slate-900 font-semibold text-sm">{trekData?.guide}</span>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg px-4 py-3 border border-purple-100">
                        <span className="text-xs font-medium text-purple-700 block mb-1">Roads</span>
                        <span className="text-slate-900 font-semibold text-sm">{trekData?.transport}</span>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg px-4 py-3 border border-rose-100">
                        <span className="text-xs font-medium text-rose-700 block mb-1">Altitude</span>
                        <span className="text-slate-900 font-semibold text-sm">{trekData?.altitude}</span>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg px-4 py-3 border border-teal-100">
                        <span className="text-xs font-medium text-teal-700 block mb-1">Budget</span>
                        <span className="text-slate-900 font-semibold text-sm">{trekData?.estimatedBudget}</span>
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-6 w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 bg-indigo-400 rounded-full"></div>
                        <h2 className="text-xl font-bold text-slate-900">Things to Know</h2>
                    </div>
                    <div className="space-y-4">
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 border border-slate-100">
                        <span className="text-sm font-semibold text-slate-700 block mb-1">Currency</span>
                        <span className="text-slate-900 font-medium">{trekData?.currency || 'N/A'}</span>
                    </div>
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 border border-slate-100">
                        <span className="text-sm font-semibold text-slate-700 block mb-2">Advice</span>
                        <p className="text-slate-700 text-sm leading-relaxed">{trekData?.advice || 'No specific advice available'}</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 border border-slate-100">
                        <span className="text-sm font-semibold text-slate-700 block mb-1">Distance</span>
                        <span className="text-slate-900 font-medium">
                            {trekData?.distance ? `${trekData?.distance.toFixed(1)} km from you` : 'Distance not available'}
                        </span>
                    </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 bg-emerald-400 rounded-full"></div>
                        <h2 className="text-xl font-bold text-slate-900">Places to View</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {trekData?.scenes?.map((place, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 font-medium text-sm border border-slate-200 hover:from-slate-200 hover:to-gray-200 transition-all"
                            >
                                {place}
                            </span>
                        ))}
                    </div>
                    
                    <button
                        className="w-full bg-gradient-to-r from-slate-800 to-gray-800 text-white rounded-xl h-12 font-semibold hover:from-slate-900 hover:to-gray-900 transition-all duration-200 shadow-sm"
                        onClick={() => setShowHotels(v => !v)}
                    >
                        {showHotels ? "Hide Hotels Nearby" : "Find Hotels Nearby"}
                    </button>
                    
                    {showHotels && (
                        <div className="mt-6 space-y-4">
                            <h3 className="text-lg font-bold text-center text-slate-900">Hotels Nearby</h3>
                            <div className="space-y-3">
                                {hotels.map((hotel, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-slate-900">{hotel.name}</span>
                                            <span className="text-slate-900 font-bold bg-green-100 px-2 py-1 rounded-lg text-xs">{hotel.price}</span>
                                        </div>
                                        <span className="text-sm text-slate-600">{hotel.location}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}