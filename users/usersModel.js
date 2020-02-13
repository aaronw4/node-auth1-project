const db = require('../data/db.config');

function find() {
    return db('users')
};

function add(user) {
    return db('users')
        .insert(user, 'id')
}

function findBy(filter) {
    return db('users')
        .select('id', 'userName', 'password')
        .where(filter);
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({id})
        .first()
}

module.exports = {
    find,
    add,
    findById,
    findBy
}