const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // get user without password
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const username = req.body.username;
  const password = req.body.password;

  try {
    let loadedUser = await User.findOne({ username: username });
    if (!loadedUser) {
      console.log(username);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    console.log(loadedUser.password);
    const isMatch = await bcrypt.compare(password, loadedUser.password);
    console.log(isMatch);
    if (!isMatch) {
      console.log(password);
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const payload = {
      user: {
        id: loadedUser._id.toString() // mongoose does abstraction for it (_id = id)
      }
    };
    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '3h'
    });
    res
      .status(200)
      .json({
        token: token,
        user: loadedUser,
        userId: loadedUser._id.toString()
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
