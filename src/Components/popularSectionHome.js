import React from "react";
import "../index.css";
import Book from "./Book";

const popularSectionHome = ({ books }) => {
    return (
        <div className="flex flex-nowrap scroll-snap-x snap-start no-scrollbar">
            {books.map((book, index) => (
                <div className="scroll-snap-align-start">
                    <Book
                        key={index}
                        title={book.title}
                        author={book.author}
                        initialRating={book.initialRating}
                        isEditable={book.isEditable}
                    />
                </div>
            ))}
        </div>
    );
};

export default popularSectionHome;
