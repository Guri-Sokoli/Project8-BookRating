import React from "react";
import RecommendedBook from "./RecommendedBook";

const RecommendationSection = ({ books }) => {
    return (
        <div className="flex flex-nowrap scroll-snap-x snap-start no-scrollbar">
            {books.map((book, index) => (
                <div className="scroll-snap-align-start">
                    <RecommendedBook
                        key={index}
                        title={book.title}
                        author={book.author}
                        description={book.description}
                        cover={book.cover}
                        rating={book.rating}
                    />
                </div>
            ))}
        </div>
    );
};

export default RecommendationSection;
