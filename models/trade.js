const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    amount: { type: Number, required: true },
    odds: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'won', 'lost'] }
  });

module.exports = mongoose.model('Trade', tradeSchema);

