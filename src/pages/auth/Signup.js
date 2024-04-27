import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import home from "../../assets/home.svg";

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [displayMessage, setDisplayMessage] = useState(""); // Add this line

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5108/api/Auth/register/user",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    if (errorData.errors.Email) {
                        // Display email error
                        setDisplayMessage(errorData.errors.Email[0]);
                    }
                    if (errorData.errors.Password) {
                        // Display password error
                        setDisplayMessage(errorData.errors.Password[0]);
                    }
                }
            } else {
                // Handle successful signup, e.g. by redirecting to login page
                console.log("User was created successfully");
                setDisplayMessage("User was created successfully");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setDisplayMessage("An error occurred");
        }
    };

    //         if (response.data.newUser) {
    //             setDisplayMessage("A new user was created"); // Add this line
    //         } else {
    //             setDisplayMessage("User already existed"); // Add this line
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.status === 400) {
    //             // Handle 400 error. If the error response has a message, display it
    //             const errorMessage = error.response.data.errors.Password[0];
    //             setDisplayMessage(errorMessage); // Display the error message to the user
    //         } else {
    //             setDisplayMessage("An error occurred"); // Add this line
    //         }
    //     }
    // };

    return (
        <div className="flex flex-col justify- items-center bg-[#59461B] w-screen h-screen">
            <wrapper className="flex flex-col bg-[#FFF7E7] w-screen">
                <div
                    className="flex items-center justify-around py-4
                        md:w-full"
                >
                    <div className="text-3xl sm:text-4xl md:text-5xl text-[#59461B]">
                        <Link to="/">bR</Link>
                    </div>
                </div>
            </wrapper>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-[#FFF7E7] w-2/3 md:w-1/3 md:items-center md:justify-center p-12 m-12"
            >
                <h1 className="text-[#59461B] font-semibold text-5xl text-center">
                    bR
                </h1>
                <h2 className="text-[#59461B] font-semibold text-2xl text-center pt-2">
                    Regjistration / Sign Up
                </h2>
                <h3 className="text-[#ABABAB] text-md text-center py-2  ">
                    For{" "}
                    <a className="underline underline-offset-2 text-black font-normal">
                        Readers
                    </a>{" "}
                    Only
                </h3>
                <h2 className="text-[#59461B] font-semibold text-md text-center pb-2">
                    Are you an author?{" "}
                    <Link to="/author-signup" className="underline">
                        Sign Up Here
                    </Link>
                </h2>
                <div className="flex flex-col  text-[#59461B]">
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
                    />
                </div>
                <div className="flex flex-col  text-[#59461B]">
                    <label
                        htmlFor="email"
                        className="text-lg pt-2 pb-1 font-semibold"
                    >
                        email
                    </label>
                    <input
                        name="email"
                        onChange={handleChange}
                        className="rounded-xl border-2 border-[#59461B] p-1 py-2 px-2 max-w-64"
                    />
                </div>
                <div className="flex flex-col  text-[#59461B]">
                    <label
                        htmlFor="password"
                        className="text-lg pt-2 pb-1 font-semibold"
                    >
                        Password
                    </label>
                    <input
                        type=""
                        name="password"
                        onChange={handleChange}
                        className="rounded-xl border-2 border-[#59461B] p-1 py-2 px-2 max-w-64"
                    />
                </div>

                <p style={{ color: "green" }}>{displayMessage}</p>

                <button
                    type="submit"
                    className="bg-[#59461B] font-semibold text-white rounded-lg p-2 mt-4 md:px-12"
                >
                    Sign Up
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
