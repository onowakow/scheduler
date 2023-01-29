const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  slots: [
    {
      type: String,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  acceptedSlot: {
    type: String,
    required: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Prompt = mongoose.model('Prompt', PromptSchema);
module.exports = { Prompt };
