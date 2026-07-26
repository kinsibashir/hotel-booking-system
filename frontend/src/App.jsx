import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Public Pages
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Dashboard
import Dashboard from "./pages/dashboard/Dashboard";
import MyBookings from "./pages/dashboard/MyBookings";
import Profile from "./pages/dashboard/Profile";
import Reviews from "./pages/dashboard/Reviews";
import BookingDetails from "./pages/dashboard/BookingDetails";

// Admin
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHotels from "./pages/admin/Hotels";
import AdminBookings from "./pages/admin/Bookings";
import AdminUsers from "./pages/admin/Users";
import AdminReviews from "./pages/admin/Reviews";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================== */}

          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* =========================
              USER DASHBOARD
          ========================== */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/bookings" element={<MyBookings />} />
          <Route path="/dashboard/bookings/:id" element={<BookingDetails />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/reviews" element={<Reviews />} />

          {/* =========================
              ADMIN DASHBOARD
          ========================== */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>

        </Routes>
      </main>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#111827",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,.12)",
          },
        }}
      />
    </div>
  );
}

export default App;