import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/constants";
import { AuthContext } from "@/lib/auth";
import { useContext } from "react";

export default function Login() {
    const router = useRouter();
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then(async (res) => {
            if (res.ok) {
                router.push("/");
                const { user, token } = await res.json();
                
                auth.login(user, token);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <main className="flex flex-col w-screen h-screen items-center">
                <h3 className="text-3xl my-12">Login</h3>
                <form className="grid grid-cols-2 gap-2" onSubmit={onSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={onUsernameChange}
                        className="px-2 py-1 rounded"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={onPasswordChange}
                        className="px-2 py-1 rounded"
                    />
                    <button type="submit" className="col-span-2 bg-red-400 rounded">
                        Login
                    </button>
                </form>
            </main>
        </>
    );
}
