const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
};

exports.getAllEventsWithTrades = async (req, res) => {
    try {
      const events = await Event.find().populate({
        path: 'trades',
        populate: { path: 'userId', select: 'username balance' }
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};