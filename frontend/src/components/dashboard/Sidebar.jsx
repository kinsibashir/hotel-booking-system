import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHotel,
  FaCalendarCheck,
  FaUser,
  FaStar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import authService from "../../services/authService";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
    },
    {
      name: "Hotels",
      icon: <FaHotel />,
      path: "/hotels",
    },
    {
      name: "My Bookings",
      icon: <FaCalendarCheck />,
      path: "/dashboard/bookings",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/dashboard/profile",
    },
    {
      name: "Reviews",
      icon: <FaStar />,
      path: "/dashboard/reviews",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="w-64 bg-emerald-700 text-white min-h-screen flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-emerald-600">
        <h1 className="text-3xl font-bold">
          Stay<span className="text-yellow-400">Nest</span>
        </h1>

        <p className="text-sm text-emerald-200 mt-1">
          User Dashboard
        </p>
      </div>

      {/* Menu */}

      <nav className="flex-1 p-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
                isActive
                  ? "bg-white text-emerald-700 font-semibold"
                  : "hover:bg-emerald-600"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-emerald-600">

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </div>
  );
};

export default Sidebar;