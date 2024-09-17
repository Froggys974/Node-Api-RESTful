const express = require("express")
const UserController = require("../controllers/user")
const validationMiddleware = require("../middlewares/validationMiddleware")
const route = express.Router()


route.post('/register',validationMiddleware, UserController.register)


module.exports = route