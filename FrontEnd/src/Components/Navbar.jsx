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
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <header className="bg-white/40 backdrop-blur-sm border border-zinc-200/50 rounded-2xl px-6 py-3 shadow-xl flex items-center gap-6 min-w-max">

        <div className="flex items-center cursor-pointer">
          <Link to="/" className="hover:scale-110 transition-transform duration-200">
            <img src={trekImage} alt="TrekMate Logo" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 font-medium text-gray-700">
          <Link 
            to="/" 
            className="hover:text-zinc-600 hover:scale-105 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-blue-50/50"
          >
            Home
          </Link>
          <Link 
            to="/aboutus" 
            className="hover:text-zinc-600 hover:scale-105 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-blue-50/50"
          >
            About Us
          </Link>
          <Link 
            to="/faqs" 
            className="hover:text-zinc-600 hover:scale-105 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-blue-50/50"
          >
            FAQs
          </Link>
          <Link 
            to="/contactus" 
            className="hover:text-zinc-600 hover:scale-105 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-blue-50/50"
          >
            Contact Us
          </Link>
        </nav>

        {/* User / Login Dropdown */}
        <div className="relative">
          <button
            className="px-4 py-2 hover:cursor-pointer bg-gray-100/80 backdrop-blur-sm font-medium hover:bg-gray-200/80 hover:scale-105 transition-all duration-200 rounded-xl border border-gray-200/50 shadow-sm"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user ? user.fullName : "Login"}
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-2xl flex flex-col overflow-hidden">
              {user ? (
                <>
                  <Link
                    to="/settings"
                    className="px-4 py-3 hover:bg-blue-50/70 transition-colors duration-200 text-gray-700 hover:text-blue-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-left hover:bg-red-50/70 transition-colors duration-200 text-gray-700 hover:text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-blue-50/70 transition-colors duration-200 text-gray-700 hover:text-blue-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button (Optional) */}
        <button className="md:hidden p-2 hover:bg-gray-100/50 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
    </div>
  );
};

export default Navbar;