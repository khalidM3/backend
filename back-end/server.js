'use strict';

const
  express = require('express'),
  mongoose = require('mongoose'),
  Promise = require('bluebird'),
  dotenv = require('dotenv'),

  morgan = require('morgan'),
  cors = require('cors'),
  errors = require('./lib/error-middleware.js'),
  debug = require('debug')('projectX:server'),

  authRoute = require('./route/auth-route.js');

dotenv.load();

const
  PORT = process.env.PORT || 3000,
  app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));


app.use(authRoute);


app.use(errors);
app.listen(PORT, () => debug('Server up at port', PORT));