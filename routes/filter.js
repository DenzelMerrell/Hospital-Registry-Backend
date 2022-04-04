const express = require("express");
const pool = require('../db.js');

let router = express.Router();

router.post('/patients', async (req, res) => {
    try {
        const searchConditions = JSON.parse(JSON.stringify(req.body));
        // res.json(searchConditions);
        let keys = Object.keys(searchConditions);
        let values = Object.values(searchConditions);

        let query = `SELECT patients.* 
                    FROM patients
                        JOIN employees ON doctor_number = employee_number
                        JOIN doctors ON doctors.employee_number = employees.employee_number
                    WHERE `;

        console.log("Keys: " + keys);
        console.log("Values: " + values);
        for (let i = 0; i < values.length; i++) {

            //Patient & Employee names
            let Pfname = "", Plname = "", Efname, Elname;

            if (keys[i] == "Pname") {
                if (values[i].includes(" ")) {
                    const names = values[i].split(" ");

                    if (names.length > 2) {
                        //error
                    }
                    else {
                        Pfname = names[0];
                        Plname = names[1];
                    }
                }
                else {
                    Pfname = values[i];
                }
            }

            if (keys[i] == "Ename") {
                if (values[i].includes(" ")) {
                    const names = values[i].split(" ");

                    if (names.length > 2) {
                        //error
                    }
                    else {

                        Efname = names[0];

                        Elname = names[1];
                    }
                }
                else {

                    Efname = values[i];
                }
            }

            if (keys[i] == "patient_number" || keys[i] == "ageMin" || keys[i] == "ageMax" || keys[i] == "ssn" || keys[i] == "room_number")
                values[i] = parseInt(values[i]);

            if (i == values.length - 1) {
                console.log("First If");
                if (Pfname != "" && Plname != "")
                    query += `patients.fname ILIKE '${Pfname}%' AND patients.lname ILIKE '${Plname}%'`;
                else if (Pfname != "" && !Plname != "")
                    query += `patients.fname ILIKE '${Pfname}%'`;
                else if (Efname && Elname)
                    query += `employees.fname ILIKE '${Efname}%' AND employees.lname ILIKE '${Elname}%'`;
                else if (Efname && !Elname)
                    query += `employees.fname ILIKE '${Efname}%'`;
                else if (keys[i] == "ageMin")
                    query += `patients.age >= ${values[i]}`;
                else if (keys[i] == "ageMax")
                    query += `patients.age <= ${values[i]}`;
                else
                    query += `patients.${keys[i]} = ${values[i]}`;
            }
            else {
                console.log("Second If");
                if (Pfname != "" && Plname != "")
                    query += `patients.fname ILIKE '${Pfname}%' AND patients.lname ILIKE '${Plname}%' AND `;
                else if (Pfname != "" && !Plname != "")
                    query += `patients.fname ILIKE '${Pfname}%' AND `;
                else if (Efname && Elname)
                    query += `employees.fname ILIKE '${Efname}%' AND employees.lname ILIKE '${Elname}%' AND`;
                else if (Efname && !Elname)
                    query += `employees.fname ILIKE '${Efname}%' AND `;
                else if (keys[i] == "ageMin")
                    query += `patients.age >= ${values[i]} AND `;
                else if (keys[i] == "ageMax")
                    query += `patients.age <= ${values[i]} AND `;
                else
                    query += `patients.${keys[i]} = ${values[i]} AND `;

                valCounter++;
            }

        }
        // res.json(query);
        const stuff = await pool.query(query);
        res.json(stuff.rows);
    }
    catch (err) {
        console.log(err);
    }

})


router.post('/nurses', async (req, res) => {
    try {
        const searchConditions = JSON.parse(JSON.stringify(req.body));
        // res.json(searchConditions);
        let keys = Object.keys(searchConditions);
        let values = Object.values(searchConditions);

        let query = `SELECT nurses.employee_number, employees.fname, employees.lname, nurses.room_number 
                    FROM nurses
                        JOIN employees ON employees.employee_number = nurses.employee_number
                    WHERE `;

        console.log("Keys: " + keys);
        console.log("Values: " + values);
        for (let i = 0; i < values.length; i++) {

            let fname, lname;

            if (keys[i] == "name") {
                if (values[i].includes(" ")) {
                    const names = values[i].split(" ");

                    if (names.length > 2) {
                        //error
                    }
                    else {
                        fname = names[0];
                        lname = names[1];
                    }
                }
                else {
                    fname = values[i];
                }
            }

            if (keys[i] == "employee_number" || keys[i] == "ageMin" || keys[i] == "ageMax" || keys[i] == "ssn" || keys[i] == "room_number")
                values[i] = parseInt(values[i]);

            if (i == values.length - 1) {
                console.log("First If");
                if (fname && lname)
                    query += `employees.fname ILIKE '${fname}%' AND employees.lname ILIKE '${lname}%'`;
                else if (fname && !lname)
                    query += `employees.fname ILIKE '${fname}%'`;
                else if (keys[i] == "ageMin")
                    query += `employees.age >= ${values[i]}`;
                else if (keys[i] == "ageMax")
                    query += `employees.age <= ${values[i]}`;
                else if (keys[i] == "room_number")
                    query += `nurses.room_number = ${values[i]}`;
                else
                    query += `employees.${keys[i]} = ${values[i]}`;
            }
            else {
                console.log("Second If");
                if (fname && lname)
                    query += `employees.fname ILIKE '${fname}%' AND employees.lname ILIKE '${lname}%' AND `;
                else if (fname && !lname)
                    query += `employees.fname ILIKE '${fname}%' AND `;
                else if (keys[i] == "ageMin")
                    query += `employees.age >= ${values[i]} AND `;
                else if (keys[i] == "ageMax")
                    query += `employees.age <= ${values[i]} AND `;
                else if (keys[i] == "room_number")
                    query += `nurses.room_number = ${values[i]} AND `;
                else
                    query += `employees.${keys[i]} = ${values[i]} AND `;

                valCounter++;
            }

        }

        // res.json(query);
        const stuff = await pool.query(query);
        res.json(stuff.rows);
    }
    catch (err) {
        console.log(err);
    }

})


