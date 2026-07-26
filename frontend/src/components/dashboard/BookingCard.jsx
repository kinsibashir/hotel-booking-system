import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">

      <div>
        <h3 className="font-semibold text-lg">
          {booking.hotel?.name}
        </h3>

        <p className="text-gray-500">
          {booking.check_in} → {booking.check_out}
        </p>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          booking.status === "confirmed"
            ? "bg-green-100 text-green-700"
            : booking.status === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : booking.status === "completed"
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {booking.status}
      </span>

    </div>
  );
};

export default BookingCard;