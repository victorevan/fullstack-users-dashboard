const User = require('../models/User');

exports.read_user_list = async (req, res, next) => {
  try {
    const allUsers = await User.find().exec();
    res.json(allUsers);
  } catch(err) {
    next(err);
  }
};

exports.create_user = async (req, res, next) => {
  const user = new User(req.body);

  try {
    const userDoc = await user.save();
    res.status(201);
    res.json(userDoc);
  } catch(err) {
    err.status = 400;
    next(err);
  }
};

exports.preload_user_doc = (req, res, next, userId) => {

};

exports.read_user = (req, res) => {

};

exports.update_user = (req, res) => {

};

exports.delete_user = (req, res) => {

};