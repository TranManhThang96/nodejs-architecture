const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const { checkOverLoad } = require('./helpers/check.connect');
require('dotenv').config();

const app = express();

// init middleware
app.use(morgan('dev')); // khi dev thì nên bật mode này
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
require('./dbs/init.mongodb');
// checkOverLoad();

// init routes
app.use('/', require('./routes/index'));

// handling error
app.get('/', (err, req, res, next) => {});

module.exports = app;
