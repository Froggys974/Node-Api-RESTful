const { where } = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
  static async register(req, res, next) {
    try {
      // check if req has props such as email and password
      if (!(req.body.password && req.body.email)) {
        return res
          .status(400)
          .json({ message: "Email and password are required." });
      }

      // check if the person who wants to subscribe is not already in the db
      const user = await User.findOne({
        where: { email: req.body.email },
      });

      if (user) {
        return res.status(409).json({ message: "User already exists." });
      }

      const hashPassword = bcrypt.hashSync(req.body.password, 10);

      const newUser = await User.create({
        email: req.body.email,
        password: hashPassword,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while registering the user." });
    }
  }
  //crud
  static async getAll(req, res) {}

  static async getOneById(req, res) {}

  static async updateOneById(req, res) {}

  static async deleteOneById(req, res) {}
}

module.exports = UserController;
