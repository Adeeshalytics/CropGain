// "use client";

// import React, { ReactNode, useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell, faCog, faCalendar } from "@fortawesome/free-solid-svg-icons";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "@/app/globals.css";

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const router = useRouter();
//   const [isCalendarOpen, setCalendarOpen] = useState(false);
//   const [isNotificationsOpen, setNotificationsOpen] = useState(false);
//   const calendarRef = useRef<HTMLDivElement | null>(null);
//   const notificationsRef = useRef<HTMLDivElement | null>(null);
//   const [date, setDate] = useState(new Date());

//   const toggleCalendar = () => setCalendarOpen((prev) => !prev);
//   const toggleNotifications = () => setNotificationsOpen((prev) => !prev);

//   const handleDateClick = (selectedDate: Date) => {
//     const localDate = new Date(
//       selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
//     );
//     const formattedDate = localDate.toISOString().split("T")[0];
//     router.push(`/add-event?date=${formattedDate}`);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         calendarRef.current &&
//         !calendarRef.current.contains(event.target as Node)
//       ) {
//         setCalendarOpen(false);
//       }
//       if (
//         notificationsRef.current &&
//         !notificationsRef.current.contains(event.target as Node)
//       ) {
//         setNotificationsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="w-full bg-green-700 text-white p-4">
//         <div className="flex justify-between items-center">
//           <div className="text-3xl font-bold">CropGain</div>
//           <nav className="flex space-x-10 text-xl mr-4">
//             <Link href="/dashboard" className="hover:text-green-300">
//               Dashboard
//             </Link>
//             <Link href="/dashboard/Accounts" className="hover:text-green-300">
//               Accounts
//             </Link>
//             <Link href="/dashboard/Management" className="hover:text-green-300">
//               Management
//             </Link>
//             <button
//               onClick={toggleCalendar}
//               aria-label="Toggle calendar"
//               className="hover:text-green-300"
//             >
//               <FontAwesomeIcon icon={faCalendar} />
//             </button>

//             <button
//               onClick={toggleNotifications}
//               aria-label="Toggle notifications"
//               className="hover:text-green-300 relative"
//             >
//               <FontAwesomeIcon icon={faBell} />
//             </button>

//             <Link href="/settings" className="hover:text-green-300">
//               <FontAwesomeIcon icon={faCog} />
//             </Link>

//             <button
//               aria-label=""
//               className="bg-yellow-400 rounded-full"
//             ></button>
//           </nav>
//         </div>
//       </header>

//       <main className="flex-1 p-6 bg-white relative">
//         {children}
//         {isCalendarOpen && (
//           <div
//             ref={calendarRef}
//             className="absolute top-10 right-10 bg-white shadow-lg rounded-lg p-4 z-10 -mt-4"
//             style={{ width: "450px" }}
//           >
//             <Calendar onChange={handleDateClick} value={date} />
//           </div>
//         )}

// Gayan Shaminda, [11/5/2024 1:10 PM]
// {isNotificationsOpen && (
//           <div
//             ref={notificationsRef}
//             className="absolute top-10 right-10 bg-white shadow-lg rounded-lg p-4 w-64 z-10"
//             style={{ width: "400px" }}
//           >
//             <h3 className="text-lg font-semibold text-center">Notifications</h3>
//             <ul className="mt-2 space-y-2">
//               <li className="p-2 text-green-800 border-b border-gray-200 text-center">
//                 No new notifications
//               </li>
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faCalendar,
  faUserCircle, // Importing the user profile icon
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/app/globals.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const [date, setDate] = useState(new Date());

  const toggleCalendar = () => setCalendarOpen((prev) => !prev);
  const toggleNotifications = () => setNotificationsOpen((prev) => !prev);

  const handleDateClick = (selectedDate: Date) => {
    const localDate = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    );
    const formattedDate = localDate.toISOString().split("T")[0];
    router.push(`/add-event?date=${formattedDate}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full bg-green-700 text-white p-4">
        <div className="flex justify-between items-center">
          {/* Logo or Site Title */}
          <div className="text-3xl font-bold">CropGain</div>

          {/* Navigation Links and Icons */}
          <nav className="flex space-x-10 text-xl mr-4 items-center">
            <Link href="/dashboard" className="hover:text-green-300">
              Dashboard
            </Link>
            <Link href="/dashboard/Accounts" className="hover:text-green-300">
              Accounts
            </Link>
            <Link href="/dashboard/Management" className="hover:text-green-300">
              Management
            </Link>

            {/* Calendar Button */}
            <button
              onClick={toggleCalendar}
              aria-label="Toggle calendar"
              className="hover:text-green-300 focus:outline-none"
            >
              <FontAwesomeIcon icon={faCalendar} />
            </button>

            {/* Notifications Button */}
            <button
              onClick={toggleNotifications}
              aria-label="Toggle notifications"
              className="hover:text-green-300 relative focus:outline-none"
            >
              <FontAwesomeIcon icon={faBell} />
            </button>

            {/* Settings Link */}
            <Link href="/settings" className="hover:text-green-300">
              <FontAwesomeIcon icon={faCog} />
            </Link>

            {/* User Profile Icon */}
            <div className="relative">
              <Link href="/dashboard/User/profile" aria-label="User Profile">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="lg"
                  className="h-8 w-8 hover:text-green-300"
                />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white relative">
        {children}

        {/* Calendar Dropdown */}
        {isCalendarOpen && (
          <div
            ref={calendarRef}
            className="absolute top-16 right-10 bg-white shadow-lg rounded-lg p-4 z-10"
            style={{ width: "450px" }}
          >
            <Calendar onChange={handleDateClick} value={date} />
          </div>
        )}

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div
            ref={notificationsRef}
            className="absolute top-16 right-10 bg-white shadow-lg rounded-lg p-4 w-64 z-10"
            style={{ width: "400px" }}
          >
            <h3 className="text-lg font-semibold text-center">Notifications</h3>
            <ul className="mt-2 space-y-2">
              <li className="p-2 text-green-800 border-b border-gray-200 text-center">
                No new notifications
              </li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
