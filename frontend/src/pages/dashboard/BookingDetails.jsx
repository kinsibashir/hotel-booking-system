import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import api from "../../services/api";

const BookingDetails = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await api.get(`/bookings/${id}`);
      setBooking(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!booking) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Booking Details
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">

        <div>
          <strong>Hotel:</strong> {booking.hotel?.name}
        </div>

        <div>
          <strong>Check In:</strong> {booking.check_in}
        </div>

        <div>
          <strong>Check Out:</strong> {booking.check_out}
        </div>

        <div>
          <strong>Guests:</strong> {booking.guests}
        </div>

        <div>
          <strong>Status:</strong> {booking.status}
        </div>

        <div>
          <strong>Total Price:</strong> KSh {booking.total_price}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default BookingDetails;