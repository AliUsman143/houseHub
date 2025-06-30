"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { FiSearch, FiLogOut, FiUser } from "react-icons/fi"; // Search icon
// import { FaUserCircle } from "react-icons/fa"; // Default user icon (optional)

const Header = ({ toggleSidebar, handleLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="bg-gray-50 shadow-md w-full flex flex-col md:flex-row items-center justify-between px-4 py-[18px] relative">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src="https://coaching.thimpress.com/wp-content/uploads/2023/07/coaching-logo-header.png"
          alt="Company Logo"
          className="w-32 h-10 ml-4"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-1 w-full md:w-96 mt-4 md:mt-0">
        {/* <FiSearch className="text-gray-400 mr-2" /> */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* User Profile & Menu Button */}
      <div className="flex items-center gap-4 mt-4 md:mt-0 relative">
        {/* Mobile Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/300"
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer border"
            onClick={toggleDropdown}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-lg z-50">
              <button
                onClick={() => router.push("/profile")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <FiUser className="text-gray-500" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <FiLogOut className="text-gray-500" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
