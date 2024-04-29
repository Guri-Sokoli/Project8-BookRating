import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = "http://172.213.168.6/";

const api = axios.create({
    baseURL: `${baseURL}api`,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);

export { baseURL };
export default api;
