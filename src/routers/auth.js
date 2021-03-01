const express = require('express');
const authenticate = require('../middleware/authenticate');
const { authController } = require('../controllers');

const router = new express.Router();

router.post('/auth/signup', authController.signUp);
router.post('/auth/login', authController.logIn);
router.put('/profile', authenticate, authController.editProfile);

module.exports = router;
