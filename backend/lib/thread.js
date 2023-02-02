const prisma = require("../prisma");

const createThread = async (title, content, userId) => {
    const thread = await prisma.thread.create({
        data: {
            title,
            content,
            author: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    return thread;
};

// paginate
const getThreads = () => {
    return prisma.thread.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
}

const getThread = async (id) => {
    const thread = await prisma.thread.findUnique({
        where: {
            id,
        },
    });
    return thread;
}

const createComment = async (content, threadId, authorId) => {
    const comment = await prisma.comment.create({
        data: {
            content,
            thread: {
                connect: {
                    id: threadId,
                },
            },
            author: {
                connect: {
                    id: authorId,
                }
            }
        },
    });
    return comment;
}

module.exports = { createThread, getThreads, getThread, createComment };
