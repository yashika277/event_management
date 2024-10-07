const express = require('express');
const authMiddleware = require('../middleware/auth');
const { createEvent } = require('../controllers/event.controller');

const router = express.Router();

// Create Event
router.post('/create', authMiddleware, createEvent);

module.exports = router;