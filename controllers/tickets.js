let ticketSchema = require('../schemas/ticket');
let eventSchema = require('../schemas/event');

module.exports = {
    // Lấy tất cả vé
    GetAllTickets: async function() {
        return await ticketSchema.find({}).populate('event_id');
    },

    // Lấy vé theo ID
    GetTicketById: async function(id) {
        return await ticketSchema.findById(id).populate('event_id');
    },

    // Tạo một vé mới, chỉ truyền vào 1 event_id
    CreateATicket: async function(event_id, type, quantity, price) {
        try {
            // Kiểm tra event_id có tồn tại trong bảng Event không
            let eventExists = await eventSchema.findById(event_id);
            if (!eventExists) {
                throw new Error("Event ID không tồn tại!");
            }

            let newTicket = new ticketSchema({
                event_id: event_id,
                type: type,
                quantity: quantity,
                price: price
            });
            return await newTicket.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Cập nhật vé theo ID
    UpdateATicket: async function(id, body) {
        try {
            let updatedTicket = await ticketSchema.findByIdAndUpdate(id, body, { new: true });
            return updatedTicket;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Xóa vé theo ID
    DeleteATicket: async function(id) {
        try {
            let deletedTicket = await ticketSchema.findByIdAndDelete(id);
            return deletedTicket;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
