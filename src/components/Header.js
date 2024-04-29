import React from "react";
import home from "../assets/home.svg";
import book from "../assets/book.svg";
import community from "../assets/community.svg";
import profile from "../assets/profile.svg";
import "../index.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../config/config";

import { Link } from "react-router-dom";

const Header = ({}) => {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
        }
    };
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            api.get("/User/details")
                .then((response) => {
                    setUsername(response.data.username);
                })
                .catch((error) => {
                    console.error("Error fetching user details:", error);
                });
        }
    }, [isLoggedIn]);
    return (
        <wrapper className="flex flex-col">
            <header className="md:flex md:flex-row md:items-center md:justify-between">
                <div
                    className="flex items-center justify-around
                        py-4
                        md: md:w-full
                        "
                >
                    <div className="text-3xl sm:text-4xl md:text-5xl text-[#59461B]">
                        bR
                    </div>

                    <div>
                        <div class="mx-auto max-w-md">
                            <form action="" class="relative mx-auto w-max">
                                <input
                                    type="search"
                                    class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border-[#979592] border-2 bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-[#979592] focus:pl-16 focus:pr-4
                                        sm:w-full sm:cursor-text sm:border-[#979592] sm:pl-16 sm:pr-4
                                        transition-all duration-200 ease-in-out transform focus:scale-105   "
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-[#979592] px-3.5 peer-focus:border-[#979592] peer-focus:stroke-[#979592]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </form>
                        </div>
                    </div>
                </div>
                <divider class="flex items-center w-full md:hidden">
                    <span class="flex-grow bg-[#59461B]/10 rounded h-0.5 mx-4"></span>
                </divider>
                <div className="py-4 md:w-full">
                    <ul className="flex flex-row justify-around items-center">
                        <li className="flex flex-col justify-center items-center cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-125 w-24 h-24">
                            <Link
                                to="/"
                                className="flex flex-col justify-center items-center sm:text-xl"
                            >
                                <img
                                    className="w-8 h-8 sm:w-10 sm:h-10"
                                    src={home}
                                    alt="Home Icon"
                                />
                                Home
                            </Link>
                        </li>
                        <li className="flex flex-col justify-center items-center cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-125 w-24 h-24">
                            <Link
                                to={isLoggedIn ? "/bookshelf" : "/login"}
                                className="flex flex-col justify-center items-center sm:text-xl"
                            >
                                <img
                                    className="w-8 h-8 sm:w-10 sm:h-10"
                                    src={book}
                                    alt="Bookshelf Icon"
                                />
                                Bookshelf
                            </Link>
                        </li>
                        <li className="flex flex-col justify-center items-center cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-125 w-24 h-24">
                            <Link
                                to={isLoggedIn ? "/community" : "/login"}
                                className="flex flex-col justify-center items-center sm:text-xl"
                            >
                                <img
                                    className="w-8 h-8 sm:w-10 sm:h-10"
                                    src={community}
                                    alt="Community Icon"
                                />
                                Community
                            </Link>
                        </li>
                        <li className="flex flex-col justify-center items-center cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-125 w-24 h-24">
                            <Link
                                to={isLoggedIn ? "/profile" : "/login"}
                                className="flex flex-col justify-center items-center sm:text-xl"
                            >
                                <img
                                    className="w-8 h-8 sm:w-10 sm:h-10"
                                    src={profile}
                                    alt="Profile Icon"
                                />
                                {isLoggedIn ? username : "Profile"}
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
            <divider class="flex items-center w-full">
                <span class="flex-grow bg-[#59461B] rounded h-0.5 mx-4 md:mx-0"></span>
            </divider>
        </wrapper>
    );
};

export default Header;
