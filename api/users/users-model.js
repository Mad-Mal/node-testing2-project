const db = require('../../data/dbConfig.js');

function get() {
    return db('users');
}

function getById(id) {
    return db('users').where('id', id).first();
}

async function insert(user) {
    const [id] = await db('users').insert(user)
    return getById(id);
}

function remove(id) {
    return db('users').where({ id }).del();
}

module.exports = {
    get,
    getById,
    insert,
    remove,
}