var express = require('express');
var router = express.Router();
let userController = require('../controllers/users')
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler')
let{check_authentication,check_authorization} = require('../utils/check_auth');
const constants = require('../utils/constants');

/* GET users listing. */

router.get('/', check_authentication, async function (req, res, next) {
  console.log("User accessing /users:", req.user);
  try {
    let users = await userController.GetAllUser();
    CreateSuccessResponse(res, 200, users);
  } catch (error) {
    CreateErrorResponse(res, 500, error.message);
  }
});

// Add route to get a specific user by ID
router.get('/:id', check_authentication, async function (req, res, next) {
  try {
    console.log("Getting user with ID:", req.params.id);
    let user = await userController.GetUserByID(req.params.id);
    if (!user) {
      return CreateErrorResponse(res, 404, "User not found");
    }
    CreateSuccessResponse(res, 200, user);
  } catch (error) {
    CreateErrorResponse(res, 500, error.message);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let body = req.body;
    let newUser = await userController.CreateAnUser(body.username, body.password, body.email, body.role);
    CreateSuccessResponse(res, 200, newUser)
  } catch (error) {
    CreateErrorResponse(res, 404, error.message)
  }
});
router.put('/:id', check_authentication, async function (req, res, next) {
  try {
    console.log("Updating user with ID:", req.params.id);
    let body = req.body;
    let updatedResult = await userController.UpdateAnUser(req.params.id, body);
    if (!updatedResult) {
      return CreateErrorResponse(res, 404, "User not found");
    }
    CreateSuccessResponse(res, 200, updatedResult);
  } catch (error) {
    CreateErrorResponse(res, 500, error.message);
  }
});

// Add route to delete a user
router.delete('/:id', check_authentication, async function (req, res, next) {
  try {
    console.log("Deleting user with ID:", req.params.id);
    let result = await userController.DeleteAnUser(req.params.id);
    if (!result) {
      return CreateErrorResponse(res, 404, "User not found");
    }
    CreateSuccessResponse(res, 200, { message: "User deleted successfully" });
  } catch (error) {
    CreateErrorResponse(res, 500, error.message);
  }
});

module.exports = router;
