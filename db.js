const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"bookstore",
    password:"51204123",
    port:5433
});

module.exports = pool;
