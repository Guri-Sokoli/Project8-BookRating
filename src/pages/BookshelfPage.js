import Header from "../components/Header.js";
import ReviewIcon from "../assets/review.svg";
import Footer from "../components/Footer.js";
import { useEffect, useState } from "react";
import api from "../config/config.js";
import { baseURL } from "../config/config.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookshelfPage = () => {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [updatedReview, setUpdatedReview] = useState("");
    const [updatedRating, setUpdatedRating] = useState(0);

    useEffect(() => {
        getMyBooks();
        getMyReviews();
    }, []);

    function getMyBooks() {
        api.get("/UserBooks/MyBooks")
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function getMyReviews() {
        api.get("/Reviews/my-reviews")
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user reviews:", error);
            });
    }

    const handleUpdateReview = (bookTitle) => {
        const reviewToUpdate = reviews.find(
            (review) => review.bookTitle === bookTitle
        );
        if (reviewToUpdate) {
            setSelectedBook(bookTitle);
            setEditingReview(reviewToUpdate);
        } else {
            toast.error("Review not found for this book.");
        }
    };
    const handleSubmitReviewUpdate = () => {
        if (!selectedBook || !editingReview || !updatedRating) return;

        // Find the book based on the selected book title
        const bookToUpdate = books.find((book) => book.title === selectedBook);
        if (!bookToUpdate) {
            toast.error("Book not found.");
            return;
        }

        const updatedData = {
            rating: parseInt(updatedRating),
            comment: updatedReview,
        };

        console.log("Updated data:", updatedData);

        api.put(`/Reviews/${bookToUpdate.id}`, updatedData)
            .then((response) => {
                toast.success("Review updated successfully!");
                getMyReviews();
                setSelectedBook(null);
                setEditingReview(null);
                setUpdatedReview("");
                setUpdatedRating("");
            })
            .catch((error) => {
                console.error("Error updating review:", error);
                toast.error("Failed to update review. Please try again.");
            });
    };

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

    // console log the request sent
    return (
        <div className="bg-[#FFF7E7]">
            <Header />
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-[#59461B] my-12">
                Your Book Shelf
            </h1>

            <div className="flex flex-col justify-around items-center bg-[#F3EBD6] mb-12">
                {books.map((book, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-col justify-start items-center w-full"
                        >
                            <div className="flex flex-row w-full justify-around">
                                <div
                                    className="flex flex-col justify-center items-center my-8 mx-4 
                                md:flex-row md:ml-12"
                                >
                                    <Link
                                        to={{
                                            pathname: `/book/${book.id}`,
                                        }}
                                    >
                                        <img
                                            className="flex w-32 h-48 bg-gray-300 drop-shadow-xl m-4 md:mx-12 md:w-48 md:h-64"
                                            src={`${baseURL}${book.coverLink}`}
                                            alt="Cover of Already Reading Book"
                                        >
                                            {/* Image of Cover of Already Reading Book */}
                                        </img>
                                        {/* ... */}
                                    </Link>
                                    <div className="flex flex-col justify-center items-center md:pl-12">
                                        <h1 className="text-wrap text-lg sm:text-xl md:text-2xl text-center text-[#59461B]">
                                            {book.title}
                                        </h1>
                                        <h1 className="text-sm sm:text-md md:text-lg text-center text-[#986F14]">
                                            {book.author}
                                        </h1>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col justify-center items-center my-8 mx-4 
                                md:flex-row md:mr-12"
                                >
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className="text-xl sm:text-2xl md:text-3xl text-center text-[#59461B]">
                                            Average Book Rating: {book.rateAvg}
                                        </h1>
                                        <div className="flex flex-row">
                                            {renderStars(book.rateAvg)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center my-6 md:mx-12">
                                        <h1 className="text-md sm:text-lg md:text-xl text-center text-[#59461B]">
                                            Publication Year:
                                        </h1>
                                        <h1 className="text-md sm:text-lg md:text-xl text-center text-[#59461B]">
                                            {book.publicationYear}
                                        </h1>
                                        <h1 className="text-md sm:text-lg md:text-xl text-center text-[#59461B]">
                                            Page Count:
                                        </h1>
                                        <h1 className="text-md sm:text-lg md:text-xl text-center text-[#59461B]">
                                            {book.pageCount}
                                        </h1>
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className="text-md sm:text-lg md:text-xl text-center text-[#59461B]">
                                            Update Review
                                        </h1>
                                        <img
                                            src={ReviewIcon}
                                            alt="Review Icon"
                                            fill="#59461B"
                                            stroke="#"
                                            className="w-8 h-8 cursor-pointer"
                                            onClick={() =>
                                                handleUpdateReview(book.title)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <divider className="w-full h-2 bg-white"></divider>
                        </div>
                    );
                })}
            </div>
            {editingReview && (
                <div className="fixed bottom-0 right-0 p-4 bg-white border border-gray-300 shadow-md">
                    <textarea
                        value={updatedReview}
                        onChange={(e) => setUpdatedReview(e.target.value)}
                        rows={4}
                        cols={50}
                        placeholder="Edit your review..."
                    />
                    <input
                        type="number"
                        min={1}
                        max={5}
                        value={updatedRating}
                        onChange={(e) => setUpdatedRating(e.target.value)}
                        placeholder="Add your rating (1-5)"
                    />
                    <button onClick={handleSubmitReviewUpdate}>
                        Update Review
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default BookshelfPage;
