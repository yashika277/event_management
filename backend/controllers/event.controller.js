const { model } = require('mongoose');
const Event = require('../models/event.model');

const createEvent = async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            createdBy: req.user.id,
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = { createEvent }