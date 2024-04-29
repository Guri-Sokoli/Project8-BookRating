import { useParams } from "react-router-dom";
import React from "react";
import Header from "../components/Header.js";
import BookInfoPage from "../components/BookInfoPage.js";

import reviewIcon from "../assets/continue.svg";
import infoIcon from "../assets/information.svg";
import api from "../config/config.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseURL } from "../config/config.js";

const BookPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addReview, setAddReview] = useState(false);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    useEffect(() => {
        getBook();
    }, [id]);

    function getBook() {
        api.get(`/Books/${id}`)
            .then((response) => {
                setBook(response.data);
            })
            .catch((error) => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    if (loading) return <div>Loading...</div>;
    if (!book) return <div>Invalid Book</div>;

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
    console.log(book);
    console.log(book);
    console.log(book);
    console.log(book);
    console.log(book);

    return (
        <div className="bg-[#FFF7E7]">
            <Header />
            <div
                className="flex flex-col justify-center items-center
                            md:flex-row"
            >
                <div className="flex flex-col text-wrap justify-center text-center md:mr-12">
                    <img
                        className="flex w-52 h-72 bg-gray-300 drop-shadow-xl m-4 md:mx-12 md:w-72 md:h-96"
                        src={`${baseURL}${book.coverLink}`}
                        alt="Cover of Already Reading Book"
                    />
                    <h1 className="hidden md:flex text-[#59461B] text-xl font-semibold sm:text-2xl md:text-3xl"></h1>
                </div>
                {/* <h1>{book.title}</h1>*/}
                <div className="flex flex-col m-12 md:ml-12">
                    <h1 className="">Book ID: {book.id}</h1>
                    <h1 className="text-[#59461B] text-xl font-semibold sm:text-2xl md:text-3xl">
                        {book.title}
                    </h1>
                    <h1 className="text-[#986F14] text-xl font-medium sm:text-2xl md:text-3xl">
                        {book.author}
                    </h1>
                    <h1 className="text-[#59461B] text-md font-medium sm:text-lg md:text-xl">
                        {book.publicationYear}
                    </h1>
                    <h1>
                        <span className="text-[#59461B] text-md font-medium sm:text-lg md:text-xl">
                            {book.isbn}
                        </span>
                        {/*a map of all the genres i get from the api */}
                    </h1>
                    <h1>
                        <span className="text-[#986F14] text-md font-medium sm:text-lg md:text-xl">
                            {book.category}
                        </span>
                    </h1>
                    <div className="flex flex-row">
                        {renderStars(book.rateAvg)}
                    </div>
                    <br />
                    <h1 className=" text-wrap w-full text-[#59461B] text-md font-medium sm:text-lg md:text-xl">
                        {book.description}
                    </h1>
                </div>
                {/* <h1>{book.title}</h1>*/}
            </div>

            <BookInfoPage />

            {/* <p>Book title: {title}</p>
            <p>Book author: {author}</p> */}
        </div>
    );
};

export default BookPage;
