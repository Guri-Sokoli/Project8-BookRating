import react from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import BookReview from "../components/BookInfoPageComponents/BookReview";

const ProfilePage = () => {
    var reviews = [
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
    const reviewsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(reviews.length / reviewsPerPage);

    const currentReviews = reviews.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
    );

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, maxPage));
    };

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
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

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        oldpassword: "",
        newpassword: "",
    });

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission, e.g. by sending a request to the server
    };
    return (
        <div className="bg-[#FFF7E7] min-h-screen">
            <Header />
            <div className="flex flex-col justify-center items-center md:justify-evenly">
                <div className="flex flex-col w-min text-wrap justify-center text-center mt-8">
                    <img
                        className="flex w-32 h-32 rounded-full bg-gray-300 drop-shadow-xl m-4"
                        src="https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"
                        alt="User Picture"
                    />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center md:mt-12"
                >
                    <div className="text-[#59461B] text-3xl font-semibold md:text-4xl mb-4">
                        {" "}
                        User Info
                    </div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Add other input fields as necessary */}
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="newpassword">New Password:</label>
                        <input
                            type="password"
                            id="newpassword"
                            name="newpassword"
                            value={userInfo.newpassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmpassword">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            value={userInfo.confirmpassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-2 rounded-lg border-2 border-[#59461B] hover:bg-[#59461B] hover:text-white hover:scale-110 duration-100 "
                    >
                        Save Changes
                    </button>
                </form>

                <div>
                    <div className="flex flex-col bg-[#FFF7E7] justify-center items-center mx-4 md:mr-12">
                        <h1 className="flex items-center justify-center text-[#59461B] text-4xl mt-16">
                            Reviews
                        </h1>
                        <divider className="flex w-1/2 h-1 bg-[#59461B] rounded-xl fill-[#59461B] mt-4"></divider>

                        {currentReviews.map((review) => (
                            <div className="flex flex-col bg-[#F9F1DE] md:flex-row justify-center md:justify-around items-center my-8">
                                <div className="flex flex-row md:flex-col px-12">
                                    <div className="flex flex-row justify-center items-center">
                                        <img
                                            className="rounded-full w-16 h-16 bg-gray-300 m-4 md:w-32 md:h-32"
                                            src={
                                                review.pfp
                                                    ? review.pfp
                                                    : "/user.png"
                                            }
                                            alt="User Picture"
                                        />
                                        <h1>{review.username}</h1>
                                    </div>
                                    <div className="flex flex-row justify-center items-center mb-4">
                                        {renderStars(review.stars)}
                                    </div>
                                </div>
                                <h1 className="px-12 text-wrap w-full text-[#59461B] text-md font-medium sm:text-lg md:text-xl">
                                    {review.review}
                                </h1>
                            </div>
                        ))}
                        <div>
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border-2 border-[#59461B] hover:bg-[#59461B] hover:text-white hover:scale-110 duration-100 "
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === maxPage}
                                className="p-2 rounded-lg border-2 border-[#59461B] hover:bg-[#59461B] hover:text-white hover:scale-110 duration-100 "
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
