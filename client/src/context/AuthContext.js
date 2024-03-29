import {createContext, useReducer} from  'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user: {
        _id: "65e9716f4d5dcc0e817044c0",
        username: "hey",
        email: "blakeo@gmail.com",
        profilePicture: "person/4.jpeg",
        coverPicture: "",
        isAdmin: false,
        followers: [],
        followings: [],
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}