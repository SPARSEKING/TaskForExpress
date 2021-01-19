const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const User = require('../models/User.js');

class UsersService {
    getUsers = async () => {
        return await User.find();
    }

    update = async (updateData, id) => {
        if(updateData.password === undefined) {
            const updateUser =  await User.updateOne({ _id: id}, {$set:{ login: updateData.login}});
            return updateUser;
        } else if(updateData.login === undefined) {
            const salt = await bcrypt.genSalt(10);
            const updateUser =  await User.updateOne({ _id: id}, {$set:{ password: await bcrypt.hash(updateData.password, salt)}});
            return updateUser;
        } else {
            const updateUser =  await User.updateOne({ _id: id}, {$set:{ login: updateData.login, password: await bcrypt.hash(updateData.password, salt)}});
            return updateUser;
        }
    }

    deleteUser = async (id) => {
           return await User.remove({ _id: id})   
    }

    login = async (user) => {
        const candidate = await User.findOne({ login: user.login})
        if(candidate) {
            const passwordResult = await bcrypt.compare(user.password, candidate.password);
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

    register = async (newUser) => {
        const salt = await bcrypt.genSalt(10);
        const user = new User({
            login: newUser.login,
            password:await bcrypt.hash(newUser.password, salt)
        })
        await user.save();
        return user;
    }
}

module.exports = new UsersService();