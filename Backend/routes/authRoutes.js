const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signupController);

router.post('/login', authController.loginController);

router.post('/reset-password', authController.resetPasswordController);

router.post('/recover-account', authController.recoverAccountController);

module.exports = router;
