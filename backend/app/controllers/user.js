const { where } = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  static async login (req, res, next) {

    const user = await User.findOne({ 
        where: { email: req.body.email }
    })

    if(!user) return res.status(400).json({ message: 'Invalid data' })

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordValid) return res.status(400).json({ message: 'Invalid data' })
    
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h'})

    const userDTO = { ...user.dataValues, token };
    delete userDTO.password
    
    return res.status(200).json(userDTO)

}
  //crud
  static async getAll(req, res) {}

  static async getOneById(req, res) {
    const user = await User.findOne({ where:{ id: req.params.id }})
    if(!user) return res.status(404).json({ message: 'user not found'})
    if(!(user.email === req.auth)) return res.status(400).json({ message : 'interdit user'})
    const userDTO = user.dataValues
    delete userDTO.password
    return res.status(200).json(user.dataValues)
}

  static async updateOneById(req, res) {}

  static async deleteOneById(req, res) {}
}

module.exports = UserController;
