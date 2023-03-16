const db = require("../models");
const config = require("../config/auth.config");
const { company } = require("../models");

const Company = db.company

const Op = db.Sequelize.Op;

exports.getCompany = (req, res) => {
    Company.findAll() 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving compnaies Info."
        });
      });
};

exports.updateCompany = (req, res) => {
    const id = req.params.id;
    Company.update(req.body, {
        where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Company was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error updating Company with id=" + id
    });
    });
};