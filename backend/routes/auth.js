
const zod = require("zod");
const jwt = require("jsonwebtoken");
const auth = require("../lib/auth");

const loginSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});

const authRoutes = (app) => {
    app.get("/api/login", async (request, reply) => {
        const { username, password } = loginSchema.parse(request.body);
        const user = await auth.auth(password, username);
        if (!user && typeof user !== "object") {
            reply.status(401).send({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        reply.header("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600;`);
    });

    app.post("/api/register", async (request, reply) => {
        const { username, password } = loginSchema.parse(request.body);

        const user = await auth.register(password, username);
        if (!user) {
            reply.status(401).send({ error: "Username already exists" });
        }

        reply.status(200).send({ message: "User created" });
    });

    app.get("/api/me", async (request, reply) => {
        reply.send({ user: request.user });
    });

    return app;
}

module.exports = authRoutes;
