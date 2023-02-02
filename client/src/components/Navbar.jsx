import React from "react";

const user = {
    username: "alsjdflj",
};
export default function Navbar() {
    return (
        <nav className="flex flex-row items-center justify-end pt-7 pb-5 pr-20 w-screen bg-red-300 text-2xl">
            {user ? (
                <a href="/">{user.username}</a>
            ) : (
                <a href="/login">Login</a>
            )}
        </nav>
    );
}
