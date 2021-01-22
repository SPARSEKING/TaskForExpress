const { Sequelize, DataTypes } = require('sequelize');
const keys = require('../config/keys.js');
const database = new Sequelize(keys.postgresURI);

const User = database.define('Users', {
    login: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
})

User.sync({ force: false });

module.exports = User;