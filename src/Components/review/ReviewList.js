import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BookReview from "../BookInfoPageComponents/BookReview";
import api from "../../config/config";
import Pagination from "../Pagination";
import { AddReview } from "./AddReview";

const ITME_PER_PAGE = 3;

const ReviewList = () => {
  let [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addReview, setAddReview] = useState(false);

  const { id } = useParams();
  const currentPage =  searchParams.get('page') || 1;


  useEffect(() => {
    getBookReview();
  }, []);

  function getBookReview() {
    api
      .get(`/Reviews/books/${id}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) return <>Loading</>;


  const firstItemIndex = (currentPage - 1) * ITME_PER_PAGE;
  const lastItemIndex = firstItemIndex + ITME_PER_PAGE;
  const paginatedReviews = reviews.slice(firstItemIndex, lastItemIndex);

  return (
    <div>
      <div className="flex flex-col bg-[#FFF7E7] justify-center items-center mx-4 md:mr-12">
       
        <button
          className="flex items-center justify-center w-40 md:w-64 h-12 bg-[#986F14] text-white rounded-xl mt-4 p-4"
          onClick={() => setAddReview(true)}
        >
          Write a Review
        </button>
        {addReview && (
         <AddReview bookId={id} setAddReview={setAddReview}/>
        )}
        {paginatedReviews.map((review, index) => (
          <BookReview key={index} review={review} />
        ))}
      </div>
      <Pagination totalItems={reviews.length} itemsPerPage={ITME_PER_PAGE} medianSize={2} />

    </div>
  );
};

export default ReviewList;
