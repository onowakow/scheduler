const { Prompt } = require('../../Models/prompt.model');
const { requestFieldMissing } = require('../utils/httpResponses');

async function modifySlots(req, res) {
  const { slots: req_slots } = req.body;
  const { _id } = req.params;

  if (!req_slots) return requestFieldMissing(res, 'slots');

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
  try {
    updatedPrompt = await Prompt.findOneAndUpdate(
      { _id },
      {
        $set: { $each: { slots: { rejected: true } } },
        // $push: { rejectedSlots: { $each: prompt.slots } },
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
