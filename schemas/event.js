let mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('event', eventSchema);