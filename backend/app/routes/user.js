const express = require("express");
const UserController = require("../controllers/user");
const validationMiddleware = require("../middlewares/validationMiddleware");
const checkAuth = require("../middlewares/checkAuth");
const { param } = require('express-validator');


const route = express.Router()


route.post('/register',validationMiddleware, UserController.register)
route.post('/login',validationMiddleware, UserController.login)
route.get('/:id', param('id'), checkAuth, UserController.getOneById)


module.exports = route