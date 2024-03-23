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
  const { name, description } = req.body;
  if (typeof name === 'string' && typeof description === 'string' || name.trim() === '' || description.trim() === '') {
    res.status(400).json({
      message: 'name and description required'
    })
  } else {
    req.name = name;
    req.description = description;
    next();
  }
}

module.exports = { validate_Project_ID, validate_Project};
