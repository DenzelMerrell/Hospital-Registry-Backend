const express = require("express");
const app = express();
const cors = require("cors");
// const port = process.env.PORT || 5000;

//require routes 
const patients = require('./routes/patients.js');
const employees = require('./routes/employees.js');
const nurses = require('./routes/nurses.js');
const receptionists = require('./routes/receptionists.js');
const medicines = require('./routes/medicines.js');
const doctors = require('./routes/doctors.js');
const filter = require('./routes/filter.js');

//middleware
app.use(cors());
app.use(express.json());

app.use('/patients', patients);
app.use('/employees', employees);
app.use('/nurses', nurses);
app.use('/receptionists', receptionists);
app.use('/medicines', medicines);
app.use('/doctors', doctors);
app.use('/filter', filter);

app.listen(5000, () => {
    console.log("server has started on port 5000");
});