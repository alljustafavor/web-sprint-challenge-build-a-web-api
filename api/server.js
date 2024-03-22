const express = require('express');
const actions_router = require('./actions/actions-router');
const projects_router = require('./projects/projects-router');
const server = express();

server.use(express.json());
server.use('/api/actions', actions_router);
server.use('/api/projects', projects_router);

module.exports = server;
