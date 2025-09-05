// Replace all instances of "text-indigo-600" with "text-[#e74c3c]"
// Also update any accent color in button backgrounds if needed

import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import why_trekmate_img from "../assets/why-trekmate-img.svg";
import sos from "../assets/sos.svg";
import chatbot from "../assets/chatbot.svg";
import weatherimage from "../assets/weather-alerts.svg";
import reviewImg1 from "../assets/reviewAvatar1.svg";

import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-neutral-50 min-h-screen text-neutral-800 font-sans">
      <section className="text-center py-16 bg-neutral-100 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">About Us</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto">
          TrekMate – Your Smart Trekking Companion.
        </p>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-8 py-16 px-6 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <img src={why_trekmate_img} alt="Why TrekMate" className="rounded-xl  w-full" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Why <span className="text-[#e74c3c]">TrekMate</span>
          </h2>
          <p className="text-neutral-700 text-lg leading-relaxed">
            <strong>TrekMate</strong> is your smart trekking companion. It simplifies planning, ensures safety, and enhances every step of your journey. From first-time hikes to remote trails, TrekMate integrates weather alerts, accommodation info, and local services into a single platform.
          </p>
          <p className="text-neutral-700 text-lg leading-relaxed font-medium">
            Plan better. Trek smarter. Stay safe. With <span className="text-[#e74c3c]">TrekMate</span>.
          </p>
        </div>
      </section>

      <section className="flex justify-center gap-10 py-12 px-6">
        <Link to="/error" className="cursor-pointer hover:opacity-80 transition" title="AI Chat Assistance">
          <img src={chatbot} alt="Chatbot" className="w-16 h-16 md:w-20 md:h-20" />
        </Link>
        <Link to="/emergencyAlert" className="cursor-pointer hover:opacity-80 transition" title="Emergency SOS">
          <img src={sos} alt="SOS" className="w-16 h-16 md:w-20 md:h-20" />
        </Link>
        <Link to="/error" className="cursor-pointer hover:opacity-80 transition" title="Weather Alerts">
          <img src={weatherimage} alt="Weather Alert" className="w-16 h-16 md:w-20 md:h-20" />
        </Link>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Navigate with these features:</h2>
        <ul className="grid md:grid-cols-2 gap-6 list-decimal list-inside text-left md:text-left text-neutral-700 text-lg">
          <li>AI-based trekking assistance</li>
          <li>Real-Time Weather Alerts</li>
          <li>Emergency SOS with Real-Time GPS Sharing</li>
          <li>Homestay Booking with Verified Listings</li>
          <li>Photo-Based User Reviews</li>
        </ul>
      </section>

      <section className="bg-neutral-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            What <span className="text-[#e74c3c]">Our Travellers</span> Are Saying
          </h2>
          <p className="text-neutral-700 text-lg max-w-3xl mx-auto leading-relaxed">
            At TrekMate, nothing matters more than the experiences of our users. See why TrekMate is trusted across Nepal and beyond.
          </p>
          <Link to="/review">
            <button className="bg-[#e74c3c] hover:bg-[#c0392b] text-white py-3 px-8 rounded-xl text-lg font-medium cursor-pointer transition" title="View More Reviews">
              View More
            </button>
          </Link>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer">
            <img src={reviewImg1} alt="User Review" className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-neutral-900 text-lg md:text-xl">Sushma R., Pokhara</h3>
                <FontAwesomeIcon icon={faQuoteLeft} size="2x" flip="horizontal" className="text-neutral-400" />
              </div>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                "TrekMate made my solo trek feel like a guided adventure. The AI suggestions and weather updates were spot-on!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Choose TrekMate?</h2>
          <p className="text-neutral-700 text-lg max-w-3xl mx-auto leading-relaxed">
            TrekMate is your ultimate adventure companion. Smarter, safer, and more memorable trekking for every explorer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer">
            <h3 className="text-[#e74c3c] font-bold text-2xl mb-2">01 Budget-Friendly</h3>
            <p className="text-neutral-700 text-lg leading-relaxed">Top-notch services at affordable prices based on your requirements.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer">
            <h3 className="text-[#e74c3c] font-bold text-2xl mb-2">02 Flexible Itineraries</h3>
            <p className="text-neutral-700 text-lg leading-relaxed">Customize your itinerary to match your interests, pace, and goals.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer">
            <h3 className="text-[#e74c3c] font-bold text-2xl mb-2">03 Safety Comes First</h3>
            <p className="text-neutral-700 text-lg leading-relaxed">Features like SOS alerts, GPS tracking, and offline access ensure your protection.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer">
            <h3 className="text-[#e74c3c] font-bold text-2xl mb-2">04 24/7 Support</h3>
            <p className="text-neutral-700 text-lg leading-relaxed">Our team is available around the clock, from planning to on-trail assistance.</p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Let’s Stay Connected</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 text-neutral-700 text-lg md:text-xl">
          <div className="flex items-center gap-3"><FontAwesomeIcon icon={faEnvelope} /> trekmate@gmail.com</div>
          <div className="flex items-center gap-3"><FontAwesomeIcon icon={faPhone} /> 9812345678</div>
          <div className="flex items-center gap-3"><FontAwesomeIcon icon={faMapMarkerAlt} /> Birtamode, Bargachi</div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;