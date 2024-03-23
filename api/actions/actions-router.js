const express = require('express');
const Action = require('./actions-model');
const Porject = require('../projects/projects-model');
const { validate_action_ID, vaidate_action_body } = require('./actions-middlware');
const router = express.Router();

router.get('/', (req, res) => {
  Action.get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.json('[]');
    })
  })

router.get('/:id', validate_action_ID, (req, res, next) => {
  const id = req.param.id;
  Action.get(id)
    .then(action => {
      res.json(req.action)
    })
    .catch(next)
})

router.post('/', vaidate_action_body, (req, res, next) => {
  Action.insert(req.body)
    .then(new_project => {
      res.json(new_project);
      console.log(new_project)
    })
    .catch(next)
})

router.put('/:id', validate_action_ID, vaidate_action_body, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then(updated_action => {
      res.json(updated_action);
    })
    .catch(next)
})

router.delete('/:id',  async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    const actions = await Action.get();
    res.status(200).json(actions)
  } catch (err) {
    next(err)
  }
})


module.exports = router;

