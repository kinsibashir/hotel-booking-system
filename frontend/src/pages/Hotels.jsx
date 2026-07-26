import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hotelService } from "../services/hotelService";
import HotelCard from "../components/hotel/HotelCard";

const Hotels = () => {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const fetchHotels = async () => {

      try {

        const response = await hotelService.getHotels();

        console.log("Hotels response:", response);


        setHotels(response.data || []);

      } catch (err) {

        console.error(err);

        setError(
          err.message || "Failed to load hotels"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchHotels();

  }, []);



  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 min-h-screen bg-gray-50"
    >

      <div className="container-custom py-12">


        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our <span className="text-emerald-600">Hotels</span>
        </h1>


        <p className="text-gray-600 text-lg mb-8">
          Browse our collection of luxury hotels and accommodations
        </p>



        {loading && (

          <div className="text-center py-10">

            <p className="text-gray-600">
              Loading hotels...
            </p>

          </div>

        )}




        {error && (

          <div className="bg-red-100 text-red-700 p-4 rounded-lg">

            {error}

          </div>

        )}






        {!loading && !error && hotels.length === 0 && (

          <div className="text-center py-10">

            <p className="text-gray-600">
              No hotels available yet.
            </p>

          </div>

        )}






        {!loading && !error && hotels.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


            {hotels.map((hotel) => (

              <HotelCard
                key={hotel.id}
                hotel={hotel}
              />

            ))}


          </div>

        )}


      </div>

    </motion.div>

  );

};


export default Hotels;