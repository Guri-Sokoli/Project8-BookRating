import { useEffect, useState } from "react";
import "./index.css";
import Header from "./Components/Header";

function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents =
        forecasts === undefined ? (
            <p>
                <em>
                    Loading... Please refresh once the ASP.NET backend has
                    started. See{" "}
                    <a href="https://aka.ms/jspsintegrationreact">
                        https://aka.ms/jspsintegrationreact
                    </a>{" "}
                    for more details.
                </em>
            </p>
        ) : (
            <table aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map((forecast) => (
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

    return (
        <div className="bg-[#FFF7E7] w-screen">
            {/* <h1 id="tabelLabel" className="font-">
                Weather forecast
            </h1>
            <p className="font-Raleway font-bold">
                This component demonstrates fetching data from the server.
            </p>
            {contents} */}
            <Header />

            {/* Not signed in screen

            <HomePageContent />*/}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch("weatherforecast");
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;
