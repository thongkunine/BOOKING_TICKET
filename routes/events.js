let express = require('express');
let router = express.Router();
let eventController = require('../controllers/events');
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');

// GET all events
router.get('/', async function(req, res) { 
    try {
        let events = await eventController.GetAllEvents();
        CreateSuccessResponse(res, 200, events);
    } catch (error) {
        CreateErrorResponse(res, 500, error.message);
    }
});

// GET event by ID
router.get('/:id', async function(req, res) {
    try {
        let event = await eventController.GetEventById(req.params.id);
        CreateSuccessResponse(res, 200, event);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

// CREATE new event
router.post('/', async function(req, res) {
    try {
        let { name, date, location } = req.body;
        let newEvent = await eventController.CreateAnEvent(name, date, location);
        CreateSuccessResponse(res, 201, newEvent);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// UPDATE event by ID
router.put('/:id', async function(req, res) {
    try {
        let updatedEvent = await eventController.UpdateAnEvent(req.params.id, req.body);
        CreateSuccessResponse(res, 200, updatedEvent);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// DELETE event by ID
router.delete('/:id', async function(req, res) {
    try {
        let deletedEvent = await eventController.DeleteAnEvent(req.params.id);
        CreateSuccessResponse(res, 200, deletedEvent);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

module.exports = router;