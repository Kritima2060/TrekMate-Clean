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

import weatherimage from "../assets/weather-alerts.svg";

const HomePage = () => {
  return (
    <div className="bg-white text-slate-900 font-light">

      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-extralight leading-tight tracking-tight">
              Trek
              <br />
              <span className="font-light bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Smarter
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-md">
              AI-powered trekking companion with weather alerts, safety
              features, and curated experiences.
            </p>
            <Link to="/beginyourjourney">
              <button className="group relative overflow-hidden bg-slate-900 rounded-xl text-white px-8 py-4 text-lg font-light tracking-wide hover:bg-slate-800 transition-all duration-300 cursor-pointer">
                <span className="relative z-10">Begin Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-[3/3] overflow-hidden">
              {/* <img
                src={templeImage}
                alt="Mountain landscape"
                className="w-full  h-full object-cover absolute hover:red transition-all duration-700"
              /> */}
              <img
                src={templeImage3}
                alt="Mountain landscape"
                className="w-full left-1 h-full absolute object-cover "
              />
            </div>
          </div>
        </div>
      </section>


      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <Link
          to="/weather"
          className="w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 border border-slate-100 cursor-pointer"
          title="Weather Alerts"
        >
          <img
            src={weatherimage}
            alt="Weather Alert"
            className="w-12 h-12 md:w-12 md:h-12"
          />
        </Link>
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
        <button
          className="w-12 h-12 bg-red-500 shadow-lg hover:shadow-xl rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer"
          title="Emergency SOS"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>


      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
            Destinations
          </h2>
          <button className="text-slate-600 hover:text-slate-900 font-light tracking-wide border-b border-transparent hover:border-slate-300 transition-all cursor-pointer">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: abcImage, title: "Annapurna Base Camp" },
            { img: secDes, title: "Everest Base Camp" },
            { img: ThirdDes, title: "Langtang Valley" },
            { img: fourthDes, title: "Manaslu Circuit" },
          ].map((destination, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-4">
                <img
                  src={destination.img}
                  alt={destination.title}
                  className="w-full h-full object-cover  group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h3 className="font-light text-lg tracking-wide text-slate-700 group-hover:text-slate-900 transition-colors">
                {destination.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-center mb-20">
            Why TrekMate
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                number: "01",
                title: "AI Powered",
                desc: "Intelligent route suggestions and personalized recommendations.",
              },
              {
                number: "02",
                title: "Safety First",
                desc: "Real-time alerts, SOS features, and emergency assistance.",
              },
              {
                number: "03",
                title: "Weather Smart",
                desc: "Advanced weather monitoring and predictive alerts.",
              },
              {
                number: "04",
                title: "Always Connected",
                desc: "24/7 support and community-driven insights.",
              },
            ].map((feature, index) => (
              <div key={index} className="space-y-4">
                <div className="text-6xl font-extralight text-slate-200">
                  {feature.number}
                </div>
                <h3 className="text-xl font-light tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-8">
            Traveller Stories
          </h2>
          <button className="text-slate-600 hover:text-slate-900 font-light tracking-wide border-b border-transparent hover:border-slate-300 transition-all cursor-pointer">
            Read More →
          </button>
        </div>

        <div className="bg-white p-12 border border-slate-100 hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img
              src={reviewImg1}
              alt="Reviewer"
              className="w-16 h-16 rounded-full object-cover grayscale"
            />
            <div className="flex-1">
              <blockquote className="text-xl font-light leading-relaxed text-slate-700 mb-6">
                "TrekMate transformed my solo adventure into a guided
                experience. The AI insights and safety features gave me
                confidence to explore beyond my comfort zone."
              </blockquote>
              <cite className="text-sm font-light text-slate-500 tracking-wide">
                SUSHMA R., POKHARA
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-12">
            Let's Connect
          </h2>
          <p className="text-xl font-light text-slate-300 leading-relaxed mb-16 max-w-2xl mx-auto">
            Ready to embark on your next adventure? Get in touch and let
            TrekMate guide your journey.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-sm font-light text-slate-400 tracking-wide">
            <div>
              <div className="mb-2">EMAIL</div>
              <div className="text-white">trekmate@gmail.com</div>
            </div>
            <div>
              <div className="mb-2">PHONE</div>
              <div className="text-white">+977 981-234-5678</div>
            </div>
            <div>
              <div className="mb-2">LOCATION</div>
              <div className="text-white">Biratnagar, Nepal</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
