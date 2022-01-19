const Sequelize = require("sequelize");
const connection = new Sequelize('questionsguide', 'root', 'marcio79', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;