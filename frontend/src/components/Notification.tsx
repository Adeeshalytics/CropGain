// components/NotificationDropdown.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="p-2 text-gray-600 hover:text-gray-800"
      >
        <FontAwesomeIcon icon={faBell} size="lg" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4">
          <h3 className="font-semibold text-gray-700">Notifications</h3>
          <ul className="mt-2">
            {/* Example notifications; replace these with your dynamic data */}
            <li className="p-2 text-gray-600 border-b border-gray-200">
              No new notifications
            </li>
            <li className="p-2 text-gray-600">You have a new message</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
