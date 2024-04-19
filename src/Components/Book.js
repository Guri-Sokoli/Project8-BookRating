import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Book = ({
    isLoggedIn,
    setIsLoggedIn,
    title,
    author,
    initialRating,
    isEditable,
}) => {
    const [rating, setRating] = useState(0);
    const [showRatingRecorded, setShowRatingRecorded] = useState(false);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    useEffect(() => {
        let timer;
        if (showRatingRecorded) {
            timer = setTimeout(() => setShowRatingRecorded(false), 3000); // hide after 3 seconds
        }
        return () => clearTimeout(timer); // cleanup function
    }, [showRatingRecorded]);

    const handleStarClick = (starNumber) => {
        if (!isLoggedIn) {
            window.location.href = "/signup";
            return;
        }
        if (isEditable && starNumber >= 1 && starNumber <= 5) {
            setRating(starNumber);
            setShowRatingRecorded(true);
        }
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                // Full star
                stars.push(renderStar(i, "full"));
            } else if (i - 0.5 <= rating) {
                // Half star
                stars.push(renderStar(i, "half"));
            } else {
                // Empty star
                stars.push(renderStar(i, "empty"));
            }
        }
        return stars;
    };

    const renderStar = (i, type) => {
        let fill;
        if (type === "full") {
            fill = "#FCB500";
        } else if (type === "half") {
            fill = "url(#half-gradient)";
        } else {
            fill = "#BAB6AE";
        }

        return (
            <svg
                key={i}
                onClick={() => handleStarClick(i)}
                xmlns="http://www.w3.org/2000/svg"
                fill={fill}
                className={`peer peer-hover:fill-[${
                    isEditable ? "#FCB500" : "#BAB6AE"
                }] hover:fill-[${
                    isEditable ? "#FCB500" : "#BAB6AE"
                }] w-8 h-8 md:w-10 md:h-10 mx-1 cursor-${
                    isEditable ? "pointer" : "default"
                }`}
                viewBox="0 0 24 24"
                stroke="none"
                aria-label={`Star ${i}`}
            >
                <defs>
                    <linearGradient id="half-gradient">
                        <stop offset="50%" stop-color="#FCB500" />
                        <stop offset="50%" stop-color="#BAB6AE" />
                    </linearGradient>
                </defs>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2l3.09 6.26L22 9.27l-5 4.73L18.18 22 12 18.7 5.82 22l1.18-7.04L2 9.27l6.91-1.01L12 2z"
                />
            </svg>
        );
    };

    return (
        <div className="flex flex-col items-center justify-around md:justify-center mx-4 mb-6 overflow-x-hidden">
            <img
                className="flex w-32 h-48 bg-gray-300 drop-shadow-xl m-4 md:mx-12 md:w-48 md:h-64"
                src="https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"
                alt="Cover of Already Reading Book"
            >
                {/* Image of Cover of Already Reading Book */}
            </img>
            <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                {title}
            </h1>
            <h1 className="text-md sm:text-lg md:text-xl">{author}</h1>
            <div class="flex justify-center">{renderStars()}</div>
            <div
                className={`animate-fade-in-out duration-100 ${
                    showRatingRecorded ? "text-green-500" : "text-transparent"
                }`}
            >
                Rating Recorded
            </div>
        </div>
    );
};

Book.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    initialRating: PropTypes.number.isRequired,
    isEditable: PropTypes.bool.isRequired,
};

export default Book;
