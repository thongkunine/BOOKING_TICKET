let orderSchema = require('../schemas/oder');
let userSchema = require('../schemas/user');
let eventSchema = require('../schemas/event');
let ticketSchema = require('../schemas/ticket');
let seatSchema = require('../schemas/seat');

module.exports = {
    // Lấy tất cả đơn hàng
    GetAllOrders: async function() {
        try {
            return await orderSchema.find({})
            .populate('user_id')
            .populate('event_id')
            .populate('ticket_id')
            .populate('seat_id');
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Lấy đơn hàng theo ID
    GetOrderById: async function(id) {
        try {
            return await orderSchema.findById(id)
                .populate('user_id')
                .populate('event_id')
                .populate('ticket_id')
                .populate("seat_id");
        } catch (error) {
            throw new Error(error.message);
        }
    },


    // Tạo một đơn hàng mới
    CreateAnOrder: async function(user_id, event_id, ticket_id, seat_id, total_price, status) {
        try {
            let userExists = await userSchema.findById(user_id);
            if (!userExists) throw new Error("User ID không tồn tại!");

            let eventExists = await eventSchema.findById(event_id);
            if (!eventExists) throw new Error("Event ID không tồn tại!");

            let ticketExists = await ticketSchema.findById(ticket_id);
            if (!ticketExists) throw new Error("Ticket ID không tồn tại!");

            let seatExists = await seatSchema.findById(seat_id);
            if (!seatExists) throw new Error("Seat ID không tồn tại!");

            let newOrder = new orderSchema({
                user_id: user_id,
                event_id: event_id,
                ticket_id: ticket_id,
                seat_id: seat_id,
                total_price: total_price,
                status: status
            });

            return await newOrder.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Cập nhật đơn hàng theo ID
    UpdateAnOrder: async function(id, body) {
        try {
            let updatedOrder = await orderSchema.findByIdAndUpdate(id, body, { new: true });
            return updatedOrder;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Xóa đơn hàng theo ID
    DeleteAnOrder: async function(id) {
        try {
            let deletedOrder = await orderSchema.findByIdAndDelete(id);
            return deletedOrder;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};