import * as faker from '@faker-js/faker;

const fakeacc = () => {
    const account = {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        desc: faker.lorem.paragraph(),
    };
    return account;
}

export default fakeacc;
