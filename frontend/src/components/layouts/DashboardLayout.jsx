import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children ? children : <Outlet />}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;