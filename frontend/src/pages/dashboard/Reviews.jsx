import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/dashboard/ReviewCard";
import authService from "../../services/authService";
import api from "../../services/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const user = authService.getCurrentUser();

      const response = await api.get(`/reviews/user/${user.id}`);

      setReviews(response.data);
    } catch (error) {
      console.error("Error loading reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg font-semibold">
          Loading reviews...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Reviews
        </h1>

        <p className="text-gray-500 mt-2">
          View all the reviews you've written for hotels.
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Reviews Yet
          </h2>

          <p className="text-gray-500 mt-3">
            You haven't written any reviews yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reviews;