// This file contains the route to the index.html page.
const path = require('path');

module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
