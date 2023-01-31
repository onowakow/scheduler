const { Prompt } = require('../../Models/prompt.model');
const { requestFieldMissing } = require('../utils/httpResponses');

async function addOptionsToPrompt(req, res) {
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

async function acceptOption(req, res) {
  const { _id: prompt_id } = req.params;
  const { option_id } = req.body;
  if (!option_id) return requestFieldMissing(res, 'slot _id');
  if (!prompt_id) return requestFieldMissing(res, 'prompt _id');

  let option;
  try {
    const prompt = await Prompt.findOne({ _id: prompt_id }, 'options');
    if (prompt === null)
      return res.status(400).json({ message: 'no prompt found by that _id' });

    option = prompt.options.find((option) => String(option._id) === option_id);
    if (!option)
      return res.status(400).json({ message: 'no option found by that _id' });
  } catch (err) {
    return res.status(500).json(err.message);
  }

  let updatedPrompt;
  try {
    updatedPrompt = await Prompt.findOneAndUpdate(
      { _id: prompt_id },
      {
        $set: { acceptedOption: option },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    return res.status(500).json(err.message);
  }

  return res.status(200).json(updatedPrompt);
}

module.exports = { addOptionsToPrompt, acceptOption };
