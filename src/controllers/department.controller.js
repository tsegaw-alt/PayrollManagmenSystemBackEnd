const db = require("../models");
const config = require("../config/auth.config");
const { department } = require("../models");

const Department = db.department

const Op = db.Sequelize.Op;


exports.createDepartment = (req, res) => {
  // Validate request
  if (!req.body.department || !req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Department
  const department = {
    department: req.body.department,
    description: req.body.description
  };

  // Save Department in the database
  Department.create(department)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department."
      });
    });
};

exports.allDepartment = (req, res) => {
    Department.findAll() 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving departments."
        });
      });
  };

exports.deleteDepartment = (req, res) => {
    const id = req.params.id;

    Department.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Department was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Department with id=" + id
        });
      });
  
};
exports.findOneDepartment = (req, res) => {
    const id = req.params.id;
  
    Department.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Department with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Department with id=" + id
        });
      });
};
exports.updateDepartment = (req, res) => {
    const id = req.params.id;
    Department.update(req.body, {
        where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Department was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error updating Department with id=" + id
    });
    });
};