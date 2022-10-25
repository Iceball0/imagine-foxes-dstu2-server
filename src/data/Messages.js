const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Messages = sequelize.define('Messages', {
    senderId: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        unique: false,
        allowNull: false
    },
    recieverId: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "messages",
    timestamps: false
})

module.exports = Messages;