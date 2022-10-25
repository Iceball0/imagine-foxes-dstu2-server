const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    host: "./src/db/users.db"
});

module.exports = sequelize;