const fastify = require("fastify");
const authRoutes = require("./routes/auth");
const threadRoutes = require("./routes/thread");
const jwt = require("jsonwebtoken");

const app = fastify();

app.register((appp) => {
    appp.register(authRoutes);
    appp.register(threadRoutes);
});

app.listen({
    port: 3000,
}).then(() => {
    console.log("Server started");
});
