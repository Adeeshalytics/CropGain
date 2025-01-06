"use client";

import React, { ReactNode } from "react";
import Link from "next/link";

interface coopStateLayoutProps {
  children: ReactNode;
}

export default function coopStateLayout({ children }: coopStateLayoutProps) {
  // Dummy data for crops

  return (
    <div className="h-screen flex bg-background font-roboto">
      {/* Left Sidebar */}
      <div className="w-1/5 bg-green-800 text-white h-full">
        <nav>
          <ul className="space-y-2 pl-4">
            <li>
              <Link
                href="/dashboard/Management/coop/cropManagement"
                className="cursor-pointer hover:text-gray-300 text-white font-semibold bg-green-700 rounded-md p-2 block"
              >
                Crop Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/Management/coop/landManagement"
                className="cursor-pointer hover:text-gray-300 p-2 rounded-md block"
              >
                Land Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/Management/coop/plantingGrowthTracking"
                className="cursor-pointer hover:text-gray-300 p-2 rounded-md block"
              >
                Planting & Growth Tracking
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/Management/coop/harvestManagement"
                className="cursor-pointer hover:text-gray-300 p-2 rounded-md block"
              >
                Harvest Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/Management/coop/fertilizationManagement"
                className="cursor-pointer hover:text-gray-300 p-2 rounded-md block"
              >
                Fertilization Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/Management/coop/laborManagement"
                className="cursor-pointer hover:text-gray-300 p-2 rounded-md block"
              >
                Labor Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/Management/coop/resourceManagement"
                className="cursor-pointer hover:text-gray-300 p-2 rounded-md block"
              >
                Resource Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/Management/coop/integrationCapabilities"
                className="cursor-pointer hover:text-gray-300 p-2 rounded-md block"
              >
                Integration Capabilities
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      {children}
    </div>
  );
}
