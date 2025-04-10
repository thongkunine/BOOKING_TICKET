let express = require('express');
var router = express.Router();
let ticketController = require('../controllers/tickets');
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');

// GET all tickets
router.get('/', async function(req, res) {
    try {
        let tickets = await ticketController.GetAllTickets();
        CreateSuccessResponse(res, 200, tickets);
    } catch (error) {
        CreateErrorResponse(res, 500, error.message);
    }
});

// GET ticket by ID
router.get('/:id', async function(req, res) {
    try {
        let ticket = await ticketController.GetTicketById(req.params.id);
        CreateSuccessResponse(res, 200, ticket);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

// CREATE new ticket
router.post('/', async function(req, res) {
    try {
        let { event_id, type, quantity, price } = req.body;
        let newTicket = await ticketController.CreateATicket(event_id, type, quantity, price);
        CreateSuccessResponse(res, 201, newTicket);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// UPDATE ticket by ID
router.put('/:id', async function(req, res) {
    try {
        let updatedTicket = await ticketController.UpdateATicket(req.params.id, req.body);
        CreateSuccessResponse(res, 200, updatedTicket);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// DELETE ticket by ID
router.delete('/:id', async function(req, res) {
    try {
        let deletedTicket = await ticketController.DeleteATicket(req.params.id);
        CreateSuccessResponse(res, 200, deletedTicket);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// GET tickets by event ID
router.get('/event/:id', async function(req, res) {
    try {
        let tickets = await ticketController.GetTicketsByEventId(req.params.id);
        CreateSuccessResponse(res, 200, tickets);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

module.exports = router;