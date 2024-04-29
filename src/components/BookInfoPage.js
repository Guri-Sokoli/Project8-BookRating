import React, { useState } from "react";
import infoIcon from "../assets/information.svg";
import Footer from "./Footer";
import ReviewList from "./review/ReviewList";

const BookInfoPage = () => {
  const [activeSection, setActiveSection] = useState("authorInfo");

  const renderSection = () => {
    if (activeSection === "reviews") return <ReviewList />;

    return (
      <div>
        <div className="flex flex-col bg-[#FFF7E7] justify-center items-center mx-4 md:mr-12">
          <h1 className="flex items-center justify-center text-[#59461B] text-4xl mt-16">
            Author Details
          </h1>
          <div className="flex w-1/2 h-1 bg-[#59461B] rounded-xl fill-[#59461B] mt-4"></div>
          <div className="flex flex-col md:flex-row justify-center md:justify-around items-center">
            <h1 className="flex flex-col items-center justify-evenly w-full text-[#59461B] text-4xl my-16">
              About the Author{" "}
              <div className="flex flex-col w-min text-wrap justify-center text-center mt-8">
                <img
                  className="flex w-52 h-72 bg-gray-300 drop-shadow-xl m-4 md:mx-12 md:w-72 md:h-96"
                  src="https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"
                  alt="Author Picture"
                />
              </div>
            </h1>
            <h1 className="flex items-center justify-evenly w-full text-[#59461B] text-xl">
              Consequat magna ullamco cupidatat ipsum irure in laboris nulla
              aute tempor minim Lorem dolor exercitation. Aliquip aute do esse
              ex nulla quis veniam laboris velit incididunt. Ad consequat
              excepteur irure exercitation eu sit ut aliqua incididunt irure
              cupidatat veniam. Ullamco laboris nisi culpa adipisicing
              consectetur do. In eu sit mollit culpa adipisicing amet sunt
              labore reprehenderit nulla ut pariatur. Reprehenderit proident
              cupidatat deserunt laborum ut eu velit non eu. Do nostrud ullamco
              velit laborum nostrud fugiat officia anim laborum. Non amet ipsum
              quis irure nulla exercitation non minim veniam irure id duis. Et
              labore exercitation qui ea. Fugiat ad voluptate labore ullamco ea.
              Culpa ad exercitation officia cupidatat dolore velit sunt sit
              exercitation labore velit duis elit. Sint officia aliquip nostrud
              sunt magna. Occaecat adipisicing voluptate ullamco aliquip ut
              Lorem non enim. Proident dolore laborum ut in fugiat excepteur.
              Ipsum nostrud mollit nulla ex minim consequat id elit minim
              adipisicing veniam.
            </h1>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#FFF7E7]">
      <div className="flex flex-row justify-around md:justify-center items-center w-full bg-[#E8E0C6] py-3 px-12">
        <div
          className={`flex flex-col justify-center items-center md:mr-8 hover:cursor-pointer hover:scale-110 duration-300 ${
            activeSection === "authorInfo" ? "border-b-2 border-[#986F14]" : ""
          }`}
          onClick={() => setActiveSection("authorInfo")}
        >
          <img className="h-10" src={infoIcon} alt="Review Icon" />
          <h1>Author Info</h1>
        </div>
        <div className="bg-[#986F14] w-1 h-16 mx-3 rounded-xl"></div>
        <div
          className={`flex flex-col justify-center items-center md:ml-8 hover:cursor-pointer hover:scale-110 duration-300 ${
            activeSection === "reviews" ? "border-b-2 border-[#986F14]" : ""
          }`}
          onClick={() => setActiveSection("reviews")}
        >
          <svg
            alt="Review Icon"
            className="h-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="#986F14"
            stroke="#986F14"
            stroke-width="0.5"
            viewBox="0 0 24 24"
            id="continue"
          >
            <path d="M15,14a1,1,0,0,1-.71-1.71L17.59,9,14.29,5.71a1,1,0,0,1,1.41-1.41l4,4a1,1,0,0,1,0,1.41l-4,4A1,1,0,0,1,15,14Z"></path>
            <path d="M11,20H7a3,3,0,0,1-3-3V11A3,3,0,0,1,7,8H19a1,1,0,0,1,0,2H7a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h4a1,1,0,0,1,0,2Z"></path>
          </svg>
          <h1>Reviews</h1>
        </div>
      </div>
      {renderSection()}
      <Footer />
    </div>
  );
};

export default BookInfoPage;
