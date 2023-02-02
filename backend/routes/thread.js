const zod = require("zod");
const threads = require("../lib/thread");

const commentSchema = zod.object({
    content: zod.string(),
    threadId: zod.number(),
});

const createThreadSchema = zod.object({
    title: zod.string(),
    content: zod.string(),
});

const threadRoutes = (app) => {
    app.get("/threads", async (request, reply) => {
        const ts = await threads.getThreads();
        reply.send({ threads: ts });
    });

    app.get("/threads/:id", async (request, reply) => {
        const { id } = zod.object({ id: zod.number() }).parse(request.params);
        const thread = await threads.getThread(id);
        return reply.send({ thread });
    });

    app.post("/comment", async (request, reply) => {
        const { content, threadId } = commentSchema.parse(request.body);

        await threads.createComment(content, threadId, request.user.id);

        return reply.status(200);
    });

    app.post("/create-thread", async (request, reply) => {
        const { title, content } = createThreadSchema.parse(request.body);

        await threads.createThread(title, content, request.user.id);

        return reply.status(200);
    });

    return app;
};


module.exports = threadRoutes;