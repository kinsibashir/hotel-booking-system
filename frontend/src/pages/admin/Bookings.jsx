import React from "react";

const Bookings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Booking Management
      </h1>

      <div className="bg-white rounded-xl shadow p-8">
        <p className="text-gray-500">
          No bookings available.
        </p>
      </div>
    </div>
  );
};

export default Bookings;