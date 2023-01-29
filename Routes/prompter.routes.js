const express = require('express');
const router = express.Router();
const promptControllers = require('../Controllers/prompt.controllers');

router.get('/', promptControllers.prompt);

module.exports = router;
