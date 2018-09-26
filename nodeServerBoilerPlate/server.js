'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const mongoose = require('mongoose');

const User = require('./models/User');
const makeData = require('./config/users');

mongoose.connect('mongodb://localhost:27017/unipower', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', err => console.error(`connection error: ${err}`) );
db.once('open', async () => {
  console.log('db connection successful');
  await User.deleteMany(err => err ? console.error(err) : console.log('all user docs deleted'));
  
  const initialData = makeData();
  const duplicateUserData = 
    [...initialData, initialData]
    .map(user => new User(user));

  User.collection.insertMany(duplicateUserData, (err) => {
    if (err) console.error(err);
    else console.log('users inserted');
  });
});

const app = express();

app.use(cors());
app.use(logger('dev'));

require('./config/middleware')(app, express);

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

app.listen(8000, () => console.log('listening on 8000'));
