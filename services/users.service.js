const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const User = require('../models/User.js');

class UsersService {
    getUsers = async () => {
        const users = await User.find();
        return users;
    }

    deleteUser = async (login) => {
         await User.remove({ login: login})
    }

    login = async (login, password) => {
        const candidate = await User.findOne({ login: login})
        const passwordResult = await bcrypt.compare(password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
            return {token, candidate};
        }

    }

    register = async (login, password) => {
        const salt = await bcrypt.genSalt(10);
        const user = new User({
            login: login,
            password:await bcrypt.hash(password, salt)
        })
        await user.save();
        return user;
    }
}

module.exports = new UsersService();