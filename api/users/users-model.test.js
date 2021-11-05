const User = require('./users-model.js');
const db = require('../../data/dbConfig.js');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

test('enviroment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('[GET] users', () => {
    let users
    beforeEach(async () => {
        users = await Users.get()
    })
    test('returns all users', async () => {
        expect(users).toHaveLength(3)
    })
    test('users returned are of the correct shape', async () => {
        expect(users).toMatchObject([
            { id: 1, name: 'leo'},
            { id: 2, name: 'gabe'},
            { id: 3, name: 'james'}
        ])
    })
})
describe('[GetById] users', () => {
    test('gets the correct user by its id', async () => {
        const leo = await Users.getById(1)
        expect(leo).toMatchObject({ name: "leo" })
        const gabe = await Users.getById(2)
        expect(gabe).toMatchObject({ name: "gabe" })
    })
})
describe('User.insert(hobbit)', () => {
    test("inserting a hobbit causes 4 users to exist in db", async () => {
        await Users.insert({ name: 'boris' })
        const users = await db('users')
        expect(users).toHaveLength(4)
    })
    test('inserting a user resolves to the new user', async () => {
        const newUser = await Users.insert({ name: 'boris' })
        expect(newUser).toMatchObject({ id: 4, name: 'boris' })
    })
})
describe('[REMOVE] users', () => {
    test("deleting a user causes 2 users to exist in db", async () => {
        await Users.remove(1)
        const users = await db('users')
        expect(users).toHaveLength(2)
    })
})