let mongoose = require('mongoose');

// Định nghĩa schema cho Seat
let seatSchema = new mongoose.Schema({
    event_id: { 
           type: mongoose.Schema.Types.ObjectId, 
           ref: 'event', 
           required: true 
       },
    seat_number: { 
        type: String, 
        required: true 
    },
    type: {
        type: String,
        required: true,
        enum: ['VIP', 'Thường']
    },
    price: {
        type: Number,
        required: true
    },
    status: { 
        type: String, 
        required: true, 
        enum: ['available', 'reserved', 'sold'] 
    }
},{
    timestamps: true // Tự động thêm createdAt và updatedAt
});

// Xuất model Seat
module.exports = mongoose.model('seat', seatSchema);