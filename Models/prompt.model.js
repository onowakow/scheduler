const mongoose = require('mongoose');

/** TODO: Consider removing acceptedSlot */

const Option = {
  slot: { type: [String], required: true },
  ownerEmail: {
    type: String,
    required: true,
  },
  rejected: { type: Boolean, required: true, default: false },
};

const PromptSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  options: [Option],
  // rejectedSlots: [
  //   {
  //     type: [String],
  //   },
  // ],
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
