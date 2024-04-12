/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./bookreviewapp.client/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                Raleway: ["Raleway", "sans-serif"],
            },
        },
    },
    plugins: [],
};
