import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import why_trekmate_img from "../assets/why-trekmate-img.svg";
import sos from "../assets/sos.svg";
import chatbot from "../assets/chatbot.svg";
import weatherimage from "../assets/weather-alerts.svg";
import reviewImg1 from "../assets/reviewAvatar1.svg";


import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About US</h1>
        <p>TrekMate – Your Smart Trekking Companion.</p>
      </section>

      <section className="why-trekmate-container">
        <div className="why-trekmate-image-conatiner">
          <img src={why_trekmate_img} />
        </div>
        <div className="why-trekmate-text">
          <h2>
            Why <span className="highlight">TrekMate</span>
          </h2>
          <p>
            <b>
              <strong>TrekMate</strong> - is your smart trekking companion.
            </b>
          </p>
          <p>
            <span className="highlight">TrekMate </span> is a powerful web
            application built to simplify and enhance your trekking experience.
            Whether you're planning your first hike or exploring remote trails,{" "}
            <span className="highlight">TrekMate</span> brings everything you
            need into one smart, easy-to-use platform. Our goal is to solve real
            problems trekkers face — from uncertain weather and lack of
            accommodation details to safety concerns in remote areas.
            <span className="highlight">TrekMate</span> connects you with local
            services, provides personalized recommendations, and keeps you
            informed at every step of your journey.
          </p>
          <b>
            <p>
              <span className="highlight">TrekMate</span> is more than just a
              planning tool — it’s your reliable digital partner for smart,
              secure, and memorable adventures.
            </p>
          </b>

          <b>
            <p>
              Plan better. Trek smarter. Stay safe. With{" "}
              <span className="highlight">TrekMate.</span>
            </p>
          </b>
        </div>
      </section>
      <div>
        <section className="sos-chatbot">
          <Link to="/error">
            <img src={chatbot} className="chatbot" />
          </Link>
          <br />
          <Link to="/emergencyAlert">
            <img src={sos} className="sos" />
          </Link>
          <Link to="/error">
            <img src={weatherimage} className="weather-alert" />
          </Link>
        </section>
      </div>

      <section className="features-aboutus">
        <h2>Navigate with these features:</h2>
        <ul>
          <li>
            <strong>01</strong> AI-based trekking assistance
          </li>
          <li>
            <strong>02</strong> Real-Time Weather Alerts
          </li>
          <li>
            <strong>03</strong> Emergency SOS with Real-Time GPS Sharing
          </li>
          <li>
            <strong>04</strong> Homestay Booking with Verified Listings
          </li>
          <li>
            <strong>05</strong> Photo-Based User Reviews
          </li>
        </ul>
      </section>

      <section className="testimonials">
        <div className="testimonials-container">
          <h2>
            What{" "}
            <span className="highlight">
              Our <br /> Travellers
            </span>{" "}
            Are Saying ?
          </h2>
          <p>
            At TrekMate, nothing matters more than the experiences of our users.
            Read their stories and see why TrekMate is the trusted companion for
            trekking enthusiasts across Nepal and beyond.
          </p>
          <Link to="/review">
            <button className="reviews-btn">View More</button>
          </Link>
        </div>

        <div className="testimonial">
          <div className="review-box-container">
            <img src={reviewImg1} />
            <div className="review-container">
              <div className="name-icon">
                <h3>Sushma R., Pokhara</h3>
                <span>
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    size="2x"
                    flip="horizontal"
                  />
                </span>
              </div>
              <p>
                "TrekMate made my solo trek feel like a guided adventure. The AI
                suggestions and weather updates were spot-on!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-text-container">
          <h2>Why Choose TrekMate ?</h2>
          <p>
            TrekMate isn't just a trekking app—it's your ultimate adventure
            companion, designed to make every step of your journey smarter,
            safer, and more memorable. Whether you’re a first-time trekker or a
            seasoned explorer, here’s why thousands choose TrekMate:
          </p>
        </div>

        <ul>
          <li className="budget-friendly">
            <h2>01</h2>
            <b>
              <p>Budget-Friendly</p>
            </b>
            <p>
              We provide every package with top-notch services at affordable
              prices based on your requirements.
            </p>
          </li>
          <li className="flexible-itineraries">
            <h2>02</h2>
            <b>
              <p>Flexible Itineraries</p>
            </b>
            <p>
              No two trekkers are the same—so why should your trek be? With
              TrekMate, you can customize your itinerary to match your
              interests, pace, and goals.
            </p>
          </li>
          <li className="safety-comes-first">
            <h2>03</h2>
            <b>
              <p>Safety Comes First</p>
            </b>
            <p>
              Stay protected with features like SOS alerts, GPS tracking, fall
              detection, and offline access. Even in remote areas, TrekMate has
              your back.
            </p>
          </li>
          <li className="support">
            <h2>04</h2>
            <b>
              <p>24/7 Support</p>
            </b>
            <p>
              We’re with you every step of the way. Whether you’re planning your
              trek or facing an issue on the trail, our support team is
              available 24/7.
            </p>
          </li>
        </ul>
      </section>

      <section className="contact-us">
        <h2>Let’s Stay Connected</h2>
        <div className="contact-info">
          <div>
            <FontAwesomeIcon icon={faEnvelope} /> trekmate@gmail.com
          </div>
          <div>
            <FontAwesomeIcon icon={faPhone} /> 9812345678
          </div>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Birtamode, Bargachi
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
