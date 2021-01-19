const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const User = require('../models/User.js');

class UsersService {
    getUsers = async () => {
        const users = await User.find();
        return users;
    }

    update = async (login, password, id) => {
        const salt = await bcrypt.genSalt(10);
        const candidate = await User.findOne({ login: login})
        if (!candidate) {
        const updateUser =  await User.updateOne({ login: id}, {$set:{ login: login, password: await bcrypt.hash(password, salt)}});
        return updateUser;
        } else {
        return createError(409, 'Пользователь с таким логином уже существует.');
        }
    }

    deleteUser = async (login) => {
        const candidate = await User.findOne({ login: login})
        if (candidate) {
            await User.remove({ login: login})
            return candidate;
        } else {
            return createError(404, 'Пользователь с таким логином не найден.');
        }
    }

    login = async (login, password) => {
        const candidate = await User.findOne({ login: login})
        if(candidate) {
            const passwordResult = await bcrypt.compare(password, candidate.password);
            if (passwordResult) {
                const token = jwt.sign({
                    login: candidate.login,
                    userId: candidate._id
                }, keys.jwt, {expiresIn: 60 * 60})
                return {token, candidate};
            } else {
                return createError(404, 'Пароль введен неверно.');
            }
        } else {
            return createError(404, 'Пользователь с таким логином не найден.');
        }
    }

    register = async (login, password) => {
        const candidate = await User.findOne({ login: login})
        if(candidate) {
            return createError(409, 'Такой логин уже занят. Попробуйте другой.');
        } else {
            const salt = await bcrypt.genSalt(10);
        const user = new User({
            login: login,
            password:await bcrypt.hash(password, salt)
        })
        await user.save();
        return user;
        }
    }
}

module.exports = new UsersService();