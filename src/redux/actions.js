import api from "../config/config";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const login = (credentials) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        api.post("/Auth/login", credentials)
            .then((response) => {
                const { token, role } = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                localStorage.setItem("user", credentials.username);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { username: credentials.username },
                });
            })
            .catch((error) => {
                dispatch({
                    type: LOGIN_FAILURE,
                    error: error.response
                        ? error.response.data.message
                        : "Login failed",
                });
            });
    };
};

export const handleLogout = () => {
    return (dispatch) => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        dispatch({ type: LOGOUT });
    };
};
