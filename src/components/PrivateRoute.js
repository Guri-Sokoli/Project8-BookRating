import React from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "./auth"; // replace with  auth context or state

function PrivateRoute({ children }) {
    // const auth = useAuth();
    const navigate = useNavigate();

    // React.useEffect(() => {
    //     if (!auth.user) {
    //         navigate("/login");
    //     }
    // }, [auth.user, navigate]);

    // return auth.user ? children : null;
}

export default PrivateRoute;
