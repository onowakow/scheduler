const express = require('express');
const router = express.Router();
const usersControllers = require('../Controllers/users.controllers');

router.post('/register', usersControllers.register);
router.post('/login', usersControllers.login);
router.get('/logout', usersControllers.logout);
module.exports = router;
