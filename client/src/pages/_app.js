import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/lib/auth";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <AuthContext.Provider value={{ user: null, token: null }}>
                <Component {...pageProps} />
            </AuthContext.Provider>
        </>
    );
}
