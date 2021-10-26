const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/200');
});
app.get('/:statusCode', (req, res) => {
  res.statusCode = req.params.statusCode;
  res.json({
    statusCode: req.params.statusCode
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
