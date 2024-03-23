const express = require('express');
const Project = require('./projects-model');
const Action = require('../actions/actions-model');
const { validate_Project_ID, validate_Project } = require('./projects-middleware'); 

const router = express.Router();

router.get('/', (req, res) => {
  Project.get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.json('[]');
    })
  })

module.exports = router;

