"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBoxOpen, FaUsers } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, handleLogout }) => {
  const pathname = usePathname();

  return (
    <aside
      id="househub-sidebar"
      className={`fixed top-0 left-0 z-40 h-screen bg-[#002f86] text-white shadow-lg transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        w-64 
        lg:translate-x-0 lg:relative lg:w-56 flex flex-col`}
      aria-label="Sidebar"
    >
      {/* Logo */}
      <div className="flex flex-col items-center justify-center px-4 pt-4">
        <img src="/admin/home.png" alt="HouseHub365" className="h-28 mb-2" />
      </div>

      {/* Menu */}
      <div className="px-4 flex-1 flex flex-col">
        <ul className="space-y-2 text-sm font-medium flex-1">
          {/* Packages */}
          <li>
            <Link
              href="/admin/dashboard/package"
              className={`flex items-center p-2 rounded-md transition
                ${
                  pathname === "/admin/dashboard/package"
                    ? "bg-[#ff9800] text-white"
                    : "hover:bg-[#f57c00]"
                }`}
            >
              <FaBoxOpen className="w-5 h-5 mr-3" />
              <span>Packages</span>
            </Link>
          </li>

          {/* Users */}
          <li>
            <Link
              href="/admin/dashboard/users"
              className={`flex items-center p-2 rounded-md transition
                ${
                  pathname === "/admin/dashboard/users"
                    ? "bg-[#ff9800] text-white"
                    : "hover:bg-[#003c99]"
                }`}
            >
              <FaUsers className="w-5 h-5 mr-3" />
              <span>Users</span>
            </Link>
          </li>

          {/* Divider */}
          <li>
            <hr className="border-t border-white/30 my-4" />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
