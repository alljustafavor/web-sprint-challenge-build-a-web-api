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

router.post('/', validate_Project, (req, res, next) => {
  Project.insert({ name: req.name, description: req.description, completed: req.completed })
    .then(new_project => {
      res.json(new_project);
      console.log(new_project)
    })
    .catch(next)
})

router.put('/:id', validate_Project_ID, validate_Project, (req, res, next) => {
  Project.update(req.params.id, { name: req.name, description: req.description, completed: req.completed })
    .then(updated_project => {
      res.json(updated_project);
    })
    .catch(next)
})

router.delete('/:id', validate_Project_ID, async (req, res, next) => {
  try {
    await Project.remove(req.params.id);
    const projects = await Project.get();
    res.status(200).json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/actions', validate_Project_ID, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then(actions => {
      res.json(actions);
    })
    .catch(next)
})

module.exports = router;

