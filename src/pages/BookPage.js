import { useParams, useLocation } from "react-router-dom";
import React from "react";
import Header from "../components/Header.js";
import BookInfoPage from "../components/BookInfoPage.js";

import reviewIcon from "../assets/continue.svg";
import infoIcon from "../assets/information.svg";

import { useEffect, useState } from "react";

import axios from "axios";

const BookPage = () => {
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

    const id = useParams();
    // console log the type of id.bookID
    console.log(typeof id.bookId);
    // convert from string to int
    console.log(parseInt(id.bookId));
    // console log the type of id.bookID
    console.log(typeof parseInt(id.bookId));

    // useEffect(() => {
    //     if (!book) {
    //         axios.get(`/api/books/${id.bookId}`).then((response) => {
    //             setBook(response.data);
    //         });
    //     }
    // }, [book, bookId]);

    // if (!book) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="bg-[#FFF7E7]">
            <Header />
            <div
                className="flex flex-col justify-center items-center
                            md:flex-row"
            >
                <div className="flex flex-col w-min text-wrap justify-center text-center md:mr-12">
                    <img
                        className="flex w-52 h-72 bg-gray-300 drop-shadow-xl m-4 md:mx-12 md:w-72 md:h-96"
                        src="https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"
                        alt="Cover of Already Reading Book"
                    />
                    <p className="hidden md:flex text-[#59461B] text-xl font-semibold sm:text-2xl md:text-3xl">
                        Book Title Lorem Ipsum dollor sit amet
                    </p>
                </div>
                {/* <h1>{book.title}</h1>*/}
                <div className="flex flex-col m-12 md:ml-12">
                    <h1 className="">Book ID: {id.bookId}</h1>
                    <h1 className="text-[#59461B] text-xl font-semibold sm:text-2xl md:text-3xl">
                        Book Title Lorem Ipsum dollor sit amet
                    </h1>
                    <h1 className="text-[#986F14] text-xl font-medium sm:text-2xl md:text-3xl">
                        Author First and Last name
                    </h1>
                    <h1 className="text-[#59461B] text-md font-medium sm:text-lg md:text-xl">
                        Date Published:{" "}
                        <span className="text-[#986F14] text-xl">
                            January 1, 2021
                        </span>
                    </h1>
                    <h1>
                        <span className="text-[#59461B] text-md font-medium sm:text-lg md:text-xl">
                            Genre:{" "}
                        </span>
                        {/*a map of all the genres i get from the api */}
                        <span className="text-[#986F14] text-md font-medium sm:text-lg md:text-xl">
                            {["Fantasy", "Sci-Fi", "Mystery"].map((genre) => (
                                <span>{genre} | </span>
                            ))}
                        </span>
                    </h1>
                    <div className="flex flex-row">{renderStars(3)}</div>
                    <br />
                    <h1 className=" text-wrap w-full text-[#59461B] text-md font-medium sm:text-lg md:text-xl">
                        Pariatur do labore elit culpa. In aliquip laboris
                        nostrud commodo deserunt ullamco culpa esse ea irure in.
                        Ipsum adipisicing fugiat sit ipsum fugiat laboris.
                        Laborum deserunt ullamco ad tempor amet veniam ex aute
                        ipsum. Aute aliqua aute cupidatat pariatur incididunt
                        deserunt exercitation ipsum dolore cillum. Eiusmod
                        nostrud esse do est reprehenderit adipisicing excepteur
                        id pariatur commodo proident cillum qui et. Enim tempor
                        ut excepteur est elit nisi. Cupidatat nostrud irure sint
                        labore aute nulla sunt exercitation nulla incididunt.
                        Dolore aliqua sint culpa exercitation nisi ut eiusmod
                        non incididunt ex. Est cillum ipsum laboris adipisicing
                        enim do nulla laboris ipsum pariatur laborum. Dolore ea
                        exercitation nulla laborum esse duis anim laboris
                        consectetur ut in do duis magna. Consectetur in deserunt
                        et dolore nostrud in laboris laboris pariatur eiusmod
                        elit veniam. Incididunt anim nisi incididunt fugiat eu
                        id. Pariatur ut adipisicing eu incididunt fugiat ad ea
                        labore eiusmod enim eiusmod. Dolore laborum mollit
                        cillum elit consectetur fugiat sunt elit dolore. Officia
                        sunt incididunt officia exercitation non officia tempor
                        do laboris eu. Eu non minim cillum excepteur culpa
                        deserunt voluptate excepteur dolor adipisicing dolor eu
                        voluptate est.
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
