'use strict';

const express = require('express');

const apiRouter = require('./api/index');
const initializeConfig = require('../initialize');

initializeConfig();

const app = express();

app.use('/api', apiRouter);

app.listen(process.env.port || 8001);