import React from "react";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import AuthorSignup from "./pages/auth/AuthorSignup";
import AuthorLogin from "./pages/auth/AuthorLogin";
import PrivateRoute from "./Components/PrivateRoute";
import ProtectedPage from "./pages/ProtectedPage";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Routes>
                <Route
                    path="/signup"
                    element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
                />
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/"
                    element={
                        <HomePage
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                        />
                    }
                />
                <Route
                    path="/protected"
                    element={
                        isLoggedIn ? (
                            <ProtectedPage />
                        ) : (
                            <Navigate to="/signup" />
                        )
                    }
                />
                <Route
                    path="/author-signup"
                    element={
                        isLoggedIn ? <Navigate to="/" /> : <AuthorSignup />
                    }
                />
                <Route
                    path="/author-login"
                    element={isLoggedIn ? <Navigate to="/" /> : <AuthorLogin />}
                />
            </Routes>
        </Router>
    );
};

export default App;

{
    /* 
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import Login from "./pages/auth/Login.js";
import Signup from "./pages/auth/Signup.js";
import AuthorLogin from "./pages/auth/AuthorLogin.js";
import AuthorSignup from "./pages/auth/AuthorSignup.js";

import { Navigate } from "react-router-dom";

import ProtectedPage from "../src/pages/ProtectedPage.js";
import PrivateRoute from "./Components/PrivateRoute.js";

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

const isLoggedIn = false;

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage isLoggedIn={isLoggedIn} />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/author-login" element={<AuthorLogin />} />
                <Route
                    path="/author-signup"
                    element={
                        isLoggedIn ? <Navigate to="/" /> : <AuthorSignup />
                    }
                />
//                <PrivateRoute path="/protected" component={ProtectedPage} /> 
                </Routes>
                </Router>
            );
        }
        
        export default App;
        
*/
}
