import Header from "./Components/header.js";
import LeftOffBook from "./Components/leftOffBook.js";
import PopularSection from "./Components/popularSectionHome.js";
import ReccomendationSection from "./Components/ReccomendationSection.js";
import FooterHome from "./Components/footerHome.js";

const popBooks = [
    {
        title: "Title of Book 1",
        author: "Author of Book 1",
        initialRating: 2.9,
        isEditable: true,
    },
    {
        title: "Title of Book 2",
        author: "Author of Book 2",
        initialRating: 4.5,
        isEditable: true,
    },
    {
        title: "Title of Book 3",
        author: "Author of Book 3",
        initialRating: 5,
        isEditable: true,
    },
    {
        title: "Title of Book 4",
        author: "Author of Book 4",
        initialRating: 3.4,
        isEditable: true,
    },
    {
        title: "Title of Book 3",
        author: "Author of Book 3",
        initialRating: 5,
        isEditable: true,
    },
    {
        title: "Title of Book 4",
        author: "Author of Book 4",
        initialRating: 3.4,
        isEditable: true,
    },
    {
        title: "Title of Book 3",
        author: "Author of Book 3",
        initialRating: 5,
        isEditable: true,
    },
    {
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

const leftOffBook = {
    bookName: "Title of Book",
    percentageRead: 50,
    cover: "",
};

function App() {
    return (
        <div className="bg-[#FFF7E7]">
            <Header />

            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-[#59461B] mt-6">
                Welcome to BetterReads
            </h1>
            <h1 className="text-lg sm:text-xl md:text-2xl text-center my-6 mx-12 text-[#59461B]">
                Lorem 20Aute proident ad aliqua fugiat deserunt officia amet
                adipisicing Lorem aliquip Lorem sunt proident.
            </h1>
            <LeftOffBook book={leftOffBook} />

            <div className="w-full text-2xl md:text-4xl text-[#59461B] font-bold py-8 pl-12">
                Popular Now
            </div>
            <PopularSection books={popBooks} />

            <div className="w-full text-2xl md:text-4xl text-[#59461B] font-bold py-8 pl-12">
                Reccomendation
            </div>
            <ReccomendationSection books={recBooks} />

            <FooterHome />
        </div>
    );
}

export default App;
