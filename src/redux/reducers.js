import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actions";

const initialState = {
    isLoading: false,
    username: null,
    isLoggedIn: false,
    error: null,
};

export const loginReducer = (state = initialState, action) => {
    console.log("State:", state);
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, error: null };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                username: action.payload.username,
            };
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        case LOGOUT:
            return {
                ...initialState,
                isLoggedIn: false,
                username: "",
            };
        default:
            return state;
    }
};
