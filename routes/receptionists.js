const express = require("express");
const pool = require('../db.js');

let router = express.Router();


router.get('/all', async (req, res) => {
    try {
        //await pool.connect();
        const stuff = await pool.query(
            `SELECT * FROM employees
            JOIN receptionists USING(employee_number)`);
        res.json(stuff.rows);

    }
    catch (err) {
        console.log("ERROR!!: " + err.message);
    }

})

router.get('/findId:id', async function (req, res) {
    try {
        let { id } = req.params;
        const stuff = await pool.query(
            `SELECT * FROM employees 
            JOIN receptionists USING (employee_number)
            WHERE employee_number = $1`, [id]);

        res.json(stuff.rows);

    }
    catch (err) {
        console.log("ERROR!!: " + err.message);
    }
})

router.get('/findName', async function (req, res) {
    try {
        let { fname, lname } = req.body;
        let stuff;

        if (lname == null) {
            fname = `${fname}%`;
            stuff = await pool.query(
                `SELECT * FROM employees 
                JOIN receptionists USING(employee_number)
                WHERE fname ILIKE $1`
                , [fname]);
        }
        else {
            fname = `${fname}%`;
            lname = `${lname}%`;
            stuff = await pool.query(
                `SELECT * FROM employees 
                JOIN receptionists USING(employee_number)
                WHERE fname ILIKE $1 AND lname ILIKE $2`
                , [fname, lname]);
        }
        console.log(fname);

        res.json(stuff.rows);
    }
    catch (err) {
        console.log("ERROR!!: " + err.message);
    }
})


module.exports = router;