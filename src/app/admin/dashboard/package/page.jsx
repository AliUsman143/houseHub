"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebarr";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Icons
const CubeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.6L1 8.5v7l11 5.9 11-5.9v-7L12 2.6zm0 2.22l8.82 4.78-8.82 4.78-8.82-4.78L12 4.82zM3 15.08V9.92l8 4.3v5.16L3 15.08zm18 0l-8 4.3v-5.16l8-4.3v5.16z" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export default function PackagesDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleAddPackage = () => {
    router.push("/admin/dashboard/addpackage");
  };

  return (
    <div className="flex min-h-screen bg-[#f3f3f3]">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        <style jsx>{`
          .package-card {
            background-color: #ffffff;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
          }
          .add-package-button {
            background-color: #ff8c00;
            transition: background-color 0.3s ease;
          }
          .add-package-button:hover {
            background-color: #e67a00;
          }
        `}</style>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Packages</h1>
          <div className="flex items-center space-x-6">
            {/* Notification Bell */}
            <div className="relative cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-500 hover:text-gray-700 transition-colors"
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
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 flex items-center justify-center text-white text-xs font-bold">
                !
              </span>
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

        {/* Add Package Card */}
        <div className="flex items-center justify-center">
          <div className="package-card p-8 sm:p-10 md:p-12 text-center w-full max-w-sm flex flex-col items-center">
            <div className="relative mb-6">
              <CubeIcon className="w-24 h-24 text-gray-300 mx-auto" />
              <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2 border-4 border-white shadow-md">
                <PlusIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Create Packages as per your requirement
            </p>
            <button
              onClick={handleAddPackage}
              className="add-package-button flex items-center justify-center px-8 py-4 text-white text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <PlusIcon className="w-6 h-6 mr-3" />
              Add Package
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
