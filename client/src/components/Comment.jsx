import React from "react";

export default function Comment({comment}) {
	console.log(comment)
	return (
		<div className="flex flex-row justify-between align-center p-2 border border-gray-400 m-2">
			<p className="">{comment.comment}</p>
			<p className="text-xs text-gray-400">{comment.author.username}</p>
		</div>
    );
}
