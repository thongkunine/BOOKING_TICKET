let seatSchema = require('../schemas/seat');
let eventSchema = require('../schemas/event');

module.exports = {
    // Lấy tất cả ghế
    GetAllSeats: async function() {
        try {
            return await seatSchema.find({}).populate('event_id');
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Lấy ghế theo ID
    GetSeatById: async function(id) {
        try {
            let seat = await seatSchema.findById(id).populate('event_id');
            if (!seat) {
                throw new Error("Seat không tồn tại!");
            }
            return seat;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Tạo một ghế mới
    CreateASeat: async function(event_id, seat_number, type, price, status) {
        try {
            let eventExists = await eventSchema.findById(event_id);
            if (!eventExists) {
                throw new Error("Event ID không tồn tại!");
            }
            let newSeat = new seatSchema({
                event_id: event_id,
                seat_number: seat_number,
                type: type,
                price: price,
                status: status
            });
            return await newSeat.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    

    // Cập nhật ghế theo ID
    UpdateASeat: async function(id, body) {
        try {
            let updatedSeat = await seatSchema.findByIdAndUpdate(id, body, { new: true, runValidators: true });
            if (!updatedSeat) {
                throw new Error("Seat không tồn tại!");
            }
            return updatedSeat;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Xóa ghế theo ID
    DeleteASeat: async function(id) {
        try {
            let deletedSeat = await seatSchema.findByIdAndDelete(id);
            if (!deletedSeat) {
                throw new Error("Seat không tồn tại!");
            }
            return deletedSeat;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    // Lấy danh sách ghế theo ID sự kiện
    GetSeatsByEventId: async function(eventId) {
        try {
            let seats = await seatSchema.find({ event_id: eventId });
            if (!seats || seats.length === 0) {
                throw new Error("Không tìm thấy ghế nào cho sự kiện này!");
            }
            return seats;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};