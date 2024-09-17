const { where } = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
  static async register(req, res, next) {
    try {
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
        .json({ message: "An error occurred while registering the user. " + error});
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging in.' });
    }
  }
  //crud
  static async getAll(req, res) {}

  static async getOneById(req, res) {
    const userId = parseInt(req.params.id, 10);

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving user.' });
    }
  }

  static async updateOneById(req, res) {}

  static async deleteOneById(req, res) {}
}

module.exports = UserController;
