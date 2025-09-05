import TrekLogo from "../assets/logo.svg";
import footerImage from "../assets/footerimg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

import "../App.css";

const Footer = () => {
  return (
    <>
    <img src={footerImage} className="footer-image"/>
      <footer className="footer">
        <div className="footer-left">
          <div className="logo">
            <img src={TrekLogo} />
          </div>
          <p>
            Smart trekking with AI, weather alerts,
            <br /> bookings & SOS.
          </p>
            <div className="footer-icon">
              <FontAwesomeIcon icon={faSquareFacebook} />
              <FontAwesomeIcon icon={faSquareTwitter} />
              <FontAwesomeIcon icon={faSquareInstagram} />
            </div>
        </div>
        <div className="footer-links">
          <div className="company">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Why choose TrekMate</a>
            <a href="#">Client Reviews</a>
          </div>
          <div className="top-des">
            <h4>Top Destinations</h4>
            <a href="#">Annapurna</a>
            <a href="#">Everest</a>
            <a href="#">Langtang</a>
            <a href="#">Manaslu</a>
          </div>
          <div className="need-help">
            <h4>Need Help?</h4>
            <a href="#">FAQs</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
        <div className="privacy-policy">
            <p>Copyright © 2025 All rights reserved</p>
            <div className="privacy-policy-terms">

            <p>Privacy Policy</p><p>|</p>
            <p>Terms and Conditions</p>
            </div>
        </div>
    </>
  );
};

export default Footer;
