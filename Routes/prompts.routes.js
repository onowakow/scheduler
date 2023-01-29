const express = require('express');
const router = express.Router();
const promptsControllers = require('../Controllers/prompts.controllers');

router.post('/', promptsControllers.newPrompt);

module.exports = router;
