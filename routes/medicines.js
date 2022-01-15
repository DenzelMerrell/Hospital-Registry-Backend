const express = require("express");
const pool = require('../db.js');

let router = express.Router();


router.get('/all', async (req, res) => {
    try {
        //await pool.connect();
        const stuff = await pool.query(`SELECT * FROM medicines`);
        res.json(stuff.rows);

    }
    catch (err) {
        console.log("ERROR!!: " + err.message);
    }

})

router.get('/findByCode:code', async function (req, res) {
    try {
        let { code } = req.params;
        const stuff = await pool.query(
            `SELECT * FROM medicines
            WHERE medicine_code = $1`, [code]);

        res.json(stuff.rows);

    }
    catch (err) {
        console.log("ERROR!!: " + err.message);
    }
})

router.get('/priceRange', async function (req, res) {
    try {
        let { lowerBound, upperBound } = req.body;

        const stuff = await pool.query(
            `SELECT * FROM medicines
            WHERE medicine_price >= $1 AND medicine_price <= $2`, [lowerBound, upperBound]);

        res.json(stuff.rows);

    }
    catch (err) {
        console.log("ERROR!!: " + err.message);
    }
})



module.exports = router;