const Project = require('./projects-model');

const validate_Project_ID = async (req, res, next) => {
  const project_ID = await Project.get(req.params.id);
  if (!project_ID) {
    res.status(404).json({
      message: "id not found",
    });
  } else {
    req.project_ID = project_ID;
    next();
  }
}

const validate_Project = (req, res, next) => {
  const { name, description, completed } = req.body;
  if (typeof name !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean' || name.trim() === '' || description.trim() === '') {
    res.status(400).json({
      message: 'name and description required'
    })
  } else {
    req.name = name.trim();
    req.description = description.trim();
    req.completed = completed 

    next();
  }
}

module.exports = { validate_Project_ID, validate_Project};
