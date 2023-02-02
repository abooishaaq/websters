import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

const ThreadList = () => {
    const { data: threads } = useSWR("posts", fetcher);

    if (!threads) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2 className="text=2xl">Threads</h2>
            {threads.map((thread) => (
                <div key={thread.id}>
                    <h3>{thread.title}</h3>
                    <p>{thread.content}</p>
                </div>
            ))}
        </>
    );
};

export default function Home() {
    return (
        <>
            <Head>
                <title>Health Tips and Forum</title>
                <meta
                    name="description"
                    content="Post your health related forums, and see how other people manage their health"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col">
                <ThreadList />
            </div>
        </>
    );
}
