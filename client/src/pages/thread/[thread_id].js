import React from "react";
import { useRouter } from "next/router";
import Comment from "@/components/Comment";

const thread = {
    uid: "123o4ib9483brdkjh9",
    title: "hello I have a question",
    content:
        "HEllo there I have pain in my heart, I thinkn I am havin a heart attack, can i be mysognistic right now?",
    author: {
        userID: "9238f38fn0a7f",
        username: "John Uncle",
    },
    comments: [
        {
            comment:
                "HEllo there I have pain in my heart, I thinkn I am havin a heart attack, can i be mysognistic right now?",
            author: {
                userID: "9238f38fn0a7f",
                username: "John Uncle",
            },
        },
        {
            comment:
                "HEllo there I have pain in my heart, I thinkn I am havin a heart attack, can i be mysognistic right now?",
            author: {
                userID: "9238f38fn0a7f",
                username: "John Uncle",
            },
        },
        {
            comment:
                "HEllo there I have pain in my heart, I thinkn I am havin a heart attack, can i be mysognistic right now?",
            author: {
                userID: "9238f38fn0a7f",
                username: "John Uncle",
            },
        },
        {
            comment:
                "HEllo there I have pain in my heart, I thinkn I am havin a heart attack, can i be mysognistic right now?",
            author: {
                userID: "9238f38fn0a7f",
                username: "John Uncle",
            },
        },
        {
            comment:
                "HEllo there I have pain in my heart, I thinkn I am havin a heart attack, can i be mysognistic right now?",
            author: {
                userID: "9238f38fn0a7f",
                username: "John Uncle",
            },
        },
        {
            comment:
                "HEllo there I have pain in my heart, I thinkn I am havin a heart attack, can i be mysognistic right now?",
            author: {
                userID: "9238f38fn0a7f",
                username: "John Uncle",
            },
        },
        {
            comment:
                "HEllo there I have pain in my heart, I thinkn I am havin a heart attack, can i be mysognistic right now?",
            author: {
                userID: "9238f38fn0a7f",
                username: "John Uncle",
            },
        },
    ],
};

export default function _thread() {
    const router = useRouter();
    const threadID = router.query;
    console.log(router.query);

    if (!threadID) {
        return <>Loading...</>;
    }
    return (
        <div className="w-screen pt-6 p-10 flex flex-col justify-center  align-center">
            <h1 className="text-4xl">{thread.title}</h1>
            <p className="text-lg mb-7">{thread.content}</p>
            <div>
                {thread.comments.map((comment, i) => (
                    <Comment comment={comment} key={i} />
                ))}
            </div>
        </div>
    );
}
