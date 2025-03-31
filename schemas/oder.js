let mongoose = require('mongoose');

// Định nghĩa schema cho Order
let orderSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    event_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'event', 
        required: true 
    },
    ticket_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ticket', 
        required: true 
    },
    seat_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'seat', 
        required: true 
    },  
    total_price: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        required: true, 
        enum: ['pending', 'confirmed', 'canceled'] 
    }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

// Xuất model Order
module.exports = mongoose.model('order', orderSchema);