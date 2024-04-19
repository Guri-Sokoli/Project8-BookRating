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
