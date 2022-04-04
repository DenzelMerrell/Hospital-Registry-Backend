const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "Ty3455",
//     host: "localhost",
//     port: 5432,
//     database: "Hospital"
// });


// const pool = new Pool({
//     user: "zclsenwtdvczyv",
//     password: "ed8313fa180923a10063f18c797d27fa39d1b169de96894351688732e3f8ddb8",
//     host: "ec2-3-229-161-70.compute-1.amazonaws.com",
//     port: 5432,
//     database: "dfpcpnrrd64tch",
//     ssl: true
// });

const pool = new Pool({
    connectionString: "postgres://zclsenwtdvczyv:ed8313fa180923a10063f18c797d27fa39d1b169de96894351688732e3f8ddb8@ec2-3-229-161-70.compute-1.amazonaws.com:5432/dfpcpnrrd64tch",
    // ssl: true
});

module.exports = pool;

