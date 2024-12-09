"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, ChevronDown, Search } from "lucide-react";

export const Navbar = ({ userName, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen((prevState) => !prevState);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      handleSearchClick();
    }
  };

  return (
    <div className=" top-0 left-0 w-full bg-transparent text-white z-50 font-poppins">
      <div className="flex flex-col items-center gap-4 px-6 py-4 md:flex-row md:justify-between md:items-center md:px-10">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-red-500 tracking-wider">
          <Link to="/employee-dashboard" className="no-underline text-red-500">
            CINEMOVIE
          </Link>
        </h1>

        {/* Search and Menu */}
        <div className="flex flex-row w-full gap-4 md:flex-row md:gap-6 md:w-auto md:justify-end">
       

          {/* User Name and Profile */}
          <div className="flex items-center justify-end gap-4">
            <span className="hidden text-lg font-semibold md:block">{userName}</span>
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
                className="absolute md:top-14 top-28 right-6 bg-black/90 text-white rounded-lg shadow-lg w-48"
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <Link
                  to="/employee-book"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  Booking Management
                </Link>
                <Link
                  to="/employee-support"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  Customer Support
                </Link>
                <Link
                  to="/employee-shift"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  Change Shift Request
                </Link>
                <Link
                  to="/employee-report"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  Report Generation
                </Link>
                <Link
                  to="/"
                  className="block px-5 py-3 text-lg hover:bg-red-500 hover:text-white"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
