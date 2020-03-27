const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const username = req.body.username;
  const password = req.body.password;

  let exists = await User.findOne({ username: username });
  if (exists) {
    return res.status(400).json({ msg: 'User already signed up!' });
  }

  try {
    user = new User({
      username,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user._id.toString() // mongoose does abstraction for it (_id = id)
      }
    };

    console.log(config.get('jwtSecret'));

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '3h'
    });

    res.status(201).json({ message: 'User Created!', token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};
