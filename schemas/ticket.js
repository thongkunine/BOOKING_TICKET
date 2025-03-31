let mongoose = require('mongoose');

let ticketSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'event', required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});
module.exports = mongoose.model('ticket', ticketSchema);