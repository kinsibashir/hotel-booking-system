import React from "react";
import { useNavigate } from "react-router-dom";

const BookingTable = ({ bookings = [] }) => {
  const navigate = useNavigate();

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No bookings found
        </h2>

        <p className="text-gray-500 mt-2">
          You haven't booked any hotels yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-emerald-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Hotel</th>
            <th className="px-6 py-4 text-left">Check In</th>
            <th className="px-6 py-4 text-left">Check Out</th>
            <th className="px-6 py-4 text-left">Guests</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Total</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                {booking.hotel?.name}
              </td>

              <td className="px-6 py-4">
                {booking.check_in}
              </td>

              <td className="px-6 py-4">
                {booking.check_out}
              </td>

              <td className="px-6 py-4">
                {booking.guests}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {booking.status}
                </span>
              </td>

              <td className="px-6 py-4">
                KSh {booking.total_price}
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() =>
                    navigate(`/dashboard/bookings/${booking.id}`)
                  }
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;