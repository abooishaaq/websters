import { useRef } from "react";

export default function useAuth() {
    const loggedIn = useRef(false);

    const login = () => {
        loggedIn.current = true;
    };

    const logout = () => {
        loggedIn.current = false;
    };

    const isLoggedIn = () => {
        return loggedIn.current;
    };

    return {
        login,
        logout,
        isLoggedIn,
    };
}
