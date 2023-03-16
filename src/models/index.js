const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.company = require("./company.model")(sequelize,Sequelize);
db.employee = require("./employee.model")(sequelize, Sequelize);
db.resignedEmployee = require("./resignedEmployee.model")(sequelize,Sequelize);
db.branch = require("./branch.model")(sequelize, Sequelize);
db.position = require("./position.model")(sequelize,Sequelize);
db.overtime = require("./overtime.model")(sequelize,Sequelize);
db.department = require("./department.model")(sequelize,Sequelize);
db.payroll = require("./payroll.model")(sequelize,Sequelize);
db.payrollhistory = require("./payrollhistory.model")(sequelize,Sequelize);
db.report = require("./report.model")(sequelize,Sequelize);
db.salaryIncrement = require("./salaryIncrement.model")(sequelize,Sequelize);

module.exports = db;
