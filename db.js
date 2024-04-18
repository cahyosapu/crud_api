const pgp = require ('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'crud_api',
    user: 'postgres',
    password: 'asdf1234'
})

module.exports = db;