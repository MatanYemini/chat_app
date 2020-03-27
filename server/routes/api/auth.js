const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/is-auth');
const authController = require('../../controllers/auth');
const { check } = require('express-validator');

// @route   GET api/auth/authenticate
// @desc    Authenticate & getToken
// @access  Public
router.get('/authenticate', isAuth, authController.getUser);

// @route   POST api/auth/login
// @desc    Login
// @access  Public
router.post(
  '/login',
  [
    check('username')
      .isLength({ min: 3 })
      .withMessage('Username must be longer then 3 chars'),
    check('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.')
  ],
  authController.login
);

module.exports = router;
