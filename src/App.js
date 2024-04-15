import Header from "./Components/header.js";
import LeftOffBook from "./Components/recommendation.js";
import PopularSection from "./Components/popularSectionHome.js";
const books = [
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
];

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
            <LeftOffBook />

            <h1 className="w-full text-2xl md:text-4xl text-[#59461B] font-bold py-8 pl-12">
                Popular Now
            </h1>

            <PopularSection books={books} />
        </div>
    );
}

export default App;
