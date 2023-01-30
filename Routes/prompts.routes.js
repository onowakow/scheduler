const express = require('express');
const router = express.Router();
const promptsControllers = require('../Controllers/prompts/prompts.controllers');
const putPromptsControllers = require('../Controllers/prompts/put.prompts.controllers');
const { auth: authMiddleware } = require('../Middleware/auth.middleware');

router.post('/', authMiddleware, promptsControllers.createPrompt);
router.get('/', authMiddleware, promptsControllers.getAuthHolderPrompts);

router.get('/:_id', /* No Auth */ promptsControllers.getPromptById);
router.put(
  '/:_id/counterslots',
  /* No Auth */ putPromptsControllers.modifyCounterSlots
);
router.put(
  '/:_id/acceptedslot',
  /* No Auth */ putPromptsControllers.modifyAcceptedSlot
);

//.put('/prompts/counter/:_id')
// actions:
/**
 * create prompt, (POST)
 * get auth holders prompts, (GET)
 * get prompt by Id, (GET)
 * modify counter slots, (PUT)
 * accept slot (PUT)
 */

module.exports = router;
