const { Prompt } = require('../Models/prompt.model');
const { requestFieldMissing } = require('./utils/httpResponses');

async function promptById(req, res) {
  const { _id } = req.params;
  if (!_id) return requestFieldMissing(res, 'id');

  try {
    const prompt = await Prompt.findOne({ _id });
    return res.status(200).json(prompt);
  } catch (err) {
    res.status(500).json(err.message);
  }

  res.status(200).json('okay');
}

async function myPrompts(req, res) {
  try {
    const prompts = await Prompt.find({ email: res.locals.email });
    return res.status(200).json(prompts);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function newPrompt(req, res) {
  const { slots: req_slots } = req.body;
  const { subject } = req.body;
  const { email } = res.locals;

  if (!req_slots) return requestFieldMissing(res, 'slots');
  if (!subject) return requestFieldMissing(res, 'subject');
  if (!email)
    return res.status(500).json({ message: 'email missing from locals' });

  let slots;
  try {
    slots = JSON.parse(req_slots);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'slots are unable to be parsed as JSON' });
  }

  try {
    const prompt = new Prompt({
      subject,
      slots,
      email: res.locals.email,
    });
    await prompt.save();
    res.status(200).json(prompt);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports = { newPrompt, myPrompts, promptById };
