import "../App.css";
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

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const HomePage  = () => {
  return (
    <>
      <section className="hero flex flex-col ">
        <div class="flex justify-evenly">       
        <div className="hero-text">
          <h1>
            Let <span className="highlight">TrekMate</span> Guide You —<br />
            One Smart Step{" "}
            <span className="highlight">
              Closer to
              <br /> Nature
            </span>
            .
          </h1>
          <p>
            <span className="highlight">Trekking</span> is the art of exploring
            nature on foot — through mountains, forests, and rugged trails — one
            step at a time. It’s a journey that blends adventure with
            mindfulness, offering a deeper connection to the natural world while
            challenging your body and refreshing your spirit.
          </p>
          <p>
            <span className="highlight"> TrekMate </span>
            is a comprehensive trekking web application designed to simplify and
            enrich the trekking experience by offering AI based assistance,
            real-time weather alerts, homestay booking, photo-based reviews, and
            emergency SOS features.
          </p>
      <Link to="/beginyourjourney">
        <button className="hover:cursor-pointer h-12 text-amber-50 hover:text-black bg-[#4A6C84] rounded-md hover:bg-amber-50  hover:border-2 w-40">Begin Your Journey</button>
      </Link>
        </div>
        <div className="hero-images">
          <div className="heroImage1_container">
            <img src={templeImage} alt="templeImage" className="hero_img1" />
          </div>
          <div className="heroImage2_container">
            <img src={banner} alt="templeimage2" className="hero_img2" />
            <img src={templeImage3} alt="templeimage3" className="hero_img3" />
          </div>
        </div>
        </div>
      </section>
      <section className="sos-chatbot">
        <Link to="/error">
        <img src={chatbot} className="chatbot" />
        </Link>
        <br />
        <Link to="/emergencyalert">
          <img src={sos} className="sos" />
        </Link>
        <Link to="/error">
        <img src={weatherimage} className="weather-alert"/>
        </Link>
      </section>
      <section className="destinations">
        <div className="destination_container">
          <h2>Top Destinations</h2>
          <Link to="/topdestination">
            <button className="see-all">See All Trips</button>
          </Link>
        </div>
        <div className="cards">
          <div className="card">
            <img src={abcImage} alt="annpurnabasecamp" />
            <span> Annapurna Base Camp Trek</span>
          </div>
          <div className="card">
            <img src={secDes} alt="EverestBaseCamp" />
            <span>Everest Base Camp</span>
          </div>
          <div className="card">
            <img src={ThirdDes} alt="EverestBaseCamp" />
            <span>Langtang Region Trekking</span>
          </div>
          <div className="card">
            <img src={fourthDes} alt="EverestBaseCamp" />
            <span>Manaslu Region Trekking</span>
          </div>
        </div>
      </section>

      <section className="why-trekmate">
        <div className="w-full">
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
              Plan better. Trek smarter. Stay safe. With{" "}
              <span className="highlight">TrekMate.</span>
            </p>
          </b>
      <Link to="/aboutus">
        <button className="hover:cursor-pointer h-12 text-amber-50 hover:text-black bg-[#4A6C84] rounded-md hover:bg-amber-50 hover:border-[#4A6C84] hover:border-2 w-40">Learn More</button>
      </Link>
        </div>
      </section>

      <section className="faq">
        <div className="faq_container">
          <b>
            <h2>
              Any questions?
              <br /> We got you.
            </h2>
      <Link to="/faqs">
        <button className="hover:cursor-pointer h-12 text-amber-50 hover:text-black bg-[#4A6C84] rounded-md hover:bg-amber-50 hover:border-[#4A6C84] hover:border-2 w-40">Faq</button>
      </Link>
          </b>
          
          <p>
            Got questions about <span className="highlight">TrekMate</span>?
            You’re in the right place. Whether you're planning your first hike
            or heading off-grid, our FAQs cover everything you need to know.
          </p>
          
        </div>
        <div className="faq-que-container">
          <div>
            <p>What is TrekMate all about?</p>
            <span>+</span>
          </div>

          <div>
            <p>Is TrekMate free to use?</p>
            <span>+</span>
          </div>
          <div>
            <p>How does the SOS feature work?</p>
            <span>+</span>
          </div>
          <div>
            <p>Is TrekMate safe for solo travelers?</p>
            <span>+</span>
          </div>

          <div>
            <p>Is TrekMate safe for solo travelers?</p>
            <span>+</span>
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

      <section className="contact-container">
        <h2>Let’s Stay Connected</h2>
        <p>Have a question about trekking routes, trip planning, or using TrekMate features? Our team is here to help you navigate your journey—on and off the trail. Whether you're a trekker, guide, or just curious, feel free to reach out.
Drop us a message anytime. We’d love to hear from you!</p>
        <div className="contact-details">
          <p>Email: trekmate@gmail.com</p>
          <p>Phone: 9812345678</p>
          <p>Address: Biratnagar, Baragachi</p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
