// src/app/Dashboard/layout.tsx

"use client"; // Add this line

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface DashboardLayoutProps {
  children: ReactNode; // Specify the type of children prop
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-green-900 text-white">
        <div className="p-6 text-5xl font-bold">CropGain</div>
        <nav className="space-y-4 text-2xl mt-6">
          <Link
            href="/dashboard"
            className="block py-2 px-6 hover:bg-green-700"
          >
            Dashboard
          </Link>

          <div className="relative">
            <div
              className="py-2 px-6 hover:bg-green-700 cursor-pointer flex items-center"
              onClick={toggleDropdown}
            >
              <span>Sections</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="ml-6 text-sm w-4 h-4"
              />
            </div>
            <div
              className={`bg-green-800 text-white w-full mt-1 space-y-2 transition-all duration-300 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <Link
                href="/section1"
                className="block py-2 px-6 hover:bg-green-700"
              >
                Section 1
              </Link>
              <Link
                href="/section2"
                className="block py-2 px-6 hover:bg-green-700"
              >
                Section 2
              </Link>
              <Link
                href="/section3"
                className="block py-2 px-6 hover:bg-green-700"
              >
                Section 3
              </Link>
              <Link
                href="/section4"
                className="block py-2 px-6 hover:bg-green-700"
              >
                Section 4
              </Link>
            </div>
          </div>

          <Link href="/plants" className="block py-2 px-6 hover:bg-green-700">
            Plants
          </Link>
          <Link
            href="/dashboard/expense-management"
            className="block py-2 px-6 hover:bg-green-700"
          >
            Expense Management
          </Link>
          <Link
            href="/dashboard/income-management"
            className="block py-2 px-6 hover:bg-green-700"
          >
            Income Management
          </Link>
          <Link
            href="/financial-reports"
            className="block py-2 px-6 hover:bg-green-700"
          >
            Financial Reports
          </Link>
          <Link
            href="/inventory"
            className="block py-2 px-6 hover:bg-green-700"
          >
            Inventory
          </Link>
          <Link
            href="/analytics"
            className="block py-2 px-6 hover:bg-green-700"
          >
            Analytics and Insights
          </Link>
          <Link href="/settings" className="block py-2 px-6 hover:bg-green-700">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  );
}
