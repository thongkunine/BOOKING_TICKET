let express = require('express');
let router = express.Router();
let orderController = require('../controllers/oders');
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');

// GET all orders
router.get('/', async function(req, res) {
    try {
        let orders = await orderController.GetAllOrders();
        CreateSuccessResponse(res, 200, orders);
    } catch (error) {
        CreateErrorResponse(res, 500, error.message);
    }
});

// GET order by ID
router.get('/:id', async function(req, res) {
    try {
        let order = await orderController.GetOrderById(req.params.id);
        CreateSuccessResponse(res, 200, order);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

// CREATE new order
router.post('/', async function(req, res) {
    try {
        let { user_id, event_id, ticket_id, seat_id, total_price, status } = req.body;
        let newOrder = await orderController.CreateAnOrder(user_id, event_id, ticket_id, seat_id, total_price, status);
        CreateSuccessResponse(res, 201, newOrder);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// UPDATE order by ID
router.put('/:id', async function(req, res) {
    try {
        let updatedOrder = await orderController.UpdateAnOrder(req.params.id, req.body);
        CreateSuccessResponse(res, 200, updatedOrder);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

// DELETE order by ID
router.delete('/:id', async function(req, res) {
    try {
        let deletedOrder = await orderController.DeleteAnOrder(req.params.id);
        CreateSuccessResponse(res, 200, deletedOrder);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

module.exports = router;