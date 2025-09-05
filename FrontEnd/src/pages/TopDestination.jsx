import destinationImage1 from "../assets/des_img1.svg";
import destinationImage2 from "../assets/des_img2.svg";
import desImage3 from "../assets/des_img3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import reviewImg1 from "../assets/reviewAvatar1.svg";
import { Link } from "react-router-dom";

import "../App.css";

const TopDestination = () => {
  return (
    <>
      <div className="Top-destination-container">
        <section className="TopDestination-hero">
          <h1>Top Destinations</h1>
          <p>TrekMate – Your Smart Trekking Companion.</p>
        </section>
        <div className="destination-img-container">
          <Link to="/error">
            <div className="destination-images">
              <img src={destinationImage1} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Annapurna Base Camp Trek</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/error">
            <div className="destination-images">
              <img src={destinationImage2} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Everest Base Camp</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/error">
            <div className="destination-images">
              <img src={desImage3} alt="Annapurna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Langtang Region Trekking</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <Link to="/error">
          <div className="destination-img-container">
            <div className="destination-images">
              <img src={destinationImage1} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Annapurna Base Camp Trek</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="destination-images">
              <img src={destinationImage2} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Everest Base Camp</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="destination-images">
              <img src={desImage3} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Langtang Region Trekking</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/error">
          <div className="destination-img-container">
            <div className="destination-images">
              <img src={destinationImage1} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Annapurna Base Camp Trek</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="destination-images">
              <img src={destinationImage2} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Everest Base Camp</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="destination-images">
              <img src={desImage3} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Langtang Region Trekking</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/error">
          <div className="destination-img-container">
            <div className="destination-images">
              <img src={destinationImage1} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Annapurna Base Camp Trek</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="destination-images">
              <img src={destinationImage2} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Everest Base Camp</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="destination-images">
              <img src={desImage3} alt="Annaourna Base Camp Trek" />
              <div className="annapurna-trip-duration">
                <b>
                  <span>Langtang Region Trekking</span>
                </b>
                <div className="trip-cost-duration">
                  <div className="trip-cost">
                    <p>Trip Cost</p>
                    <b>
                      <p>Rs. 126000</p>
                    </b>
                  </div>
                  <div className="duration">
                    <p>Duration</p>
                    <b>
                      <p>14 Days</p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
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
    </>
  );
};

export default TopDestination;
