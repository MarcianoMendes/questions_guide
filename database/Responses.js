const Sequelize = require("sequelize");
const connection = require("./database");

const Responses = connection.define('responses', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Responses.sync({ force: false });

module.exports = Responses;