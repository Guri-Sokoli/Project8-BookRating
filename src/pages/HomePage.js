import Header from "../components/Header.js";
import LastReadBook from "../components/LastReadBook.js";
import PopularSectionHome from "../components/PopularSectionHome.js";
import RecommendationSection from "../components/RecommendationSection.js";
import api from "../config/config.js";
import Footer from "../components/Footer.js";

import { useState, useEffect } from "react";

function HomePage({ isLoggedIn, setIsLoggedIn }) {
    const [popBooks, setPopBooks] = useState([]);

    useEffect(() => {
        api.get("/Books")
            .then((response) => {
                if (response.data.isValid) {
                    const { booksResponse } = response.data;
                    setPopBooks(booksResponse);
                }
            })
            .catch((error) => {})
            .finally(() => {});
    }, []);

    return (
        <div className="bg-[#FFF7E7]">
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-[#59461B] my-12">
                Welcome to BetterReads
            </h1>

            {/* {isLoggedIn && <LastReadBook book={lastReadBook} />} */}

            <div className="w-full text-2xl md:text-4xl text-[#59461B] font-bold py-8 pl-12">
                Popular Now
            </div>
            <PopularSectionHome books={popBooks} />

            {/* <div className="w-full text-2xl md:text-4xl text-[#59461B] font-bold py-8 pl-12">
                Reccomendation
            </div> */}
            {/* <RecommendationSection books={recBooks} /> */}

            <Footer />
        </div>
    );
}

export default HomePage;
