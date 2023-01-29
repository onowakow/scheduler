const express = require('express');
const router = express.Router();
const promptsControllers = require('../Controllers/prompts.controllers');

router.post('/', promptsControllers.newPrompt);
router.get('/', promptsControllers.myPrompts);
router.get('/:_id', promptsControllers.promptById);

module.exports = router;
