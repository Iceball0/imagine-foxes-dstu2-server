const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const News = sequelize.define('News', {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mark: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "news",
    timestamps: false
})

module.exports = News;