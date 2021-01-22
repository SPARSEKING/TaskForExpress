const { Sequelize, DataTypes } = require('sequelize');
const keys = require('../config/keys.js');
const { hashSync } = require('bcryptjs');
const database = new Sequelize(keys.postgresURI);

const User = database.define('Users', {
    login: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('password', hashSync(value))
        }
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
})

User.sync({ force: false });

module.exports = User;