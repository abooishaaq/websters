import { API_URL } from "@/constants";

export const createThread = async (title, content) => {
    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            content,
        }),
    });
    const data = await res.json();
    console.log(data);
    return data;
};
