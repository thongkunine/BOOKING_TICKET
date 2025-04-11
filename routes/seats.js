let express = require('express');
var router = express.Router();
let seatController = require('../controllers/seats');
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');

// GET all seats
router.get('/', async function(req, res) {
    try {
        let seats = await seatController.GetAllSeats();
        if (!seats) {
            return CreateErrorResponse(res, 404, "No seats found");
        }
        res.json(seats);
    } catch (error) {
        console.error('Error getting seats:', error);
        CreateErrorResponse(res, 500, error.message);
    }
});

// GET seat by ID
router.get('/:id', async function(req, res) {
    try {
        let seat = await seatController.GetSeatById(req.params.id);
        CreateSuccessResponse(res, 200, seat);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

// CREATE new seat
router.post('/', async function(req, res) {
    try {
        let { event_id, seat_number, status } = req.body;
        
        // Validate required fields
        if (!event_id || !seat_number || !status) {
            return CreateErrorResponse(res, 400, "Missing required fields");
        }
        
        // Validate status enum
        const validStatuses = ['available', 'reserved', 'sold'];
        if (!validStatuses.includes(status)) {
            return CreateErrorResponse(res, 400, "Invalid status value");
        }
        
        let newSeat = await seatController.CreateASeat(event_id, seat_number, status);
        CreateSuccessResponse(res, 201, newSeat);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// UPDATE seat by ID
router.put('/:id', async function(req, res) {
    try {
        let updatedSeat = await seatController.UpdateASeat(req.params.id, req.body);
        CreateSuccessResponse(res, 200, updatedSeat);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// DELETE seat by ID
router.delete('/:id', async function(req, res) {
    try {
        let deletedSeat = await seatController.DeleteASeat(req.params.id);
        CreateSuccessResponse(res, 200, deletedSeat);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// GET seats by event ID
router.get('/event/:id', async function(req, res) {
    try {
        let seats = await seatController.GetSeatsByEventId(req.params.id);
        CreateSuccessResponse(res, 200, seats);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

module.exports = router;