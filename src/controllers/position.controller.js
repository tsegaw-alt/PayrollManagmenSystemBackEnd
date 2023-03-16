const db = require("../models");
const config = require("../config/auth.config");
const { position } = require("../models");

const Position = db.position

const Op = db.Sequelize.Op;


exports.createPosition = (req, res) => {
  // Validate request
  if (!req.body.designation) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Position
  const position = {
    designation: req.body.designation
  };

  // Save Position in the database
  Position.create(position)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Position."
      });
    });
};

exports.allPosition = (req, res) => {
    Position.findAll() 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving positions."
        });
      });
  };

exports.deletePosition = (req, res) => {
    const id = req.params.id;

    Position.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Position was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Position with id=${id}. Maybe Position was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Position with id=" + id
        });
      });
  
};
exports.findOnePosition = (req, res) => {
    const id = req.params.id;
  
    Position.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Position with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Position with id=" + id
        });
      });
};
exports.updatePosition = (req, res) => {
    const id = req.params.id;
    Position.update(req.body, {
        where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Position was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update Position with id=${id}. Maybe Position was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error updating Position with id=" + id
    });
    });
};