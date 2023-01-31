const mongoose = require('mongoose');

const Option = {
  slot: { type: [String], required: true },
  ownerEmail: {
    type: String,
    default: 'Guest',
  },
  rejected: { type: Boolean, default: false },
};

const PromptSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  options: [Option],
  acceptedOption: {
    type: Option,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Prompt = mongoose.model('Prompt', PromptSchema);
module.exports = { Prompt };
