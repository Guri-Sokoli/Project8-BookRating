// src/Components/ReccomendationSection.js
import React from "react";
import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import instagramIcon from "../assets/instagram.svg";
import linkedinIcon from "../assets/linkedin.svg";

const FooterHome = () => {
    return (
        <div className="flex flex-row justify-around items-start bg-[#59461B] text-white px-6 py-6 md:py-10">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-center text-lg pb-4 md:pb-10 sm:text-2xl md:text-3xl">
                    Company
                </h1>
                <ul className="text-center text-sm sm:text-lg md:text-xl">
                    <li className="my-2">About Us</li>
                    <li className="my-2">Careers</li>
                    <li className="my-2">Terms</li>
                    <li className="my-2">Privacy</li>
                    <li className="my-2">Help</li>
                </ul>
            </div>
            <div className="flex flex-col justify-center items-center mx-4">
                <h1 className="text-center text-lg pb-4 md:pb-10 sm:text-2xl md:text-3xl">
                    Work With Us
                </h1>
                <ul className="text-center text-sm sm:text-lg md:text-xl">
                    <li className="my-2">Authors</li>
                    <li className="my-2">Advertise</li>
                    <li className="my-2">Authors & Blogs</li>
                    <li className="my-2">API</li>
                </ul>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-center text-lg pb-4 md:pb-10 sm:text-2xl md:text-3xl">
                    Connect
                </h1>
                <ul className="flex flex-row justify-between">
                    <li className="mx-0.5 sm:mx-2">
                        <a href="#">
                            <img
                                src={facebookIcon}
                                alt="Facebook"
                                className="h-6"
                            />
                        </a>
                    </li>
                    <li className="mx-0.5 sm:mx-2">
                        <img src={twitterIcon} alt="Twitter" className="h-6" />
                    </li>
                    <li className="mx-0.5 sm:mx-2">
                        <a href="#">
                            <img
                                src={instagramIcon}
                                alt="Instagram"
                                className="h-6"
                            />
                        </a>
                    </li>
                    <li className="mx-0.5 sm:mx-2">
                        <a href="#">
                            <img
                                src={linkedinIcon}
                                alt="LinkedIn"
                                className="h-6"
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FooterHome;
