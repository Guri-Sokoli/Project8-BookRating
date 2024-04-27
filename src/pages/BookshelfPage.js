import Header from "../components/Header.js";
import ReviewIcon from "../assets/review.svg";
import FooterHome from "../components/FooterHome.js";

const ratedBooks = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        cover: "",
        rating: 3.5,
        ratedDate: "2021-09-01",
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        cover: "",
        rating: 4.5,
        ratedDate: "2021-09-01",
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        cover: "",
        rating: 4.5,
        ratedDate: "2021-09-01",
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        cover: "",
        rating: 4.5,
        ratedDate: "2021-09-01",
    },
];

const BookshelfPage = () => {
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

    return (
        <div className="bg-[#FFF7E7]">
            <Header />
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-[#59461B] my-12">
                Your Book Shelf
            </h1>
            <div className="flex flex-col justify-around items-center bg-[#F3EBD6] mb-12">
                {ratedBooks.map((book, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-start items-center w-full"
                    >
                        <div className="flex flex-row w-full justify-around">
                            <div
                                className="flex flex-col justify-center items-center my-8 mx-4 
                                md:flex-row md:ml-12"
                            >
                                <img
                                    src={
                                        book.cover ||
                                        "https://images.unsplash.com/photo-1542282088-2a6f3f384d6e"
                                    }
                                    alt="book cover"
                                    className="bg-[#FFF7E7] flex justify-center items-center w-24 h-32 md:w-32 md:h-48"
                                />
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
                                        {book.rating}
                                    </h1>
                                    <div className="flex flex-row">
                                        {renderStars(book.rating)}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center my-6 md:mx-12">
                                    <h1 className="text-md sm:text-lg md:text-xl text-center text-[#59461B]">
                                        Date Reviewed:
                                    </h1>
                                    <h1 className="text-md sm:text-lg md:text-xl text-center text-[#59461B]">
                                        {book.ratedDate}
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
                                    />
                                </div>
                            </div>
                        </div>
                        <divider className="w-full h-2 bg-white"></divider>
                    </div>
                ))}
            </div>
            <FooterHome />
        </div>
    );
};

export default BookshelfPage;
