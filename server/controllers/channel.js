const { validationResult } = require('express-validator/check');
const User = require('../models/User');
const Channel = require('../models/Channel');
const mongoose = require('mongoose');

exports.addChannel = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.user.id;
  const title = req.body.title;
  const details = req.body.details;

  let exists = await User.findOne({ _id: userId });
  if (!exists) {
    return res.status(400).json({ msg: 'User is not logged in!' });
  }

  try {
    channel = new Channel({
      title,
      details,
      userId
    });

    await channel.save();

    //   const payload = {
    //     user: {
    //       id: user._id.toString() // mongoose does abstraction for it (_id = id)
    //     }
    //   };

    res.status(201).json({ message: 'Channel Created!', channel: channel });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

// try {
//     return res.json(req.user);
//   } catch (error) {
//     return res.status(400).json({ errors: errors.array() });
//   }
// };
