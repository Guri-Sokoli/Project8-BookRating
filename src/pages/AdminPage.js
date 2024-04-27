import React, { useState } from "react";
import Header from "../components/Header.js";

const AdminPage = () => {
    // User Information State
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    // Book Information State
    const [bookInfo, setBookInfo] = useState({
        title: "",
        description: "",
        categories: "",
        coverImage: "",
    });

    // Admin's Books State
    const [books, setBooks] = useState([
        {
            title: "Book One",
            description: "This is the first book description.",
            categories: "Fiction",
            coverImage:
                "https://images.unsplash.com/photo-1522184216316-5bb54ecdf9e2",
        },
        {
            title: "Book Two",
            description: "This is the second book description.",
            categories: "Non-Fiction",
            coverImage:
                "https://images.unsplash.com/photo-1548054645-cbf427effbad",
        },
    ]);

    // Handle User Information Change
    const handleUserChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Book Information Change
    const handleBookChange = (e) => {
        setBookInfo({
            ...bookInfo,
            [e.target.name]: e.target.value,
        });
    };

    // Handle User Information Submission
    const handleUserSubmit = (e) => {
        e.preventDefault();
        // Handle user information submission, e.g., send a request to the server
    };

    // Handle Book Submission
    const handleBookSubmit = (e) => {
        e.preventDefault();
        // Handle book submission, e.g., send a request to the server
        const newBook = {
            title: bookInfo.title,
            description: bookInfo.description,
            categories: bookInfo.categories,
            coverImage: bookInfo.coverImage,
        };
        setBooks([...books, newBook]);
        setBookInfo({
            title: "",
            description: "",
            categories: "",
            coverImage: "",
        });
    };

    return (
        <div className="bg-[#FFF7E7] min-h-screen">
            <Header />
            <div className="flex flex-col justify-center items-center md:justify-evenly">
                {/* User Information Section */}
                <form
                    onSubmit={handleUserSubmit}
                    className="flex flex-col justify-center items-center md:mt-12"
                >
                    <div className="text-[#59461B] text-3xl font-semibold md:text-4xl mb-4">
                        User Info
                    </div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userInfo.name}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={userInfo.newPassword}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword">
                            Confirm New Password:
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={userInfo.confirmNewPassword}
                            onChange={handleUserChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-2 rounded-lg border-2 border-[#59461B] hover:bg-[#59461B] hover:text-white hover:scale-110 duration-100 "
                    >
                        Save Changes
                    </button>
                </form>

                {/* Add Book Section */}
                <form
                    onSubmit={handleBookSubmit}
                    className="flex flex-col justify-center items-center md:mt-12"
                >
                    <div className="text-[#59461B] text-3xl font-semibold md:text-4xl mb-4">
                        Add New Book
                    </div>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={bookInfo.title}
                            onChange={handleBookChange}
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={bookInfo.description}
                            onChange={handleBookChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="categories">Categories:</label>
                        <input
                            type="text"
                            id="categories"
                            name="categories"
                            value={bookInfo.categories}
                            onChange={handleBookChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="coverImage">Cover Image URL:</label>
                        <input
                            type="text"
                            id="coverImage"
                            name="coverImage"
                            value={bookInfo.coverImage}
                            onChange={handleBookChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-2 rounded-lg border-2 border-[#59461B] hover:bg-[#59461B] hover:text-white hover:scale-110 duration-100 "
                    >
                        Add Book
                    </button>
                </form>

                {/* Display Admin's Books */}
                <div className="flex flex-col bg-[#FFF7E7] justify-center items-center mx-4 md:mr-12">
                    <h1 className="flex items-center justify-center text-[#59461B] text-4xl mt-16">
                        Your Books
                    </h1>
                    <div className="flex w-full flex-wrap justify-center items-center my-8">
                        {books.map((book, index) => (
                            <div
                                key={index}
                                className="flex flex-col bg-[#F9F1DE] w-full md:w-96 mx-4 my-4 rounded-xl"
                            >
                                <img
                                    className="rounded-t-xl object-cover w-full h-64"
                                    src={book.coverImage}
                                    alt="Book Cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        {book.title}
                                    </h2>
                                    <p className="text-gray-700">
                                        {book.description}
                                    </p>
                                    <p className="text-gray-700 mt-2">
                                        Categories: {book.categories}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
