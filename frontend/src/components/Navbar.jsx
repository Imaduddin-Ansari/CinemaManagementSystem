import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ChevronDown, Search } from "lucide-react";
import axios from "axios";

export const Navbar = ({ userName, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate(); // For navigation after search

  const handleMenuToggle = () => setIsMenuOpen((prevState) => !prevState);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
      navigate(`/search?query=${searchTerm}`); // Navigate to search page with query
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      handleSearchClick();
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/logout");
      if (response.data.success) {
        // Redirect to home or login page
        navigate("/");
        alert("Successfully Logged Out")
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-transparent text-white z-50 font-poppins">
      <div className="flex flex-col items-center gap-4 px-6 py-4 md:flex-row md:justify-between md:items-center md:px-10">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-red-500 tracking-wider">
          <Link to="/user-dashboard" className="no-underline text-red-500">
            CINEMOVIE
          </Link>
        </h1>

        {/* Search and Menu */}
        <div className="flex flex-row w-full gap-4 md:flex-row md:gap-6 md:w-auto md:justify-end">
          {/* Search Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`transition-all duration-300 bg-transparent border-b-2 border-white focus:border-red-500 text-white text-lg focus:outline-none ${
                isSearchExpanded ? "w-full opacity-100 visible" : "w-0 opacity-0 invisible"
              }`}
            />
            <button
              onClick={toggleSearch}
              className="text-white hover:bg-white/10 rounded-full p-3 transition text-xl"
            >
              <Search />
            </button>
          </div>

          {/* User Name and Profile */}
          <div className="flex items-center justify-end gap-4">
            <span className="hidden text-lg font-semibold md:block"></span>
            <button
              onClick={handleMenuToggle}
              className="flex items-center text-white space-x-2 text-xl"
            >
              <User size={28} />
              <ChevronDown size={24} />
            </button>
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="absolute md:top-14 top-28 right-6 bg-black text-white rounded-lg shadow-lg w-48"
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <Link
                  to="/user-profile"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  My Profile
                </Link>
                <Link
                  to="/user-bookings"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  My Bookings
                </Link>
                <Link
                  to="/user-reviews"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  My Reviews
                </Link>
                <Link
                  to="/user-wishlist"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  My Wishlist
                </Link>
                <button
                  onClick={logoutUser} // Trigger logout
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
