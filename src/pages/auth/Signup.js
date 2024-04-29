import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsLoading(true); // Set loading state
        api.post("/Auth/register", formData)
            .then((response) => {
                if (response.data.isValid) {
                    toast.success(
                        "Registered successfully! You will be redirected to login!"
                    );
                    setTimeout(() => {
                        navigate("/login");
                    }, 5000);
                } else {
                    toast.error("Please try again later!");
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setError(error.response.data.message); // Set error state
            })
            .finally(() => {
                setIsLoading(false); // Reset loading state
            });
    };

    return (
        <div className="flex flex-col justify-center items-center bg-[#59461B] w-screen h-screen">
            <form
                onSubmit={handleRegister} // Change to handleRegister
                className="flex flex-col bg-[#FFF7E7] w-2/3 md:w-1/3 md:items-center md:justify-center p-12 m-12"
            >
                <h1 className="text-[#59461B] font-semibold text-5xl text-center">
                    bR
                </h1>
                <h2 className="text-[#59461B] font-semibold text-2xl text-center pt-2">
                    Registration / Sign Up
                </h2>
                {/* Username input field */}
                <div className="flex flex-col text-[#59461B]">
                    <label
                        htmlFor="username"
                        className="text-lg pt-2 pb-1 font-semibold"
                    >
                        Username
                    </label>
                    <input
                        name="username"
                        onChange={handleChange}
                        className="rounded-xl border-2 border-[#59461B] p-1 py-2 px-2 max-w-64"
                        required
                    />
                </div>
                {/* Email input field */}
                <div className="flex flex-col text-[#59461B]">
                    <label
                        htmlFor="email"
                        className="text-lg pt-2 pb-1 font-semibold"
                    >
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        className="rounded-xl border-2 border-[#59461B] p-1 py-2 px-2 max-w-64"
                        required
                    />
                </div>

                {/* Password input field */}
                <div className="flex flex-col text-[#59461B]">
                    <label
                        htmlFor="password"
                        className="text-lg pt-2 pb-1 font-semibold"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="rounded-xl border-2 border-[#59461B] p-1 py-2 px-2 max-w-64"
                        required
                    />
                </div>
                {/* Display error message */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                    type="submit"
                    className="bg-[#59461B] font-semibold text-white rounded-lg p-2 mt-4 md:px-12"
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}{" "}
                    {/* Change button text based on loading state */}
                </button>
                <h2 className="text-[#59461B] font-semibold text-lg text-center mt-8">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                        Log In Here
                    </Link>
                </h2>
            </form>
        </div>
    );
};

export default Signup;