router.post('/doctors', async (req, res) => {
    try {
        const searchConditions = JSON.parse(JSON.stringify(req.body));
        // res.json(searchConditions);
        let keys = Object.keys(searchConditions);
        let values = Object.values(searchConditions);

        let query = `SELECT doctors.employee_number, employees.fname, employees.lname, doctors.specialty
                    FROM doctors
                        JOIN employees ON employees.employee_number = doctors.employee_number
                    WHERE `;

        console.log("Keys: " + keys);
        console.log("Values: " + values);
        for (let i = 0; i < values.length; i++) {

            let fname, lname;

            if (keys[i] == "name") {
                if (values[i].includes(" ")) {
                    const names = values[i].split(" ");

                    if (names.length > 2) {
                        //error
                    }
                    else {
                        fname = names[0];
                        lname = names[1];
                    }
                }
                else {
                    fname = values[i];
                }
            }

            if (keys[i] == "employee_number" || keys[i] == "ageMin" || keys[i] == "ageMax" || keys[i] == "ssn")
                values[i] = parseInt(values[i]);

            if (i == values.length - 1) {
                console.log("First If");
                if (fname && lname)
                    query += `employees.fname ILIKE '${fname}%' AND employees.lname ILIKE '${lname}%'`;
                else if (fname && !lname)
                    query += `employees.fname ILIKE '${fname}%'`;
                else if (keys[i] == "ageMin")
                    query += `employees.age >= ${values[i]}`;
                else if (keys[i] == "ageMax")
                    query += `employees.age <= ${values[i]}`;
                else if (keys[i] == "specialty")
                    query += `doctors.specialty = ${values[i]}`;
                else
                    query += `employees.${keys[i]} = ${values[i]}`;
            }
            else {
                console.log("Second If");
                if (fname && lname)
                    query += `employees.fname ILIKE '${fname}%' AND employees.lname ILIKE '${lname}%' AND `;
                else if (fname && !lname)
                    query += `employees.fname ILIKE '${fname}%' AND `;
                else if (keys[i] == "ageMin")
                    query += `employees.age >= ${values[i]} AND `;
                else if (keys[i] == "ageMax")
                    query += `employees.age <= ${values[i]} AND `;
                else if (keys[i] == "specialty")
                    query += `doctors.specialty = ${values[i]} AND `;
                else
                    query += `employees.${keys[i]} = ${values[i]} AND `;

                // valCounter++;
            }

        }

        // res.json(query);
        const stuff = await pool.query(query);
        res.json(stuff.rows);
    }
    catch (err) {
        console.log(err);
    }

})

router.post('/receptionists', async (req, res) => {
    try {
        const searchConditions = JSON.parse(JSON.stringify(req.body));
        // res.json(searchConditions);
        let keys = Object.keys(searchConditions);
        let values = Object.values(searchConditions);

        let query = `SELECT receptionists.employee_number, employees.fname, employees.lname 
                    FROM receptionists
                        JOIN employees ON employees.employee_number = receptionists.employee_number
                    WHERE `;

        console.log("Keys: " + keys);
        console.log("Values: " + values);
        for (let i = 0; i < values.length; i++) {

            let fname, lname;

            if (keys[i] == "name") {
                if (values[i].includes(" ")) {
                    const names = values[i].split(" ");

                    if (names.length > 2) {
                        //error
                    }
                    else {
                        fname = names[0];
                        lname = names[1];
                    }
                }
                else {
                    fname = values[i];
                }
            }

            if (keys[i] == "employee_number" || keys[i] == "ageMin" || keys[i] == "ageMax" || keys[i] == "ssn")
                values[i] = parseInt(values[i]);

            if (i == values.length - 1) {
                console.log("First If");
                if (fname && lname)
                    query += `employees.fname ILIKE '${fname}%' AND employees.lname ILIKE '${lname}%'`;
                else if (fname && !lname)
                    query += `employees.fname ILIKE '${fname}%'`;
                else if (keys[i] == "ageMin")
                    query += `employees.age >= ${values[i]}`;
                else if (keys[i] == "ageMax")
                    query += `employees.age <= ${values[i]}`;
                else
                    query += `employees.${keys[i]} = ${values[i]}`;
            }
            else {
                console.log("Second If");
                if (fname && lname)
                    query += `employees.fname ILIKE '${fname}%' AND employees.lname ILIKE '${lname}%' AND `;
                else if (fname && !lname)
                    query += `employees.fname ILIKE '${fname}%' AND `;
                else if (keys[i] == "ageMin")
                    query += `employees.age >= ${values[i]} AND `;
                else if (keys[i] == "ageMax")
                    query += `employees.age <= ${values[i]} AND `;
                else
                    query += `employees.${keys[i]} = ${values[i]} AND `;
            }

        }

        // res.json(query);
        const stuff = await pool.query(query);
        res.json(stuff.rows);
    }
    catch (err) {
        console.log(err);
    }

})

module.exports = router;