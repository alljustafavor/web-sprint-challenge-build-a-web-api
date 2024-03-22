const server = require('./api/server');

const _PORT_ = process.env.PORT || 9000;

server.listen(_PORT_, (req, res) => {
  console.log(`\n ************************************ \n * server is listining on PORT:\x1b[32m${_PORT_}\x1b[0m *\n ************************************ \n`);
})
