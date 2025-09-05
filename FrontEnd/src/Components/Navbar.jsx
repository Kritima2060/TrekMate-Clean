import trekImage from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md w-full px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <Link to="/">
          <img src={trekImage} alt="TrekMate Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-8 font-medium text-gray-700">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/aboutus" className="hover:text-blue-600 transition">About Us</Link>
        <Link to="/faqs" className="hover:text-blue-600 transition">FAQs</Link>
        <Link to="/contactus" className="hover:text-blue-600 transition">Contact Us</Link>
      </nav>

      {/* User / Login Dropdown */}
      <div className="relative">
        <button
          className="px-4 py-2 bg-gray-200  font-medium hover:bg-gray-300 transition rounded-lg hover:cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user ? user.fullName : "Login"}
          
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg flex flex-col">
            {user ? (
              <>
                <Link
                  to="/settings"
                  className="px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left hover:bg-gray-100 transition hover:cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 hover:bg-gray-100 transition "
                onClick={() => setDropdownOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;