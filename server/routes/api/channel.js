const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const channelController = require('../../controllers/channel');
const isAuth = require('../../middleware/is-auth');

// @route   GET api/channel/
// @desc    Get all channels of a user
// @access  Privcte
router.get('/', isAuth, channelController.getChannels);

// @route   POST api/channel/add
// @desc    Adding a Channel
// @access  Private
router.post(
  '/add',
  [
    check('title').isLength({ min: 3 }),
    check('details')
      .trim()
      .isLength({ min: 5 })
  ],
  isAuth,
  channelController.addChannel
);

module.exports = router;
