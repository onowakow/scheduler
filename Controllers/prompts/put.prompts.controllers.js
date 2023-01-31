const { Prompt } = require('../../Models/prompt.model');
const { requestFieldMissing } = require('../utils/httpResponses');

async function modifySlots(req, res) {
  const { slots: req_slots } = req.body;
  const { email } = req.body;
  const { _id } = req.params;

  if (!req_slots) return requestFieldMissing(res, 'slots');
  // Currently, email is required. In the future, 'guest' status may be allowed.
  if (!email) return requestFieldMissing(res, 'email');

  let prompt;
  try {
    prompt = await Prompt.findOne({ _id }, 'slots');
    if (prompt === null)
      return res
        .status(400)
        .json({ message: 'no prompt exists with that _id' });
  } catch (err) {
    res.status(500).json(err.message);
  }

  let slots;
  try {
    slots = JSON.parse(req_slots);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'slots are unable to be parsed as JSON' });
  }

  let updatedPrompt;
  const newOptions = slots.map((slot) => {
    return {
      slot,
      ownerEmail: email,
    };
  });
  try {
    await Prompt.findOneAndUpdate(
      { _id },
      {
        $set: { 'options.$[].rejected': true },
      }
    );

    updatedPrompt = await Prompt.findOneAndUpdate(
      { _id },
      {
        $push: { options: { $each: newOptions } },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    return res.status(500).json(err.message);
  }

  res.status(200).json(updatedPrompt);
}

async function modifyAcceptedSlot(req, res) {}

module.exports = { modifySlots, modifyAcceptedSlot };
