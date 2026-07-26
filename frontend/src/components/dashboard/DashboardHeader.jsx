import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import authService from "../../services/authService";

const DashboardHeader = () => {
  const user = authService.getCurrentUser();

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-white shadow-sm px-8 py-5 flex items-center justify-between rounded-xl mb-6">

      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome back,
          <span className="text-emerald-600">
            {" "}
            {user?.first_name || "Guest"} 👋
          </span>
        </h2>

        <p className="text-gray-500 mt-1">
          {today}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative text-gray-600 hover:text-emerald-600 transition">

          <FaBell className="text-2xl" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
            3
          </span>

        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-emerald-600" />

          <div>
            <h3 className="font-semibold text-gray-800">
              {user?.first_name} {user?.last_name}
            </h3>

            <p className="text-sm text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default DashboardHeader;