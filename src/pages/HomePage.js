import Header from "../components/Header.js";
import LastReadBook from "../components/LastReadBook.js";
import PopularSection from "../components/PopularSectionHome.js";
import RecommendationSection from "../components/RecommendationSection.js";
import FooterHome from "../components/FooterHome.js";

const popBooks = [
    {
        id: 1,
        title: "Title of Book 1",
        author: "Author of Book 1",
        initialRating: 2.9,
        isEditable: true,
    },
    {
        id: 2,
        title: "Title of Book 2",
        author: "Author of Book 2",
        initialRating: 4.5,
        isEditable: true,
    },
    {
        id: 3,
        title: "Title of Book 3",
        author: "Author of Book 3",
        initialRating: 5,
        isEditable: true,
    },
    {
        id: 4,
        title: "Title of Book 4",
        author: "Author of Book 4",
        initialRating: 3.4,
        isEditable: true,
    },
    {
        id: 5,
        title: "Title of Book 3",
        author: "Author of Book 3",
        initialRating: 5,
        isEditable: true,
    },
    {
        id: 6,
        title: "Title of Book 4",
        author: "Author of Book 4",
        initialRating: 3.4,
        isEditable: true,
    },
    {
        id: 7,
        title: "Title of Book 3",
        author: "Author of Book 3",
        initialRating: 5,
        isEditable: true,
    },
    {
        id: 8,
        title: "Title of Book 4",
        author: "Author of Book 4",
        initialRating: 3.4,
        isEditable: true,
    },
];

const recBooks = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        description:
            "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive...",
        cover: "",
        rating: 4.5,
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        description:
            "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive...",
        cover: "",
        rating: 4.5,
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        description:
            "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive...",
        cover: "",
        rating: 4.5,
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        description:
            "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive...",
        cover: "",
        rating: 4.5,
    },
];

const lastReadBook = {
    bookName: "Title of Book",
    percentageRead: 50,
    cover: "",
};
function HomePage({ isLoggedIn, setIsLoggedIn }) {
    return (
        <div className="bg-[#FFF7E7]">
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-[#59461B] mt-12">
                Welcome to BetterReads
            </h1>
            <h1 className="text-lg sm:text-xl md:text-2xl text-center my-6 mx-12 text-[#59461B]">
                Lorem 20Aute proident ad aliqua fugiat deserunt officia amet
                adipisicing Lorem aliquip Lorem sunt proident.
            </h1>
            {isLoggedIn && <LastReadBook book={lastReadBook} />}

            <div className="w-full text-2xl md:text-4xl text-[#59461B] font-bold py-8 pl-12">
                Popular Now
            </div>
            <PopularSection books={popBooks} />

            <div className="w-full text-2xl md:text-4xl text-[#59461B] font-bold py-8 pl-12">
                Reccomendation
            </div>
            <RecommendationSection books={recBooks} />

            <FooterHome />
        </div>
    );
}

export default HomePage;
