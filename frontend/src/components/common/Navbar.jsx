import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHotel,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import authService from "../../services/authService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();

      setIsAuthenticated(authenticated);

      if (authenticated) {
        setUser(authService.getCurrentUser());
      } else {
        setUser(null);
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();

    setUser(null);
    setIsAuthenticated(false);

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    navigate("/hotels");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/hotels", label: "Hotels" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <FaHotel className="text-3xl text-emerald-600" />

            <h1 className="text-2xl font-bold text-gray-900">
              Stay<span className="text-emerald-600">Nest</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">

  {navLinks.map((link) => (
    <NavLink
      key={link.path}
      to={link.path}
      className={({ isActive }) =>
        `text-sm font-semibold transition-all duration-300 ${
          isActive
            ? "text-emerald-600 border-b-2 border-emerald-600 pb-1"
            : "text-gray-700 hover:text-emerald-600"
        }`
      }
    >
      {link.label}
    </NavLink>
  ))}

  <div className="flex items-center gap-4 ml-6">

    {isAuthenticated ? (
      <>
        <div className="flex items-center gap-2">

          <FaUserCircle className="text-2xl text-emerald-600" />

          <span className="font-medium text-gray-700">
            {user
              ? `${user.first_name} ${user.last_name}`
              : "User"}
          </span>

        </div>

        <NavLink
          to={user?.role === "admin" ? "/admin" : "/dashboard"}
          className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition"
        >
          {user?.role === "admin"
            ? "Admin Dashboard"
            : "Dashboard"}
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </>
    ) : (
      <>

        <NavLink
          to="/login"
          className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
        >
          Register
        </NavLink>

      </>
    )}

    <button
      onClick={handleBookNow}
      className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
    >
      Book Now
    </button>

  </div>

</div>

{/* Mobile Menu Button */}

<button
  onClick={() => setIsOpen(!isOpen)}
  className="lg:hidden text-2xl text-gray-800"
>
  {isOpen ? <FaTimes /> : <FaBars />}
</button>

</div>
</div>
      {/* Mobile Navigation */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-xl overflow-hidden"
          >
            <div className="container-custom py-6 space-y-4">

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 text-lg font-medium ${
                      isActive
                        ? "text-emerald-600"
                        : "text-gray-700 hover:text-emerald-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="border-t pt-5 space-y-3">

                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3">

                      <FaUserCircle className="text-3xl text-emerald-600" />

                      <div>
                        <p className="font-semibold text-gray-900">
                          {user
                            ? `${user.first_name} ${user.last_name}`
                            : "User"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {user?.email}
                        </p>

                        <p className="text-xs text-emerald-600 capitalize">
                          {user?.role}
                        </p>
                      </div>

                    </div>

                    <NavLink
                      to={user?.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-lg font-medium text-gray-700 hover:text-emerald-600"
                    >
                      {user?.role === "admin"
                        ? "Admin Dashboard"
                        : "Dashboard"}
                    </NavLink>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full py-3 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
                    >
                      Logout
                    </button>

                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-lg font-medium text-gray-700 hover:text-emerald-600"
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-lg font-medium text-gray-700 hover:text-emerald-600"
                    >
                      Register
                    </NavLink>
                  </>
                )}

                <button
                  onClick={() => {
                    handleBookNow();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                >
                  Book Now
                </button>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;