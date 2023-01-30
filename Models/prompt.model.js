const mongoose = require('mongoose');

/** TODO: Consider removing acceptedSlot */

const PromptSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  slots: [
    {
      type: [String],
      required: true,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  counterSlots: [
    {
      type: [String],
    },
  ],
  acceptedSlot: {
    type: [String],
  },
});

const Prompt = mongoose.model('Prompt', PromptSchema);
module.exports = { Prompt };
