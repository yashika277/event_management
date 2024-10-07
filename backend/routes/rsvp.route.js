const express = require('express');
const authMiddleware = require('../middleware/auth');
const { createRSVP, getUserRSVPs, cancelRSVP } = require('../controllers/rsvp.controller');

const router = express.Router();


router.post('/create', authMiddleware, createRSVP);

// Get all RSVPs for the authenticated user
router.get('/myrsvps', authMiddleware, getUserRSVPs);

// Cancel an RSVP by ID
router.delete('/:rsvpId', authMiddleware, cancelRSVP);

module.exports = router;