const bcrypt = require("bcrypt");
const prisma = require("../prisma");

const auth = async (password, username) => {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (!user) {
        return false;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return false;
    }

    return user;
}


const register = async (password, username) => {
    const existing_user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (existing_user) {
        return false;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });

    return user;
}

module.exports = {auth, register};