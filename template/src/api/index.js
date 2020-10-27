require('dotenv').config();
const express = require('express');
const app = express();
const config = require('../lib/config');
const routes = require('./routes');
const asyncapi = require('../lib/asyncapi');

const start = async () => {
  await asyncapi.init();

  app.set('view engine', 'ejs');
  app.use(express.static(__dirname + '/public'));
  app.use(routes);

  app.use((req, res, next) => {
    res.status(404).send('Error: path not found');
    next();
  });

  app.use((err, req, res, next) => {
    console.error(err);
    next();
  });

  app.listen(config.port);
  console.info(`Listening on port ${config.port}`);
};

start();
