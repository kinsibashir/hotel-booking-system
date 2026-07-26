import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center">

        <h3 className="font-bold text-lg">
          {review.hotel_name}
        </h3>

        <div className="flex text-yellow-500">

          {[...Array(review.rating)].map((_, i) => (
            <FaStar key={i} />
          ))}

        </div>

      </div>

      <p className="text-gray-600 mt-4">
        {review.comment}
      </p>

      <p className="text-sm text-gray-400 mt-5">
        {review.created_at}
      </p>

    </div>
  );
};

export default ReviewCard;