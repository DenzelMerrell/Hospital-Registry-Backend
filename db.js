const Pool = require('pg').Pool;
require("dotenv").config();

// const pool = new Pool({
//     user: "postgres",
//     password: "Ty3455",
//     host: "localhost",
//     port: 5432,
//     database: "Hospital"
// });

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
    // ssl: true
}


const proConfig = {
    connectionString: process.env.DATABASE_URL
}


const pool = new Pool(process.env.NOD_ENV === "production" ? proConfig : devConfig);



// const pool = new Pool({
//     connectionString: "postgres://zclsenwtdvczyv:ed8313fa180923a10063f18c797d27fa39d1b169de96894351688732e3f8ddb8@ec2-3-229-161-70.compute-1.amazonaws.com:5432/dfpcpnrrd64tch",
//     // ssl: true
// });

module.exports = pool;

