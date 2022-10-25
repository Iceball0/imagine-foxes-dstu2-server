const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('Users', {
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hashed_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    access_token: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "users",
    timestamps: false
})

module.exports = User;