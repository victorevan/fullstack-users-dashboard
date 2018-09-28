'use strict';

const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.route('/users')
  .get(user_controller.read_user_list)
  .post(user_controller.create_user);

router.param('userId', user_controller.preload_user_doc);

router.route('/users/:userId')
  .get(user_controller.read_user)
  .put(user_controller.update_user)
  .delete(user_controller.delete_user);

module.exports = router;
