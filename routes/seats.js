let express = require('express');
var router = express.Router();
let seatController = require('../controllers/seats');
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');

// GET all seats
router.get('/', async function(req, res) {
    try {
        let seats = await seatController.GetAllSeats();
        CreateSuccessResponse(res, 200, seats);
    } catch (error) {
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
        let { row, event_id,status,seat_number } = req.body;
        let newSeat = await seatController.CreateASeat(event_id,seat_number,status);
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

module.exports = router;