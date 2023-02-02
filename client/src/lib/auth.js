import { createContext } from "react";

const initialState = {
    user: null,
    token: null,
};

export const AuthContext = createContext(initialState);
