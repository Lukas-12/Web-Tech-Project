const { Pool } = require('pg');

let cfg = require('./config.json')

let pool = new Pool({
    user: cfg.database.user,
    host: cfg.database.host,
    database: cfg.database.db,
    passwort: cfg.database.password,
    port: 5432,
})

module.exports = pool;