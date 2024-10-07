const RSVP = require('../models/RSVP.model');
const Event = require('../models/event.model');

exports.createRSVP = async (req, res) => {
    const { eventId } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if the event has reached max attendees
        const rsvpCount = await RSVP.countDocuments({ event: eventId });
        if (rsvpCount >= event.maxAttendees) {
            return res.status(400).json({ msg: 'Event is fully booked' });
        }

        // Check if the user has already RSVPed
        const existingRSVP = await RSVP.findOne({ user: req.user.id, event: eventId });
        if (existingRSVP) {
            return res.status(400).json({ msg: 'You have already RSVPed for this event' });
        }

        // Create the RSVP
        const rsvp = new RSVP({
            user: req.user.id,
            event: eventId,
            status: 'confirmed',
        });

        await rsvp.save();

        res.status(201).json({ msg: 'RSVP confirmed', rsvp });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserRSVPs = async (req, res) => {
    try {
        const rsvps = await RSVP.find({ user: req.user.id }).populate('event');
        res.json(rsvps);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.cancelRSVP = async (req, res) => {
    const { rsvpId } = req.params;

    try {
        const rsvp = await RSVP.findById(rsvpId);

        if (!rsvp) {
            return res.status(404).json({ msg: 'RSVP not found' });
        }

        if (rsvp.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized to cancel this RSVP' });
        }

        await RSVP.findByIdAndDelete(rsvpId);

        res.json({ msg: 'RSVP cancelled' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};