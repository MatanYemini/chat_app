const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../../controllers/user');

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
  '/register',
  [
    check('username').isLength({ min: 3 }),
    check('password')
      .trim()
      .isLength({ min: 5 })
  ],
  userController.signUp
);

module.exports = router;
