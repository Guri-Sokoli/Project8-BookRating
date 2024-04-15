import React from "react";
import "../index.css";
import Book from "./Book";

const popularSectionHome = ({ books }) => {
    return (
        <div className="flex flex-row w-screen overflow-x-auto">
            {books.map((book, index) => (
                <Book
                    key={index}
                    title={book.title}
                    author={book.author}
                    initialRating={book.initialRating}
                    isEditable={book.isEditable}
                />
            ))}
        </div>
    );
};

export default popularSectionHome;
