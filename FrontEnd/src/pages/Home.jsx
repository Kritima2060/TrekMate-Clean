import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import templeImage from "../assets/patan.svg";
import banner from "../assets/banner.svg";
import templeImage3 from "../assets/patan3.svg";
import abcImage from "../assets/ABC.svg";
import secDes from "../assets/des2.svg";
import ThirdDes from "../assets/ebc.svg";
import fourthDes from "../assets/des4.svg";
import why_trekmate_img from "../assets/why-trekmate-img.svg";
import reviewImg1 from "../assets/reviewAvatar1.svg";
import sos from "../assets/sos.svg";
import chatbot from "../assets/chatbot.svg";
import weatherimage from "../assets/weather-alerts.svg";

const HomePage = () => {
  return (
    <div className="bg-neutral-50 text-neutral-800 font-sans">
      
      <section className="hero flex flex-col md:flex-row items-center gap-12 py-16 px-6 max-w-7xl mb-32 mx-auto">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug">
            Let <span className="highlight">TrekMate</span> Guide You —<br />
            One Smart Step <span className="highlight">Closer to Nature</span>.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-neutral-700">
            <span className="highlight">TrekMate</span> simplifies trekking with AI assistance, real-time weather alerts, homestay bookings, reviews, and SOS features.
          </p>
          <Link to="/beginyourjourney">
            <button className="cursor-pointer h-12 px-6 bg-[#4A6C84] text-amber-50 hover:text-black hover:bg-amber-50 hover:border-2 hover:border-[#4A6C84] rounded-md text-lg font-semibold transition" title="Start exploring trekking destinations">
              Begin Your Journey
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 relative flex justify-center items-center gap-4">
          <div className="relative z-10">
            <img src={templeImage} alt="templeImage" className="rounded-xl shadow-lg w-full md:w-80" />
          </div>
          <div className="absolute right-0 top-12 flex flex-col gap-2">
            <img src={banner} alt="banner" className="rounded-xl w-48 shadow-md" />
            <img src={templeImage3} alt="templeImage3" className="rounded-xl w-48 shadow-md" />
          </div>
        </div>
      </section>

      <section
  id="always-on-left"
  className="fixed bottom-6 left-6 flex flex-col gap-4 z-50"
>
  <Link
    to="/error"
    className="cursor-pointer hover:scale-105 transition"
    title="Chatbot Assistance"
  >
    <img src={chatbot} alt="Chatbot" className="w-12 h-12 md:w-12 md:h-12" />
  </Link>
  <Link
    to="/emergencyalert"
    className="cursor-pointer hover:scale-105 transition"
    title="Emergency SOS"
  >
    <img src={sos} alt="SOS" className="w-12 h-12 md:w-12 md:h-12" />
  </Link>
  <Link
    to="/error"
    className="cursor-pointer hover:scale-105 transition"
    title="Weather Alerts"
  >
    <img
      src={weatherimage}
      alt="Weather Alert"
      className="w-12 h-12 md:w-12 md:h-12"
    />
  </Link>
</section>


      <section className="destinations py-16 px-6 max-w-7xl mb-32 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold">Top Destinations</h2>
          <Link to="/topdestination">
            <button className="cursor-pointer bg-[#4A6C84] text-amber-50 hover:text-black hover:bg-amber-50 hover:border-2 hover:border-[#4A6C84] rounded-md px-4 py-2 font-medium transition" title="See all trekking trips">
              See All Trips
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <div className="card cursor-pointer hover:shadow-lg transition rounded-xl overflow-hidden">
            <img src={abcImage} alt="Annapurna Base Camp" className="w-full h-80 object-cover"/>
            <span className="block p-2 text-center font-medium bg-white">{'Annapurna Base Camp Trek'}</span>
          </div>
          <div className="card cursor-pointer hover:shadow-lg transition rounded-xl overflow-hidden">
            <img src={secDes} alt="Everest Base Camp" className="w-full h-80 object-cover"/>
            <span className="block p-2 text-center font-medium bg-white">{'Everest Base Camp'}</span>
          </div>
          <div className="card cursor-pointer hover:shadow-lg transition rounded-xl overflow-hidden">
            <img src={ThirdDes} alt="Langtang Region" className="w-full h-80 object-cover"/>
            <span className="block p-2 text-center font-medium bg-white">{'Langtang Region Trekking'}</span>
          </div>
          <div className="card cursor-pointer hover:shadow-lg transition rounded-xl overflow-hidden">
            <img src={fourthDes} alt="Manaslu Region" className="w-full h-80 object-cover"/>
            <span className="block p-2 text-center font-medium bg-white">{'Manaslu Region Trekking'}</span>
          </div>
        </div>
      </section>

      <section className="why-trekmate py-16 px-6 bg-neutral-100 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <img src={why_trekmate_img} alt="Why TrekMate" className="rounded-xl  w-full" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Why <span className="highlight">TrekMate</span>
          </h2>
          <p className="text-neutral-700 leading-relaxed font-medium">
            <strong>TrekMate</strong> simplifies trekking by integrating weather alerts, accommodation details, and safety features into one intuitive platform.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            Plan better. Trek smarter. Stay safe. With <span className="highlight">TrekMate</span>.
          </p>
          <Link to="/aboutus">
            <button className="cursor-pointer h-12 px-6 bg-[#4A6C84] text-amber-50 hover:text-black hover:bg-amber-50 hover:border-2 hover:border-[#4A6C84] rounded-md text-lg font-semibold transition" title="Learn more about TrekMate">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      <section className="faq py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold">Any questions? We got you.</h2>
          <Link to="/faqs">
            <button className="cursor-pointer mt-4 bg-[#4A6C84] text-amber-50 hover:text-black hover:bg-amber-50 hover:border-2 hover:border-[#4A6C84] rounded-md px-4 py-2 font-medium transition" title="Read FAQs">
              Faq
            </button>
          </Link>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Got questions about <span className="highlight">TrekMate</span>? Our FAQs cover everything you need to know before your trek.
          </p>
        </div>
      </section>

      <section className="features py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Why Choose TrekMate?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
            <h3 className="text-indigo-600 text-2xl font-bold mb-3">01 Budget-Friendly</h3>
            <p className="text-neutral-700 leading-relaxed">Top-notch services at affordable prices based on your requirements.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
            <h3 className="text-indigo-600 text-2xl font-bold mb-3">02 Flexible Itineraries</h3>
            <p className="text-neutral-700 leading-relaxed">Customize your itinerary to match your interests, pace, and goals.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
            <h3 className="text-indigo-600 text-2xl font-bold mb-3">03 Safety Comes First</h3>
            <p className="text-neutral-700 leading-relaxed">SOS alerts, GPS tracking, fall detection, and offline access ensure safety everywhere.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
            <h3 className="text-indigo-600 text-2xl font-bold mb-3">04 24/7 Support</h3>
            <p className="text-neutral-700 leading-relaxed">Our support team is always available to help you before and during your trek.</p>
          </div>
        </div>
      </section>

      <section className="testimonials py-16 px-6 bg-neutral-100 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">
            What <span className="highlight">Our Travellers</span> Are Saying
          </h2>
          <p className="text-neutral-700 leading-relaxed mt-4">
            Nothing matters more than user experiences. Discover why trekkers trust TrekMate for safe and memorable adventures.
          </p>
          <Link to="/review">
            <button className="cursor-pointer mt-4 bg-[#4A6C84] text-amber-50 hover:text-black hover:bg-amber-50 hover:border-2 hover:border-[#4A6C84] rounded-md px-6 py-3 font-semibold transition" title="Read more reviews">
              View More
            </button>
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer max-w-3xl">
            <img src={reviewImg1} alt="User Review" className="w-20 h-20 rounded-full object-cover"/>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-neutral-900 text-lg md:text-xl">Sushma R., Pokhara</h3>
                <FontAwesomeIcon icon={faQuoteLeft} size="2x" flip="horizontal" className="text-neutral-400"/>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                "TrekMate made my solo trek feel like a guided adventure. The AI suggestions and weather updates were spot-on!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-container py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Let’s Stay Connected</h2>
        <p className="text-neutral-700 leading-relaxed mb-6">
          Have a question about trekking routes, trip planning, or TrekMate features? Our team is here to help you navigate your journey—on and off the trail.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8 text-neutral-700 font-medium">
          <p>Email: trekmate@gmail.com</p>
          <p>Phone: 9812345678</p>
          <p>Address: Biratnagar, Baragachi</p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;