const express = require('express');
const router = express.Router();
const usersControllers = require('../Controllers/users.controllers');
const { auth } = require('../Middleware/auth.middleware');

router.post('/register', usersControllers.register);
router.post('/login', usersControllers.login);
router.get('/logout', usersControllers.logout);
router.get('/status', auth, usersControllers.status);
module.exports = router;
