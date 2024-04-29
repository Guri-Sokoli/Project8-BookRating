import React from "react";
import "../index.css";
import Book from "./Book";
import { baseURL } from "../config/config";

const PopularSectionHome = ({ books }) => {
    console.log(books);
    return (
        <div className="flex flex-nowrap scroll-snap-x snap-start no-scrollbar mb-8">
            {books.map((book, index) => (
                <div className="scroll-snap-align-start">
                    <Book
                        key={index}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        initialRating={book.initialRating}
                        isEditable={book.isEditable}
                        coverURL={`${baseURL}${book.coverLink}`}
                        rateAvg={book.rateAvg}
                    />
                </div>
            ))}
        </div>
    );
};

export default PopularSectionHome;
