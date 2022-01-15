const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Ty3455",
    host: "localhost",
    port: 5432,
    database: "Hospital"
});

module.exports = pool;