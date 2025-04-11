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
    },

    // Handle booking process
    handleBooking: async function(req, res) {
        try {
            const { user_id, event_id, seat_ids } = req.body;
            
            // Validate input
            if (!user_id || !event_id || !seat_ids || seat_ids.length === 0) {
                return CreateErrorResponse(res, 400, "Missing required fields");
            }
            
            // Calculate total price and create tickets
            let totalPrice = 0;
            const tickets = [];
            for (const seat_id of seat_ids) {
                const seat = await seatSchema.findById(seat_id);
                if (!seat || seat.status !== 'available') {
                    return CreateErrorResponse(res, 400, "Invalid or unavailable seat");
                }
                
                // Assume each seat has a fixed price for simplicity
                const price = 100; // Example price
                totalPrice += price;
                
                // Create ticket
                const ticket = await ticketSchema.create({
                    event_id,
                    type: 'Standard',
                    quantity: 1,
                    price
                });
                tickets.push(ticket);
            }
            
            // Create order
            const order = await orderSchema.create({
                user_id,
                event_id,
                ticket_id: tickets.map(t => t._id),
                seat_id: seat_ids,
                total_price: totalPrice,
                status: 'pending'
            });
            
            CreateSuccessResponse(res, 201, order);
        } catch (error) {
            console.error('Error handling booking:', error);
            CreateErrorResponse(res, 500, error.message);
        }
    }
};