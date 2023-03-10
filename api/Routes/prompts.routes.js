const express = require('express');
const router = express.Router();
const promptsControllers = require('../Controllers/prompts/prompts.controllers');
const putPromptsControllers = require('../Controllers/prompts/put.prompts.controllers');
const { auth: authMiddleware } = require('../Middleware/auth.middleware');

router.post('/', authMiddleware, promptsControllers.createPrompt);
router.get('/', authMiddleware, promptsControllers.getAuthHolderPrompts);

router.get('/:_id', /* No Auth */ promptsControllers.getPromptById);
router.put(
  '/:_id/options',
  /* No Auth */ putPromptsControllers.addOptionsToPrompt
);
router.put(
  '/:_id/acceptoption',
  /* No Auth */ putPromptsControllers.acceptOption
);

module.exports = router;
