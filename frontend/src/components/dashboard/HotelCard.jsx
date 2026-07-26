import React from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-bold">
          {hotel.name}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <FaMapMarkerAlt />
          {hotel.location}
        </div>

        <div className="flex items-center gap-2 mt-2 text-yellow-500">
          <FaStar />
          {hotel.rating}
        </div>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-bold text-emerald-600">
            £{hotel.price}
            <span className="text-sm text-gray-500">
              /night
            </span>
          </span>

          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
            Book
          </button>

        </div>

      </div>

    </div>
  );
};

export default HotelCard;