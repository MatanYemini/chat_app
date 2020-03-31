const { validationResult } = require('express-validator/check');
const User = require('../models/User');
const Channel = require('../models/Channel');
const mongoose = require('mongoose');
const Message = require('../models/Messages');

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
    created_user.interests.channels.unshift(channel);
    await created_user.save();

    const payload = {
      channel: {
        channel: channel
      }
    };

    res.status(201).json({
      message: 'Channel Created!',
      channels: created_user.interests.channels
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Channel Adding Error' });
  }
};

exports.getChannels = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const userChannels = user.interests.channels;
    let data = [];
    let temp;
    for (let index = 0; index < userChannels.length; index++) {
      const element = userChannels[index];
      let value = element._id;
      temp = await Channel.findById(value);
      data.push(temp);
    }

    res.status(200).json({ channels: data });
  } catch (error) {
    res.status(500).send('Could not get user channels');
  }
};

exports.addMessage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    let channel = req.body.channel;
    let content = req.body.content;
    let userId = user._id;
    let userName = user.userName;
    let userObj = { userId: userId, username: userName };

    message = new Message({
      channelId: channel,
      content: content,
      user: userObj
    });

    res.status(200).json({ message: message });
  } catch (error) {
    res.status(500).send('Could not add message');
  }
};
