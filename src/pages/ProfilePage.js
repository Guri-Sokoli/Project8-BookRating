import react from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import BookReview from "../components/BookInfoPageComponents/BookReview";
import { handleLogout } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../config/config";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(handleLogout());
        navigate("/login");
    };

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        newpassword: "",
        confirmpassword: "",
    });

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        api.get("/User/details")
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
            });

        api.get("/Reviews/my-reviews")
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user reviews:", error);
            });
    }, []);

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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

        console.log(reviews);
        console.log(reviews);
        console.log(reviews);
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

    console.log(reviews);

    return (
        <div className="bg-[#FFF7E7] min-h-screen">
            <Header />
            <div className="flex flex-col justify-center items-center md:justify-evenly">
                {/* User Info */}
                <div className="flex flex-col w-min text-wrap justify-center text-center mt-8">
                    {/* Display user info */}
                    <img
                        className="flex w-32 h-32 rounded-full bg-gray-300 drop-shadow-xl m-4"
                        src="https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"
                        alt="User Picture"
                    />
                    <div className="text-[#59461B] text-3xl font-semibold md:text-4xl mb-4">
                        {userInfo.username}
                    </div>
                    <div>
                        <label htmlFor="username">username:</label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            value={userInfo.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="p-2 rounded-lg border-2 border-[#59461B] hover:bg-[#59461B] hover:text-white hover:scale-110 duration-100 "
                    >
                        Save Changes
                    </button>
                </div>

                <button
                    onClick={handleLogoutClick}
                    className="bg-[#59461B] font-semibold text-white rounded-lg p-2 mt-4 md:px-12"
                >
                    Log Out
                </button>

                {/* Reviews */}
                <div>
                    <div className="flex flex-col bg-[#FFF7E7] justify-center items-center mx-4 md:mr-12">
                        <h1 className="flex items-center justify-center text-[#59461B] text-4xl mt-16">
                            Reviews
                        </h1>
                        {/* Divider */}
                        <divider className="flex w-1/2 h-1 bg-[#59461B] rounded-xl fill-[#59461B] mt-4"></divider>

                        {/* Display user reviews */}
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="flex flex-col bg-[#F9F1DE] md:flex-row justify-center md:justify-around items-center my-8"
                            >
                                <div className="flex flex-row md:flex-col px-12">
                                    <div className="flex flex-col text-lg font-semibold justify-center items-center">
                                        <h1>{review.bookTitle}</h1>
                                        <h1>{review.bookAuthor}</h1>
                                    </div>
                                    <div className="flex flex-row justify-center items-center mb-4">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <h1>Review Comment:</h1>
                                <h1 className="px-12 text-wrap w-full text-[#59461B] text-md font-medium sm:text-lg md:text-lg">
                                    {review.comment}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
