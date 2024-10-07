const express = require('express');
const { check } = require('express-validator');
const { register } = require('../controllers/user.controller');

const router = express.Router();

// Register User
router.post(
    '/register',
    [check('email', 'Please include a valid email').isEmail(), check('password', 'Password must be at least 6 characters').isLength({ min: 6 })],
    register
);

module.exports = router;