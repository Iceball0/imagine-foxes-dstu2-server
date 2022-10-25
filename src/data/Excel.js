const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Excel = sequelize.define('Excel', {
    table: {
        type: DataTypes.JSON,
        unique: true,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "excel",
    timestamps: false
})

module.exports = Excel;