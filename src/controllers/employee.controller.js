const db = require("../models");
const config = require("../config/auth.config");
const { employee, resignedEmployee, salaryIncrement } = require("../models");

const Employee = db.employee;
const ResignedEmployee = db.resignedEmployee;
const SalaryIncrement = db.salaryIncrement;

const Op = db.Sequelize.Op;

exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      city,
      tin,
      houseNo,
      birthDay,
      position,
      department,
      branch,
      hiringDate,
      workType,
      expectedWorkingDays,
      grossSalary,
      dailyWage,
      positionAllowance,
      transportAllowance,
      accountNo,
    } = req.body;

    await Employee.create({
      name,
      phone,
      email,
      city,
      tin,
      houseNo,
      birthDay,
      position,
      department,
      branch,
      hiringDate,
      workType,
      expectedWorkingDays,
      grossSalary,
      dailyWage,
      positionAllowance,
      transportAllowance,
      accountNo,
    });

    res.send({ message: "Employee registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.allEmployee = async (req, res) => {
  try {
    const data = await Employee.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving employees.",
    });
  }
};

exports.allNewEmployee = async (req, res) => {
  try {
    const { startedDate, endDate } = req.body;

    const data = await Employee.findAll({
      where: {
        hiringDate: {
          [Op.between]: [startedDate, endDate],
        },
        [Op.or]: [{ workType: "Permanent" }, { workType: "Temporary" }],
      },
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving employees.",
    });
  }
};

exports.allResignedEmployee = async (req, res) => {
  try {
    const { startedDate, endDate } = req.body;

    const data = await ResignedEmployee.findAll({
      where: {
        resignedDate: {
          [Op.between]: [startedDate, endDate],
        },
        [Op.or]: [{ workType: "Permanent" }, { workType: "Temporary" }],
      },
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving employees.",
    });
  }
};

exports.allSalaryIncrement = async (req, res) => {
  try {
    const { startedDate, endDate } = req.body;

    const data = await SalaryIncrement.findAll({
      where: {
        createdDate: {
          [Op.between]: [startedDate, endDate],
        },
      },
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving employees.",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Employee.destroy({
      where: { id },
    });

    if (num == 1) {
      res.send({ message: "Employee was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete Employee because employee with id=${id} was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Could not delete Employee with id=" + req.params.id,
    });
  }
};


exports.updateEmployee = async (req, res) => {
try {
const {
name,
phone,
email,
city,
tin,
houseNo,
birthDay,
position,
department,
branch,
hiringDate,
workType,
expectedWorkingDays,
grossSalary,
dailyWage,
positionAllowance,
transportAllowance,
accountNo,
} = req.body;

const id = req.params.id;

const num = await Employee.update(
  {
    name,
    phone,
    email,
    city,
    tin,
    houseNo,
    birthDay,
    position,
    department,
    branch,
    hiringDate,
    workType,
    expectedWorkingDays,
    grossSalary,
    dailyWage,
    positionAllowance,
    transportAllowance,
    accountNo,
  },
  {
    where: { id },
  }
);

if (num == 1) {
  res.send({ message: "Employee was updated successfully." });
} else {
  res.send({
    message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
  });
}
} catch (err) {
res.status(500).send({
message: "Error updating Employee with id=" + req.params.id,
});
}
};