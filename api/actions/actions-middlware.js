const Action = require('./actions-model.js');

const validate_action_ID = async (req, res, next) => {
  const action = await Action.get(req.params.id);
  if (!action) {
    res.status(404).json({
      message: 'action not found'
    })
  } else {
    req.action = action;
    next();
  }
}

const vaidate_action_body = (req, res, next) => {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes) {
    if (!project_id) {
      res.status(400).json({
        message: 'Must be existing ID'
      })
    } else if (!description || description.trim().length <= 128) {
      res.status(400).json({
        message: 'Must have desc, or length must under 128 chars'
      })
    } else if (!notes) {
      res.status(400).json({
        message: 'Must have additional notes'
      })
    }
  } else {
    req.description = description;
    req.notes = notes;
    req.completed = completed;
    next()
  }
}

module.exports = { validate_action_ID, vaidate_action_body }
