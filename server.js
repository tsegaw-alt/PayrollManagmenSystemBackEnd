const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const User = db.user;
const Company = db.company;

db.sequelize.sync({alter: true});
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { alter: true }');
//   initial();
// });
initial();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to payroll application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/company.routes')(app);
require('./app/routes/employee.routes')(app);
require('./app/routes/branch.routes')(app);
require('./app/routes/position.routes')(app);
require('./app/routes/overtime.routes')(app);
require('./app/routes/department.routes')(app);
require('./app/routes/payroll.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  let password = 'admin@admin.com'
  User.create({
    id:1,
    username:"admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync(password, 8),
    role: "Accountant"
  });
  Company.create({
    id: 1,
    Name: 'Company Name'
  });
}