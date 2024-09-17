const { DataTypes } = require("sequelize");
const Database = require("../database");

const sequelize = Database.getInstance();

const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "user"  
    }
});

console.log(User === sequelize.models.User);
module.exports = User;