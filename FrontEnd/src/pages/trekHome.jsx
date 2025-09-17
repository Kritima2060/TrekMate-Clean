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
  const [hotels, setHotels] = useState([]);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const [hotelsError, setHotelsError] = useState("");
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  useEffect(() => {
    const currentState = history.state?.usr;
    if (currentState) {
      setTrekData(currentState);
      
      // Use passed gallery images instead of generating new ones
      if (currentState.galleryImages && currentState.galleryImages.length > 0) {
        setGallery(currentState.galleryImages);
        setGalleryLoading(false);
      } else {
        // Fallback to API generation only if no images passed
        generateGalleryImages(currentState.name, currentState.district);
      }
    }
  }, []);

  // Generate gallery images using multiple free APIs (fallback only)
  const generateGalleryImages = async (placeName, district) => {
    setGalleryLoading(true);
    const images = [];

    try {
      // Method 1: Unsplash API (Free with signup)
      const unsplashImages = await getUnsplashImages(placeName);
      images.push(...unsplashImages);

      // Method 2: Pixabay API (Free with signup)
      const pixabayImages = await getPixabayImages(placeName);
      images.push(...pixabayImages);

      // Method 3: Pexels API (Free with signup)
      const pexelsImages = await getPexelsImages(placeName);
      images.push(...pexelsImages);

      // Fallback: Use location-based stock images
      if (images.length === 0) {
        images.push(...getFallbackImages());
      }

      setGallery(images.slice(0, 6)); // Limit to 6 images
    } catch (error) {
      console.error("Error generating gallery:", error);
      setGallery(getFallbackImages());
    } finally {
      setGalleryLoading(false);
    }
  };

  // Unsplash API - Free tier: 50 requests/hour
  const getUnsplashImages = async (query) => {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    if (!accessKey) return [];

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + " hiking trekking mountains")}&per_page=3&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${accessKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.results.map(photo => ({
          url: photo.urls.regular,
          source: 'Unsplash',
          photographer: photo.user.name,
          description: photo.alt_description || 'Mountain scenery',
          link: photo.links.html
        }));
      }
    } catch (error) {
      console.error("Unsplash API error:", error);
    }
    return [];
  };

  // Pixabay API - Free tier: 20,000 requests/month
  const getPixabayImages = async (query) => {
    const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query + " hiking trekking")}&image_type=photo&orientation=horizontal&per_page=3&safesearch=true`
      );

      if (response.ok) {
        const data = await response.json();
        return data.hits.map(photo => ({
          url: photo.webformatURL,
          source: 'Pixabay',
          photographer: photo.user,
          description: photo.tags,
          link: photo.pageURL
        }));
      }
    } catch (error) {
      console.error("Pixabay API error:", error);
    }
    return [];
  };

  // Pexels API - Free tier: 200 requests/hour
  const getPexelsImages = async (query) => {
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query + " hiking trekking mountains")}&per_page=3&orientation=landscape`,
        {
          headers: {
            'Authorization': apiKey
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.photos.map(photo => ({
          url: photo.src.large,
          source: 'Pexels',
          photographer: photo.photographer,
          description: photo.alt,
          link: photo.url
        }));
      }
    } catch (error) {
      console.error("Pexels API error:", error);
    }
    return [];
  };

  const getFallbackImages = () => [
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      source: 'Fallback',
      photographer: 'Stock',
      description: 'Mountain landscape'
    },
    {
      url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
      source: 'Fallback',
      photographer: 'Stock',
      description: 'Hiking trail'
    },
    {
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
      source: 'Fallback',
      photographer: 'Stock',
      description: 'Forest path'
    },
  ];

  // Free hotel search APIs - no Google Maps
  const searchNearbyHotels = async () => {
    if (!trekData?.coordinates) {
      setHotelsError("Location coordinates not available");
      return;
    }

    setHotelsLoading(true);
    setHotelsError("");
    setHotels([]);

    try {
      const lat = trekData.coordinates.lat || trekData.coordinates.latitude;
      const lng = trekData.coordinates.lng || trekData.coordinates.longitude;
      
      // Method 1: Try OpenTripMap API (Free - 1000 requests/day)
      const opentripmapKey = import.meta.env.VITE_OPENTRIPMAP_API_KEY;
      if (opentripmapKey) {
        const hotels = await getOpenTripMapHotels(lat, lng, opentripmapKey);
        if (hotels.length > 0) {
          setHotels(hotels);
          return;
        }
      }

      // Method 2: Try Overpass API (Completely free, no key needed)
      const overpassHotels = await getOverpassHotels(lat, lng);
      if (overpassHotels.length > 0) {
        setHotels(overpassHotels);
        return;
      }

      // Method 3: Try Foursquare API as backup (Free - 1000 calls/day)
      const foursquareKey = import.meta.env.VITE_FOURSQUARE_API_KEY;
      if (foursquareKey) {
        const fsHotels = await getFoursquareHotels(lat, lng, foursquareKey);
        if (fsHotels.length > 0) {
          setHotels(fsHotels);
          return;
        }
      }

      // Method 4: Try RapidAPI Travel Advisor (Free tier available)
      const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
      if (rapidApiKey) {
        const rapidHotels = await getRapidApiHotels(lat, lng, rapidApiKey);
        if (rapidHotels.length > 0) {
          setHotels(rapidHotels);
          return;
        }
      }

      setHotelsError("No hotels found in this area");
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotelsError("Unable to fetch hotels. Please try again.");
    } finally {
      setHotelsLoading(false);
    }
  };

  // OpenTripMap API - Free tier: 1000 requests/day
  const getOpenTripMapHotels = async (lat, lng, apiKey) => {
    try {
      const response = await fetch(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lng}&lat=${lat}&kinds=accomodations&format=json&limit=10&apikey=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        const hotelPromises = data.features.map(async (place) => {
          const details = await getOpenTripMapDetails(place.properties.xid, apiKey);
          return {
            name: place.properties.name || "Accommodation",
            address: details.address?.city || details.address?.country || "Address not available",
            rating: details.rate ? `${details.rate}/8` : "No rating",
            // priceLevel: "Price not available",
            photo: details.preview?.source || generateLocationImage(lat, lng),
            source: 'OpenTripMap',
            phone: details.phone || null,
            website: details.url || null,
            coordinates: {
              lat: place.geometry.coordinates[1],
              lng: place.geometry.coordinates[0]
            }
          };
        });

        return await Promise.all(hotelPromises);
      }
    } catch (error) {
      console.error("OpenTripMap error:", error);
    }
    return [];
  };

  const getOpenTripMapDetails = async (xid, apiKey) => {
    try {
      const response = await fetch(
        `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("OpenTripMap details error:", error);
    }
    return {};
  };

  // Overpass API - Completely free, no registration needed
  const getOverpassHotels = async (lat, lng) => {
    try {
      const query = `
        [out:json][timeout:25];
        (
          node["tourism"="hotel"](around:10000,${lat},${lng});
          node["tourism"="guest_house"](around:10000,${lat},${lng});
          node["tourism"="hostel"](around:10000,${lat},${lng});
          node["tourism"="motel"](around:10000,${lat},${lng});
          way["tourism"="hotel"](around:10000,${lat},${lng});
          way["tourism"="guest_house"](around:10000,${lat},${lng});
        );
        out body;
      `;

      const response = await fetch(
        'https://overpass-api.de/api/interpreter',
        {
          method: 'POST',
          body: query
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.elements.slice(0, 12).map(place => ({
          name: place.tags?.name || `${place.tags?.tourism || 'Accommodation'}`.replace('_', ' '),
          address: [
            place.tags?.["addr:street"],
            place.tags?.["addr:city"],
            place.tags?.["addr:state"]
          ].filter(Boolean).join(", ") || "Address not available",
          rating: place.tags?.stars ? `${place.tags.stars} stars` : "No rating",
          // priceLevel: place.tags?.["price:room"] || "Price not available",
          // photo: generateLocationImage(place.lat, place.lon),
          source: 'OpenStreetMap',
          phone: place.tags?.phone || null,
          website: place.tags?.website || place.tags?.["contact:website"] || null,
          email: place.tags?.email || place.tags?.["contact:email"] || null,
          coordinates: {
            lat: place.lat,
            lng: place.lon
          }
        }));
      }
    } catch (error) {
      console.error("Overpass API error:", error);
    }
    return [];
  };

  // Foursquare Places API - Free tier: 1000 calls/day
  const getFoursquareHotels = async (lat, lng, apiKey) => {
    try {
      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?ll=${lat}%2C${lng}&radius=8000&categories=19014&limit=12`,
        {
          headers: {
            'Authorization': apiKey
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.results.map(place => ({
          name: place.name || "Hotel",
          address: place.location?.formatted_address || "Address not available",
          rating: place.rating ? `${place.rating}/10` : "No rating",
          // priceLevel: place.price || "Price not available",
          // photo: place.photos?.[0] ? `${place.photos[0].prefix}300x300${place.photos[0].suffix}` : generateLocationImage(lat, lng),
          source: 'Foursquare',
          coordinates: {
            lat: place.geocodes?.main?.latitude || lat,
            lng: place.geocodes?.main?.longitude || lng
          }
        }));
      }
    } catch (error) {
      console.error("Foursquare API error:", error);
    }
    return [];
  };

  // RapidAPI Travel Advisor - Free tier available
  const getRapidApiHotels = async (lat, lng, apiKey) => {
    try {
      const response = await fetch(
        `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${lat}&longitude=${lng}&limit=10&distance=10&unit=km&lang=en_US&currency=USD`,
        {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.data?.slice(0, 10).map(place => ({
          name: place.name || "Hotel",
          address: place.address || "Address not available",
          rating: place.rating ? `${place.rating}/5` : "No rating",
          // priceLevel: place.price || "Price not available",
          // photo: place.photo?.images?.medium?.url || generateLocationImage(lat, lng),
          source: 'TripAdvisor',
          phone: place.phone || null,
          website: place.website || null,
          coordinates: {
            lat: parseFloat(place.latitude) || lat,
            lng: parseFloat(place.longitude) || lng
          }
        })) || [];
      }
    } catch (error) {
      console.error("RapidAPI Travel Advisor error:", error);
    }
    return [];
  };

  // Generate location-based placeholder images
  const generateLocationImage = (lat, lng) => {
    // Use OpenStreetMap static map as fallback
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lng}`;
  };

  const handleHotelToggle = () => {
    const newShowHotels = !showHotels;
    setShowHotels(newShowHotels);

    if (newShowHotels && hotels.length === 0 && !hotelsLoading) {
      searchNearbyHotels();
    }
  };

  const fetchWeather = async () => {
    if (!trekData?.district) {
      setWeatherError("Location information not available");
      return;
    }

    setWeatherLoading(true);
    setWeatherError("");
    setWeather(null);

    // Dynamic search options - removed hardcoded country references
    const searchOptions = [
      trekData.district,
      trekData.district.split("/")[0]?.trim(),
      trekData.district.split("/")[1]?.trim(),
      trekData.district.split(" ")[0]?.trim(),
      trekData.district.split(",")[0]?.trim(),
      trekData.name?.split(" ")[0]?.trim()
    ].filter(Boolean);

    // Try coordinate-based weather first if available
    if (trekData.coordinates?.lat && trekData.coordinates?.lng) {
      try {
        const response = await fetch(
          `${api.base}weather?lat=${trekData.coordinates.lat}&lon=${trekData.coordinates.lng}&appid=${api.key}&units=metric`
        );
        const result = await response.json();

        if (response.ok) {
          setWeather(result);
          setWeatherLoading(false);
          return;
        }
      } catch (err) {
        console.log("Coordinate weather failed, trying location names");
      }
    }

    // Fallback to location name search
    for (const location of searchOptions) {
      try {
        const response = await fetch(
          `${api.base}weather?q=${encodeURIComponent(location)}&appid=${api.key}&units=metric`
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

  if (!trekData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-1 h-12 bg-neutral-900 animate-pulse"></div>
          <p className="text-xs text-neutral-400 tracking-[0.2em] uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-32 bg-white">
      <section className="px-8 pb-16 text-center">
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
              {galleryLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-1 h-12 bg-neutral-900 animate-pulse"></div>
                </div>
              ) : (
                <img
                  src={gallery[galleryIndex]?.url || gallery[0]?.url}
                  alt={gallery[galleryIndex]?.description || "Trek"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop";
                  }}
                />
              )}
              {gallery.length > 1 && !galleryLoading && (
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
            
            {/* Photo credit */}
            {gallery[galleryIndex] && (
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                Photo by {gallery[galleryIndex].photographer} on {gallery[galleryIndex].source}
              </div>
            )}
          </div>

          {gallery.length > 1 && !galleryLoading && (
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
                    ? `${trekData?.distance.toFixed(1)} km away`
                    : "Distance not calculated"}
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
                <div
                  key={idx}
                  className="py-3 border-b border-neutral-100 last:border-0"
                >
                  <p className="text-neutral-700 font-light">{place}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <button
                className="w-full h-14 hover:cursor-pointer bg-neutral-900 text-white text-sm uppercase tracking-[0.1em] hover:bg-neutral-800 transition-colors duration-300"
                onClick={handleHotelToggle}
              >
                {showHotels ? "Hide Accommodations" : "Find Accommodations"}
              </button>

              <button
                className="w-full h-14 hover:cursor-pointer border border-neutral-900 text-neutral-900 text-sm uppercase tracking-[0.1em] hover:bg-neutral-50 transition-colors duration-300"
                onClick={handleWeatherToggle}
              >
                {showWeather ? "Hide Weather" : "Check Weather"}
              </button>
            </div>

            {showHotels && (
              <div className="mt-8 animate-in fade-in duration-500">
                {hotelsLoading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-1 h-8 bg-neutral-900 animate-pulse"></div>
                  </div>
                )}

                {hotelsError && (
                  <div className="border border-neutral-200 bg-neutral-50 px-6 py-8 text-center">
                    <p className="text-sm text-neutral-600 font-light">
                      {hotelsError}
                    </p>
                  </div>
                )}

                {hotels.length > 0 && (
                  <div className="space-y-4">
                    {hotels.map((hotel, idx) => (
                      <div
                        key={idx}
                        className="border border-neutral-200 bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                      >
                        <div className="flex">
                          {/* {hotel.photo && (
                            <div className="w-32 h-32 flex-shrink-0">
                              <img
                                src={hotel.photo}
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )} */}
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-light text-neutral-900 leading-tight">
                                {hotel.name}
                              </h4>
                              <div className="text-right ml-4">
                                <p className="text-lg font-medium text-neutral-900">
                                  {/* {hotel.priceLevel} */}
                                </p>
                                {hotel.rating !== "No rating" && (
                                  <div className="flex items-center justify-end mt-1">
                                    <span className="text-sm text-neutral-600">
                                      ⭐ {hotel.rating}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-neutral-600 font-light leading-relaxed mb-2">
                              {hotel.address}
                            </p>
                            
                            <div className="space-y-1">
                              {hotel.phone && (
                                <p className="text-xs text-neutral-500">
                                  📞 {hotel.phone}
                                </p>
                              )}
                              {hotel.email && (
                                <p className="text-xs text-neutral-500">
                                  📧 {hotel.email}
                                </p>
                              )}
                              {hotel.website && (
                                <p className="text-xs text-neutral-500">
                                  <a 
                                    href={hotel.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    🌐 Website
                                  </a>
                                </p>
                              )}
                              <p className="text-xs text-gray-500">
                                📍 Source: {hotel.source}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                          Low {Math.round(weather.main.temp_min)}°C • High{" "}
                          {Math.round(weather.main.temp_max)}°C
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