import { useState } from "react";
import notify from "../util/notify";
import { API_URL } from "@/constants";
import { createThread } from "@/lib/create-thread";

export default function CreateThread() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const onSubmit = async () => {
        if (!title) notify({ type: "warn", message: "Please enter a title" });
        if (!content) notify({ type: "warn", message: "Please enter a title" });
        try {
            const thread = await createThread(title, content);
            if (thread.error) {
                notify({ type: "error", message: thread.error });
            } else {
                notify({ type: "success", message: "Thread created" });
            }
        } catch (e) {
            notify({ type: "error", message: "Something went wrong" });
        }
    };
    return (
        <>
            <div className="w-max flex flex-col justify-center items-start m-auto">
                <h1 className="text-5xl m-4">Create a Thread</h1>
                <input
                    className="text-xl m-1 w-full p-1"
                    placeholder="Thread Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="text-xl m-1 w-full p-1"
                    placeholder="Thread Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    className="text-xl m-1 bg-red-400 p-2 pl-10 pr-10"
                    onClick={onSubmit}
                >
                    Create
                </button>
            </div>
        </>
    );
}
