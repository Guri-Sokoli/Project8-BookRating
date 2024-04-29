import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../config/config";

export const AddReview = ({ bookId, setAddReview }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const handleReviewSubmit = () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to add a review.");
      return;
    }
    api
      .post(`/Reviews/books/${bookId}`, {
        rating: rating,
        comment: reviewText,
      })
      .then((response) => {
        setAddReview(false);
        toast.success("Review Added Successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 w-full" onClick={()=>setAddReview(false)}>
      <div
        className="bg-[#FFF7E7] p-4 w-[80%] rounded flex flex-col gap-2"
        onClick={(e)=>{e.stopPropagation()}}
       
      >
        <label>Review: </label>
        <textarea
          className="bg-[#FFF7E7] border p-2 roundeed outline-none"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
        />
        <label>Rating (1-5)</label>
        <input
          className="bg-[#FFF7E7] border p-2 roundeed  outline-none"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-5)"
        />
        <button
          className="bg-[#59461B] font-semibold text-white rounded-lg p-2 mt-4 md:px-12"
          onClick={handleReviewSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
