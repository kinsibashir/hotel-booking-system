import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import BookingCard from "../../components/dashboard/BookingCard";
import authService from "../../services/authService";
import api from "../../services/api";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const user = authService.getCurrentUser();

      const response = await api.get(`/bookings/user/${user.id}`);

      setBookings(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back,
          {" "}
          {authService.getCurrentUser()?.first_name}
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your bookings and profile.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <StatCard
              title="Total Bookings"
              value={bookings.length}
            />

            <StatCard
              title="Upcoming"
              value={upcomingBookings.length}
            />

            <StatCard
              title="Completed"
              value={completedBookings.length}
            />

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-5">
              Recent Bookings
            </h2>

            {bookings.length === 0 ? (
              <p className="text-gray-500">
                You haven't made any bookings yet.
              </p>
            ) : (
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;