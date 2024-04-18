// RecommendedBook.js
import React from "react";

const RecommendedBook = ({ title, author, description, cover, rating }) => {
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                // Full
                stars.push(renderStar(i, "full"));
            } else if (i - 0.5 <= rating) {
                // Gjys
                stars.push(renderStar(i, "half"));
            } else {
                // That
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
                xmlns="http://www.w3.org/2000/svg"
                fill={fill}
                className={`peer peer-hover:fill-[${
                    false ? "#FCB500" : "#BAB6AE"
                }] hover:fill-[${
                    false ? "#FCB500" : "#BAB6AE"
                }] w-8 h-8 md:w-10 md:h-10 mx-1 cursor-${
                    false ? "pointer" : "default"
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
        <div className="flex flex-row bg-[#E8E0C6] ml-8 mb-12">
            <div className="flex w-32 h-48 bg-gray-300 drop-shadow-xl m-6 md:mx-12 md:w-48 md:h-64">
                {/* Image of Cover of Already Reading Book */}
                <div className="w-32 h-48"> </div>
            </div>
            <div className="flex flex-col py-4 pr-6">
                <h1 className="text-[#59461B] text-lg mb-2">{title}</h1>
                <h1 className="text-[#986F14] text-md mb-2">{author}</h1>
                <div class="flex flex-row justify-start">{renderStars()}</div>
                <h1 className="w-64 text-[#0E0E0C] text-sm mt-2 line-clamp-5 text-wrap">
                    {description}
                </h1>
            </div>
        </div>
    );
};

export default RecommendedBook;
