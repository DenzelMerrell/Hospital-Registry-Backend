const express = require("express");
const pool = require('../db.js');

let router = express.Router();


router.get('/all', async (req, res) => {
    try {
        //await pool.connect();
        const stuff = await pool.query(
            `SELECT * FROM employees
            JOIN doctors USING(employee_number)`);
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
            JOIN doctors USING (employee_number) 
            WHERE employee_number = $1`, [id]);

        res.json(stuff.rows);

    }
    catch (err) {
        console.log("ERROR!!: " + err.message);
    }
})

router.get('/findName:name', async function (req, res) {
    try {
        let { name } = req.params;
        let fname, lname;
        let stuff;

        if (name.includes(" ")) {
            const names = name.split(" ");

            if (names.length > 2) {
                //error
            }
            else {
                fname = names[0];
                lname = names[1];
            }
        }
        else {
            fname = name;
        }

        if (!lname) {
            fname = `${fname}%`;
            stuff = await pool.query(
                `SELECT * FROM employees 
                JOIN doctors USING(employee_number)
                WHERE fname ILIKE $1`
                , [fname]);
        }
        else {
            fname = `${fname}%`;
            lname = `${lname}%`;
            stuff = await pool.query(
                `SELECT * FROM employees 
                JOIN doctors USING(employee_number)
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