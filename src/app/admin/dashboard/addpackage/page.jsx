"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebarr";
import Link from "next/link";

const BellIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);



const CreatePackagesPage = () => {
  const [basicTagline, setBasicTagline] = useState("");
  const [basicPrice, setBasicPrice] = useState("");
  const [basicPropertyCount, setBasicPropertyCount] = useState("");
  const [isSidebarOpen] = useState(true);

  const handleSave = () => {
    alert(
      `Save clicked!\nTagline: ${basicTagline}\nPrice: ${basicPrice}\nProperties: ${basicPropertyCount}`
    );
  };

  const handleCancel = () => {
    setBasicTagline("");
    setBasicPrice("");
    setBasicPropertyCount("");
    alert("Form cleared!");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Left */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Right Content */}
      <div className="flex-1 px-6 py-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer">
              <BellIcon className="h-7 w-7 text-gray-500 hover:text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full" />
            </div>
             {/* User Avatar */}
            <Link href="/admin/dashboard/profilepage">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src="https://placehold.co/40x40/cccccc/ffffff?text=U"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Page Heading */}
        <div className="bg-white text-center rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-5xl font-bold mb-2 text-[#002f86]">Create Packages</h2>
            <p className="text-gray-500 text-sm">
              Set the prices as per your requirement
            </p>
          </div>

          {/* 3-Column Grid for Package Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Basic", "Standard", "Premium"].map((label, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl">
                <div className="bg-[#f57c00] border rounded-2xl text-white text-center py-3 font-bold">
                  {label}
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Count
                    </label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select count</option>
                      <option value="5">Up to 5</option>
                      <option value="20">Up to 20</option>
                      <option value="100">Up to 100</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 px-10 font-bold py-2 text-sm rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-[#f57c00] text-white px-10 font-bold py-2 text-sm rounded hover:bg-[#003c99]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePackagesPage;
