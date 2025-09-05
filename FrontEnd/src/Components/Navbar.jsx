import trekImage from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const homeStyle = {
    color: isHovered ? "#4A6C84" : "black",
  };

  return (
    <header className="header h-18">
      <div className="logo " class="hover:cursor-pointer  w-50" >
        <a href="/">
        <img src={trekImage} alt="logo" className="logo" />
        </a>
      </div>

        <div class="flex justify-evenly w-full">
          <Link
            to="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Home
          </Link>

          <Link to="/aboutus">
            About Us
          </Link>
          <Link to="/error">
            <a href="faqs" >
              FAQs
            </a>
          </Link>
          <Link to="/error">
          <a href="contactus" >
            Contact us
          </a>
          </Link>
        </div>
        <Link to="/login">
          <button className="login">Login</button>
        </Link>
    </header>
  );
}

export default Navbar;
