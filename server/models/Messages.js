const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel'
  },
  messages: [
    {
      messageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      user: {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        username: {
          type: String,
          required: true
        }
      }
    }
  ]
});

module.exports = Messages = mongoose.model('message', MessagesSchema);
