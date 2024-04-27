import React, { useState } from "react";
import { Link } from "react-router-dom";
import home from "../../assets/home.svg";
// import { useHistory } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [displayMessage, setDisplayMessage] = useState("");
    // const history = useHistory(); // Get the history object

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                process.env.REACT_APP_BACKEND_URL + "/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                // Redirect to the bookshelf page upon successful login
                window.location.href = "/bookshelf";
            } else {
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
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle error, e.g. by showing a message to the user
        }
    };

    return (
        <div className="flex flex-col justify- items-center bg-[#59461B]">
            <wrapper className="flex flex-col bg-[#FFF7E7] w-full">
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
                    Access / Log In
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
                    <Link to="/author-login" className="underline">
                        Log In Here
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
                        onChange={handleSubmit}
                        className="rounded-xl border-2 border-[#59461B] p-1 py-2 px-2 max-w-64"
                        required
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
                        type="email"
                        onChange={handleSubmit}
                        className="rounded-xl border-2 border-[#59461B] p-1 py-2 px-2 max-w-64"
                        required
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
                        onChange={handleSubmit}
                        className="rounded-xl border-2 border-[#59461B] p-1 py-2 px-2 max-w-64"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#59461B] font-semibold text-white rounded-lg p-2 mt-4 md:px-12"
                >
                    Log In
                </button>

                <p style={{ color: "red" }}>{displayMessage}</p>

                <h2 className="text-[#59461B] font-semibold text-lg text-center mt-8">
                    Don't have an account?{" "}
                    <Link to="/signup" className="underline">
                        Sign Up Here
                    </Link>
                </h2>
            </form>
        </div>
    );
};

export default Login;
