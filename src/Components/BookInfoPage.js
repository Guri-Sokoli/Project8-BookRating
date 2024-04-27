import React, { useState, useEffect } from "react";
import infoIcon from "../assets/information.svg";
import FooterHome from "./FooterHome";
import BookReview from "../components/BookInfoPageComponents/BookReview";
const BookInfoPage = () => {
    reviews = [
        {
            pfp: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
            username: "User NdsadsasaddasAme",
            stars: 3.5,
            review: "Consequat magna ullamco cupidatat ipsum irure in laboris nulla aute tempor minim Lorem dolor exercitation. Aliquip aute do esse ex nulla quis veniam laboris velit incididunt. Ad consequat excepteur irure exercitation eu sit ut aliqua incididunt irure cupidatat veniam. Ullamco laboris nisi culpa adipisicing consectetur do. In eu sit mollit culpa adipisicing amet sunt labore reprehenderit nulla ut pariatur.",
        },
        {
            pfp: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
            username: "User NAme",
            stars: 5,
            review: "Consequat magna ullamco cupidatat ipsum irure in laboris nulla aute tempor minim Lorem dolor exercitation. Aliquip aute do esse ex nulla quis veniam laboris velit incididunt. Ad consequat excepteur irure exercitation eu sit ut aliqua incididunt irure cupidatat veniam. Ullamco laboris nisi culpa adipisicing consectetur do. In eu sit mollit culpa adipisicing amet sunt labore reprehenderit nulla ut pariatur.",
        },
        {
            pfp: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
            username: "User NAme",
            stars: 5,
            review: "Consequat magna ullamco cupidatat ipsum irure in laboris nulla aute tempor minim Lorem dolor exercitation. Aliquip aute do esse ex nulla quis veniam laboris velit incididunt. Ad consequat excepteur irure exercitation eu sit ut aliqua incididunt irure cupidatat veniam. Ullamco laboris nisi culpa adipisicing consectetur do. In eu sit mollit culpa adipisicing amet sunt labore reprehenderit nulla ut pariatur.",
        },
        {
            pfp: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
            username: "User NAme",
            stars: 5,
            review: "Consequat magna ullamco cupidatat ipsum irure in laboris nulla aute tempor minim Lorem dolor exercitation. Aliquip aute do esse ex nulla quis veniam laboris velit incididunt. Ad consequat excepteur irure exercitation eu sit ut aliqua incididunt irure cupidatat veniam. Ullamco laboris nisi culpa adipisicing consectetur do. In eu sit mollit culpa adipisicing amet sunt labore reprehenderit nulla ut pariatur.",
        },
        {
            pfp: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
            username: "User NAme",
            stars: 5,
            review: "Consequat magna ullamco cupidatat ipsum irure in laboris nulla aute tempor minim Lorem dolor exercitation. Aliquip aute do esse ex nulla quis veniam laboris velit incididunt. Ad consequat excepteur irure exercitation eu sit ut aliqua incididunt irure cupidatat veniam. Ullamco laboris nisi culpa adipisicing consectetur do. In eu sit mollit culpa adipisicing amet sunt labore reprehenderit nulla ut pariatur.",
        },
        {
            pfp: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
            username: "6th Review in new page",
            stars: 5,
            review: "6th Review in new page6th Review in new page6th Review in new page6th Review in new page6th Review in new page6th Review in new page6th Review in new page.",
        },
    ];
    const [page, setPage] = useState(0);
    var [reviews, setReviews] = useState([]);
    const reviewsPerPage = 5;
    const startIndex = (page - 1) * reviewsPerPage;
    const selectedReviews = reviews.slice(
        startIndex,
        startIndex + reviewsPerPage
    );
    useEffect(() => {
        // fetch and setReviews with page and limit
    }, [page]);

    // reviews specific to book id

    const [activeSection, setActiveSection] = useState("authorInfo");
    const renderSection = () => {
        const renderStars = (rating) => {
            let stars = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) {
                    stars.push(renderStar(i, "full"));
                } else if (i - 0.5 <= rating) {
                    stars.push(renderStar(i, "half"));
                } else {
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
        if (activeSection === "authorInfo") {
            return (
                <div>
                    <div className="flex flex-col bg-[#FFF7E7] justify-center items-center mx-4 md:mr-12">
                        <h1 className="flex items-center justify-center text-[#59461B] text-4xl mt-16">
                            Author Details
                        </h1>
                        <div className="flex w-1/2 h-1 bg-[#59461B] rounded-xl fill-[#59461B] mt-4"></div>
                        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center">
                            <h1 className="flex flex-col items-center justify-evenly w-full text-[#59461B] text-4xl my-16">
                                About the Author{" "}
                                <div className="flex flex-col w-min text-wrap justify-center text-center mt-8">
                                    <img
                                        className="flex w-52 h-72 bg-gray-300 drop-shadow-xl m-4 md:mx-12 md:w-72 md:h-96"
                                        src="https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"
                                        alt="Author Picture"
                                    />
                                </div>
                            </h1>
                            <h1 className="flex items-center justify-evenly w-full text-[#59461B] text-xl">
                                Consequat magna ullamco cupidatat ipsum irure in
                                laboris nulla aute tempor minim Lorem dolor
                                exercitation. Aliquip aute do esse ex nulla quis
                                veniam laboris velit incididunt. Ad consequat
                                excepteur irure exercitation eu sit ut aliqua
                                incididunt irure cupidatat veniam. Ullamco
                                laboris nisi culpa adipisicing consectetur do.
                                In eu sit mollit culpa adipisicing amet sunt
                                labore reprehenderit nulla ut pariatur.
                                Reprehenderit proident cupidatat deserunt
                                laborum ut eu velit non eu. Do nostrud ullamco
                                velit laborum nostrud fugiat officia anim
                                laborum. Non amet ipsum quis irure nulla
                                exercitation non minim veniam irure id duis. Et
                                labore exercitation qui ea. Fugiat ad voluptate
                                labore ullamco ea. Culpa ad exercitation officia
                                cupidatat dolore velit sunt sit exercitation
                                labore velit duis elit. Sint officia aliquip
                                nostrud sunt magna. Occaecat adipisicing
                                voluptate ullamco aliquip ut Lorem non enim.
                                Proident dolore laborum ut in fugiat excepteur.
                                Ipsum nostrud mollit nulla ex minim consequat id
                                elit minim adipisicing veniam.
                            </h1>
                        </div>
                    </div>
                </div>
            );
        } else if (activeSection === "reviews") {
            return (
                <div>
                    <div className="flex flex-col bg-[#FFF7E7] justify-center items-center mx-4 md:mr-12">
                        <h1 className="flex items-center justify-center text-[#59461B] text-4xl mt-16">
                            Reviews
                        </h1>
                        <divider className="flex w-1/2 h-1 bg-[#59461B] rounded-xl fill-[#59461B] mt-4"></divider>
                        <button className="flex items-center justify-center w-40 md:w-64 h-12 bg-[#986F14] text-white rounded-xl mt-4 p-4">
                            Write a Review
                        </button>
                        {selectedReviews.map((review, index) => (
                            <BookReview key={index} review={review} />
                        ))}
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        {/* here i want as many circular buttons as there is information divided by 5 since there will be only 5 reviews per page */}
                        {Array.from(
                            {
                                length: Math.ceil(
                                    reviews.length / reviewsPerPage
                                ),
                            },
                            (_, i) => (
                                <button
                                    key={i}
                                    className={`flex items-center justify-center w-8 h-8 bg-[#986F14] text-white rounded-full mx-1 ${
                                        page === i + 1 ? "bg-[#59461B]" : ""
                                    }`}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={
                                page ===
                                Math.ceil(reviews.length / reviewsPerPage)
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="bg-[#FFF7E7]">
            <div className="flex flex-row justify-around md:justify-center items-center w-full bg-[#E8E0C6] py-3 px-12">
                <div
                    className={`flex flex-col justify-center items-center md:mr-8 hover:cursor-pointer hover:scale-110 duration-300 ${
                        activeSection === "authorInfo"
                            ? "border-b-2 border-[#986F14]"
                            : ""
                    }`}
                    onClick={() => setActiveSection("authorInfo")}
                >
                    <img className="h-10" src={infoIcon} alt="Review Icon" />
                    <h1>Author Info</h1>
                </div>
                <div className="bg-[#986F14] w-1 h-16 mx-3 rounded-xl"></div>
                <div
                    className={`flex flex-col justify-center items-center md:ml-8 hover:cursor-pointer hover:scale-110 duration-300 ${
                        activeSection === "reviews"
                            ? "border-b-2 border-[#986F14]"
                            : ""
                    }`}
                    onClick={() => setActiveSection("reviews")}
                >
                    <svg
                        alt="Review Icon"
                        className="h-10"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#986F14"
                        stroke="#986F14"
                        stroke-width="0.5"
                        viewBox="0 0 24 24"
                        id="continue"
                    >
                        <path d="M15,14a1,1,0,0,1-.71-1.71L17.59,9,14.29,5.71a1,1,0,0,1,1.41-1.41l4,4a1,1,0,0,1,0,1.41l-4,4A1,1,0,0,1,15,14Z"></path>
                        <path d="M11,20H7a3,3,0,0,1-3-3V11A3,3,0,0,1,7,8H19a1,1,0,0,1,0,2H7a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h4a1,1,0,0,1,0,2Z"></path>
                    </svg>
                    <h1>Reviews</h1>
                </div>
            </div>
            {renderSection()}
            <FooterHome />
        </div>
    );
};

export default BookInfoPage;
