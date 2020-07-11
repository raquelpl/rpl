const db = require("../config/db.export");
const Question = db.questions;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Can not be empty!"
    });
    return;
  }

const question = {
name: req.body.name,
email: req.body.email,
obs: req.body.obs,
date: req.body.date,
};

// CREATE
Question.create(question)
.then(data => {
    res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Create - Error"
        });
    });
};


// GET
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Question.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Get - Error"
      });
    });
};


// GET by Id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Question.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Get by id - Error"
      });
    });
};


// UPDATE 
exports.update = (req, res) => {
  const id = req.params.id;

  Question.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Update - Success"
        });
      } else {
        res.send({
          message: "Update - Error"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};

// Delete
 exports.delete = (req, res) => {
  const id = req.params.id;

  Question.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Delete - Success"
        });
      } else {
        res.send({
          message: "Delete - Error"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
}; 

