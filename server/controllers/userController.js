'use strict';

const User = require('../models/User');

exports.read_user_list = async (req, res, next) => {
  try {
    const allUserDocs = await User.find().exec();
    res.json(allUserDocs);
  } catch(err) {
    next(err);
  }
};

exports.read_paginated_user_list = async (req, res, next) => {
  const filterBy = req.query.filter ? req.query.filter : null;
  const filterValue = req.query.filterVal ? { $regex : "^" + req.query.filterVal } : null;
  let filterObject = {};
  if (filterBy && filterValue) filterObject = { [filterBy]: filterValue };

  const pageNum = req.query.page ? parseInt(req.query.page) : 1;
  const limitNum = req.query.limit ? parseInt(req.query.limit) : 10;

  try {
    const options = { page: pageNum, limit: limitNum };
    const paginatedUserDocs = await User.paginate(filterObject, options);
    res.json(paginatedUserDocs);
  } catch(err) {
    next(err);
  }
};

exports.create_user = async (req, res, next) => {
  const user = new User(req.body);

  try {
    const userDoc = await user.save();
    res.status(201).json(userDoc);
  } catch(err) {
    err.status = 400;
    next(err);
  }
};

exports.preload_user_doc = async (req, res, next, userId) => {
  try {
    const userDoc = await User.findById(userId).exec();
    if (!userDoc) {
      const err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.userDoc = userDoc;
    next();
  } catch(err) {
    err.status = 400;
    next(err);
  }
};

exports.read_user = (req, res) => res.json(req.userDoc);

exports.update_user = async (req, res, next) => {
  try {
    const updatedStatus = await req.userDoc.updateOne(req.body).exec();
    res.json(updatedStatus);
  } catch(err) {
    err.status = 400;
    next(err);
  }
};

exports.delete_user = async (req, res, next) => {
  try {
    const deletedStatus = await req.userDoc.remove();
    res.json(deletedStatus);
  } catch(err) {
    next(err);
  }
};