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

router.get('/:id', validate_Project_ID, (req, res, next) => {
  const id = req.param.id;
  Project.get(id)
    .then(project => {
      res.json(req.project_ID)
    })
    .catch(next)
})

module.exports = router;

