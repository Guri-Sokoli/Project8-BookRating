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
// import PrivateRoute from "./components/PrivateRoute";
import ProtectedPage from "./pages/ProtectedPage";
import BookshelfPage from "./pages/BookshelfPage";
import BookPage from "./pages/BookPage.js";

import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage.js";
import { useSelector } from "react-redux";

// Inside your Router component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "./redux/actions";

const App = () => {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("user");

        //It's okay to not validate on first entry since token is validate in each request also
        if (token && username) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { username: username },
            });
        }
    }, []);

    return (
        <Router>
            <ToastContainer />

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
                    element={<HomePage isLoggedIn={isLoggedIn} />}
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
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/book/:id" element={<BookPage />} />
            </Routes>
        </Router>
    );
};

export default App;
