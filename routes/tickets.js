let  express = require('express');
let  router = express.Router();
let ticketController = require('../controllers/tickets');
let {CreateSuccessResponse,CreateErrorResponse} = require('../utils/responseHandler')
// GET all tickets
router.get('/', async function(req, res) {
    try {
        let tickets = await ticketController.GetAllTickets();
        res.send({ success: true, data: tickets });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// GET ticket by ID
router.get('/:id', async function(req, res) {
    try {
        let ticket = await ticketController.GetTicketById(req.params.id);
        res.send({ success: true, data: ticket });
    } catch (error) {
        res.status(404).send({ success: false, message: error.message });
    }
});

// CREATE new ticket
router.post('/', async function(req, res) {
    try {
        let { event_id, type, quantity, price } = req.body;
        let newTicket = await ticketController.CreateATicket(event_id, type, quantity, price);
        res.status(201).send({ success: true, data: newTicket });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// UPDATE ticket by ID
router.put('/:id', async function(req, res) {
    try {
        let updatedTicket = await ticketController.UpdateATicket(req.params.id, req.body);
        res.send({ success: true, data: updatedTicket });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// DELETE ticket by ID
router.delete('/:id', async function(req, res) {
    try {
        let deletedTicket = await ticketController.DeleteATicket(req.params.id);
        res.send({ success: true, data: deletedTicket });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

module.exports = router;