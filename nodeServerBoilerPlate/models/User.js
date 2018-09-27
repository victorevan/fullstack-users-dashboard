'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  // built-in id omitted, _id indexed/more performant
  selected: { type: Boolean, required: true },
  name: { type: String, required: true },
  surveyStatus: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
