'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new Schema({
  // built-in id omitted, _id indexed/more performant
  name: { type: String, required: true },
  surveyStatus: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  role: { type: String, required: true }
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
