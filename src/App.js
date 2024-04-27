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
// import PrivateRoute from "./components/PrivateRoute";
import ProtectedPage from "./pages/ProtectedPage";
import BookshelfPage from "./pages/BookshelfPage";
import BookPage from "./pages/BookPage.js";

// Inside your Router component

const App = () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
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
                <Route
                    path="/bookshelf"
                    element={
                        isLoggedIn ? (
                            <BookshelfPage />
                        ) : (
                            <Navigate to="/bookshelf" />
                        )
                    }
                />
                <Route path="/profile" element={<ProtectedPage />} />
                <Route path="/book/:bookId" element={<BookPage isLoggedIn />} />
            </Routes>
        </Router>
    );
};

export default App;
