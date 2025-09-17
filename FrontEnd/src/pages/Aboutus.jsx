import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import why_trekmate_img from "../assets/why-trekmate-img.svg";
import sos from "../assets/sos.svg";
import chatbot from "../assets/chatbot.svg";
import weatherimage from "../assets/weather-alerts.svg";
import reviewImg1 from "../assets/reviewAvatar1.svg";

import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-slate-50">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 mt-32">About Us</h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          TrekMate – Your Smart Trekking Companion.
        </p>
      </section>

      {/* Why TrekMate */}
      <section className="flex flex-col md:flex-row items-center gap-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="md:w-1/2">
          <img src={why_trekmate_img} alt="Why TrekMate" className="rounded-lg w-full shadow-sm" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why <span className="text-[#e74c3c]">TrekMate</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            <strong>TrekMate</strong> is your smart trekking companion. It simplifies planning, ensures safety, and enhances every step of your journey. From first-time hikes to remote trails, TrekMate integrates weather alerts, accommodation info, and local services into a single platform.
          </p>
          <p className="text-slate-600 font-medium">
            Plan better. Trek smarter. Stay safe. With <span className="text-[#e74c3c]">TrekMate</span>.
          </p>
        </div>
      </section>

      {/* Features Icons */}
      <section className="flex justify-center gap-12 py-12 px-6">
        <Link to="/error" title="AI Chat Assistance" className="hover:opacity-80 transition">
          <img src={chatbot} alt="Chatbot" className="w-16 h-16 md:w-20 md:h-20" />
        </Link>
        <Link to="/emergencyAlert" title="Emergency SOS" className="hover:opacity-80 transition">
          <img src={sos} alt="SOS" className="w-16 h-16 md:w-20 md:h-20" />
        </Link>
        <Link to="/error" title="Weather Alerts" className="hover:opacity-80 transition">
          <img src={weatherimage} alt="Weather Alert" className="w-16 h-16 md:w-20 md:h-20" />
        </Link>
      </section>

      {/* Navigate with Features */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Navigate with these features:</h2>
        <ul className="grid md:grid-cols-2 gap-4 text-left text-slate-600 text-lg">
          <li>✅ AI-based trekking assistance</li>
          <li>✅ Real-Time Weather Alerts</li>
          <li>✅ Emergency SOS with GPS Sharing</li>
          <li>✅ Homestay Booking with Verified Listings</li>
          <li>✅ Photo-Based User Reviews</li>
        </ul>
      </section>

      {/* Reviews */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            What <span className="text-[#e74c3c]">Our Travellers</span> Say
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            At TrekMate, nothing matters more than the experiences of our users. See why TrekMate is trusted across Nepal and beyond.
          </p>
          <Link to="/review">
            <button className="bg-[#e74c3c] hover:bg-[#c0392b] text-white py-3 px-8 rounded-lg text-lg font-medium transition">
              View More
            </button>
          </Link>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <img src={reviewImg1} alt="User Review" className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800 text-lg md:text-xl">Sushma R., Pokhara</h3>
                <FontAwesomeIcon icon={faQuoteLeft} size="lg" className="text-slate-400" />
              </div>
              <p className="text-slate-600 leading-relaxed">
                "TrekMate made my solo trek feel like a guided adventure. The AI suggestions and weather updates were spot-on!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TrekMate?</h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            TrekMate is your ultimate adventure companion. Smarter, safer, and more memorable trekking for every explorer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "01 Budget-Friendly",
            "02 Flexible Itineraries",
            "03 Safety Comes First",
            "04 24/7 Support",
          ].map((title, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-[#e74c3c] font-bold text-xl mb-2">{title}</h3>
              <p className="text-slate-600">
                {i === 0 && "Top-notch services at affordable prices based on your requirements."}
                {i === 1 && "Customize your itinerary to match your interests, pace, and goals."}
                {i === 2 && "Features like SOS alerts, GPS tracking, and offline access ensure your protection."}
                {i === 3 && "Our team is available around the clock, from planning to on-trail assistance."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-slate-50 py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Let’s Stay Connected</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 text-slate-600 text-lg">
          <div className="flex items-center gap-3"><FontAwesomeIcon icon={faEnvelope} /> trekmate@gmail.com</div>
          <div className="flex items-center gap-3"><FontAwesomeIcon icon={faPhone} /> 9812345678</div>
          <div className="flex items-center gap-3"><FontAwesomeIcon icon={faMapMarkerAlt} /> Birtamode, Bargachi</div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
