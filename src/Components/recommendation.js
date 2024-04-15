import React from "react";
import "../index.css";
import continueIcon from "../assets/continue.svg";

const leftOffBook = () => {
    return (
        <div className="flex flex-col justify-center items-center w-max">
            <div className="flex flex-row justify-around md:justify-center w-screen bg-[#E8E0C6]">
                <div
                    className="flex w-32 h-48 bg-gray-300 m-4 items-center justify-center
                                md:mx-12"
                >
                    {/* Image of Cover of Already Reading Book */}
                </div>
                <div
                    className="flex flex-col justify-center items-start w-min 
                                md:mx-12"
                >
                    <h1 className="w-full sm:text-lg md:text-2xl text-left text-[#565353] font-bold pb-2">
                        Name of Book
                    </h1>
                    <div className="flex flex-row items-center justify-center pb-2">
                        <progressBar className="h-2 relative w-64 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gray-200 absolute"></div>
                            <div
                                className="bg-gradient-to-r from-[#59461B] to-[#986F14] h-full absolute"
                                style={{ width: "90%" }}
                            ></div>
                        </progressBar>
                    </div>
                    <h1 className="pb-2 text-left sm:text-lg md:text-2xl">
                        % Left
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default leftOffBook;
