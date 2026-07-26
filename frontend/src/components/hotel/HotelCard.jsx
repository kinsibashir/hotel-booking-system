import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-card group"
    >

      {/* Image */}
      <div className="relative h-64 overflow-hidden">

        <img
          src={
            hotel.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945"
          }
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />


        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">

          <FaStar className="text-yellow-400" />

          <span className="font-semibold text-sm">
            {hotel.rating || "0"}
          </span>

        </div>


      </div>


      {/* Content */}
      <div className="p-6">

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {hotel.name}
        </h3>


        <div className="flex items-center gap-1 text-gray-500 mb-3">

          <FaMapMarkerAlt className="text-emerald-500"/>

          <span className="text-sm">
            {hotel.city}, {hotel.county}
          </span>

        </div>


        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {hotel.description}
        </p>


        <div className="mb-4">

          <span className="text-2xl font-bold text-emerald-600">
            KSh {hotel.price_per_night}
          </span>

          <span className="text-gray-500 text-sm">
            {" "} / night
          </span>

        </div>


        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleBookNow}
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
        >

          View Hotel

        </motion.button>


      </div>


    </motion.div>
  );
};


export default HotelCard;