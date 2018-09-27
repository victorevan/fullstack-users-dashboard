'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const apiRoutes = require('./routes/api');

const mongoose = require('mongoose');

const User = require('./models/User');
const makeData = require('./config/users');

mongoose.connect('mongodb://localhost:27017/unipower', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', err => console.error(`connection error: ${err}`) );
db.once('open', async () => {
  const _errorLogger = (err, successMessage) => err ? console.error(err) : console.log(successMessage);
  console.log('db connection successful');
  await User.deleteMany(err => _errorLogger(err, 'all user docs deleted'));
  
  const initialData = makeData();
  const duplicateUserData =
    [...initialData, initialData]
    .map(user => new User(user));

  User.collection.insertMany(duplicateUserData, err => _errorLogger(err, 'users inserted'));
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(express.static(__dirname));

app.use('/api', apiRoutes);

app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

let port = process.env.PORT || 8000;

const server = app.listen(port, () => console.log(`listening on ${port}`));

module.exports = server;
