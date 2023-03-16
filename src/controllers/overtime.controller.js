const db = require("../models");
const config = require("../config/auth.config");
const { overtime } = require("../models");

const Overtime = db.overtime

const Op = db.Sequelize.Op;


exports.createOvertime = (req, res) => {
  // Validate request
  if (!req.body.period || !req.body.rate) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Overtime
  const overtime = {
    period: req.body.period,
    rate: req.body.rate
  };

  // Save Overtime in the database
  Overtime.create(overtime)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Overtime."
      });
    });
};

exports.allOvertime = (req, res) => {
    Overtime.findAll() 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving overtimes."
        });
      });
  };

exports.deleteOvertime = (req, res) => {
    const id = req.params.id;

    Overtime.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Overtime was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Overtime with id=${id}. Maybe Overtime was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Overtime with id=" + id
        });
      });
  
};
exports.findOneOvertime = (req, res) => {
    const id = req.params.id;
  
    Overtime.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Overtime with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Overtime with id=" + id
        });
      });
};
exports.updateOvertime = (req, res) => {
    const id = req.params.id;
    Overtime.update(req.body, {
        where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Overtime was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update Overtime with id=${id}. Maybe Overtime was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error updating Overtime with id=" + id
    });
    });
};