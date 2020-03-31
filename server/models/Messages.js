const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel'
  }
});

module.exports = Messages = mongoose.model('message', MessagesSchema);
