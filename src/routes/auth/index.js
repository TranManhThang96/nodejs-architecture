'use strict';

const express = require('express');
const authController = require('../../controllers/auth.controller');
const router = express.Router();

// signIn
router.post('/sign-up', authController.signUp);

module.exports = router;
