const db = require("../models");
const config = require("../config/auth.config");
const { branch } = require("../models");

const Branch = db.branch

const Op = db.Sequelize.Op;


exports.createBranch = (req, res) => {
  // Validate request
  if (!req.body.location) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Branch
  const branch = {
    location: req.body.location
  };

  // Save Branch in the database
  Branch.create(branch)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Branch."
      });
    });
};

exports.allBranch = (req, res) => {
    Branch.findAll() 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving branchs."
        });
      });
  };

exports.deleteBranch = (req, res) => {
    const id = req.params.id;

    Branch.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Branch was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Branch with id=${id}. Maybe Branch was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  
};
exports.findOneBranch = (req, res) => {
    const id = req.params.id;
  
    Branch.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Branch with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Branch with id=" + id
        });
      });
};
exports.updateBranch = (req, res) => {
    const id = req.params.id;
    Branch.update(req.body, {
        where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Branch was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update Branch with id=${id}. Maybe Branch was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error updating Branch with id=" + id
    });
    });
};