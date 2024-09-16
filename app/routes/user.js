const express = require("express")
const UserController = require("../controllers/user")
const route = express.Router()


route.post('/register', UserController.register)


module.exports = route