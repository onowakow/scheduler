const { Prompt } = require('../Models/prompt.model');

async function newPrompt(req, res) {
  let slots;
  try {
    slots = JSON.parse(req.body.slots);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'slots are unable to be parsed as JSON' });
  }

  const subject = req.body.subject;
  if (!subject) return res.status(400).json({ message: 'subject missing' });

  try {
    const prompt = new Prompt({
      subject,
      slots,
      userEmail: res.locals.email,
    });
    await prompt.save();
    res.status(200).json(prompt);
  } catch (err) {
    res.status(500).json();
  }
}

module.exports = { newPrompt };
