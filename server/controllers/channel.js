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

  let created_user = await User.findOne({ _id: userId });
  if (!created_user) {
    return res.status(400).json({ msg: 'User is not logged in!' });
  }

  try {
    channel = new Channel({
      title: title,
      details: details,
      createdBy: userId
    });
    // Saving the channel
    await channel.save();
    // Saving the channel in user
    created_user.channels.unshift(channel);
    await created_user.save();

    const payload = {
      channel: {
        channel: channel
      }
    };

    res
      .status(201)
      .json({ message: 'Channel Created!', channels: created_user.channels });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Channel Adding Error' });
  }
};

exports.getChannels = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userChannels = user.channels;
    res.status(200).json({ channels: userChannels });
  } catch (error) {
    res.status(500).send('Could not get user channels');
  }
};
