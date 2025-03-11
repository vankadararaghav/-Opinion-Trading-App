const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sport: { type: String },
    odds: { type: Object },
    status: { type: String, enum: ['upcoming', 'live', 'settled'] },
    outcome: { type: String },
    trades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trade' }]
});
  
module.exports = mongoose.model('Event', eventSchema);
