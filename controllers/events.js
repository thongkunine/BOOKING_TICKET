let eventSchema = require('../schemas/event');

module.exports = {
    GetAllEvents: async function() {
        return await eventSchema.find({});
    },
    GetEventById: async function(id) {
        return await eventSchema.findById(id);
    },
    CreateAnEvent: async function(name, date, location) {
        try {
            let newEvent = new eventSchema({
                name: name,
                date: date,
                location: location
            });
            return await newEvent.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    UpdateAnEvent: async function(id, body) {
        try {
            let updatedEvent = await eventSchema.findByIdAndUpdate(id, body, { new: true });
            return updatedEvent;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    DeleteAnEvent: async function(id) {
        try {
            let deletedEvent = await eventSchema.findByIdAndDelete(id);
            return deletedEvent;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};