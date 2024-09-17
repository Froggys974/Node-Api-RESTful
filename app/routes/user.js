const express = require("express")
const UserController = require("../controllers/user")
const validationMiddleware = require("../middlewares/validationMiddleware");
const authorizationMiddleware = require("../middlewares/authorizationMiddleware");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const route = express.Router()


route.post('/register',validationMiddleware, UserController.register);
route.post('/login', UserController.login);
route.get('/users/:id', authorizationMiddleware, jwtMiddleware, UserController.getOneById);


module.exports = route