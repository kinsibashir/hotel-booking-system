import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import BookingTable from "../../components/dashboard/BookingTable";

const MyBookings = () => {

  const bookings = [
    {
      id: 1,
      hotel_name: "Ocean Paradise Resort",
      check_in: "10 Aug 2026",
      check_out: "14 Aug 2026",
      status: "Confirmed",
    },
    {
      id: 2,
      hotel_name: "Mountain View Lodge",
      check_in: "20 Sep 2026",
      check_out: "23 Sep 2026",
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">

        My Bookings

      </h1>

      <BookingTable bookings={bookings} />

    </DashboardLayout>
  );
};

export default MyBookings;