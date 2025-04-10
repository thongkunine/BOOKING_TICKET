let ticketSchema = require('../schemas/ticket');
let eventSchema = require('../schemas/event');

module.exports = {
    // Lấy tất cả vé
    GetAllTickets: async function() {
        try {
            return await ticketSchema.find({}).populate('event_id');
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Lấy vé theo ID
    GetTicketById: async function(id) {
        try {
            let ticket = await ticketSchema.findById(id).populate('event_id');
            if (!ticket) {
                throw new Error("Vé không tồn tại!");
            }
            return ticket;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Tạo một vé mới
    CreateATicket: async function(event_id, type, quantity, price) {
        try {
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
            let updatedTicket = await ticketSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true });
            if (!updatedTicket) {
                throw new Error("Vé không tồn tại!");
            }
            return updatedTicket;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Xóa vé theo ID
    DeleteATicket: async function(id) {
        try {
            let deletedTicket = await ticketSchema.findByIdAndDelete(id);
            if (!deletedTicket) {
                throw new Error("Vé không tồn tại!");
            }
            return deletedTicket;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    // Lấy danh sách vé theo ID sự kiện
    GetTicketsByEventId: async function(eventId) {
        try {
            let tickets = await ticketSchema.find({ event_id: eventId });
            if (!tickets || tickets.length === 0) {
                throw new Error("Không tìm thấy vé nào cho sự kiện này!");
            }
            return tickets;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
