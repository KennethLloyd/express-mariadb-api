const express = require('express');
const authenticate = require('../middleware/authenticate');
const { authController } = require('../controllers');
const { authValidator } = require('../validators');

const router = new express.Router();

router.post('/auth/signup', authValidator.signUp, authController.signUp);
router.post('/auth/login', authValidator.logIn, authController.logIn);
router.put(
  '/profile',
  authenticate,
  authValidator.editProfile,
  authController.editProfile,
);

module.exports = router;
