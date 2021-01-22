const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const User = require('../models/User.js');

class UsersService {
    getUsers = async () => {
        return User.find();
    }

    update = async (updateData, id) => {
        if(updateData.password === undefined) {
            const updateUser = await User.updateOne({ _id: id}, {$set:{ login: updateData.login }})
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

    deleteUser = (id) => {
        return User.remove({ _id: id})   
    }

    login = async (user) => {
        const candidate = await User.findOne({ login: user.login })
        if(candidate) {
            const passwordResult = await bcrypt.compare(user.password, candidate.password);
            if (passwordResult) {
                const token = jwt.sign({
                    login: candidate.login
                }, keys.jwt, {expiresIn: 60 * 60})
                return {token, candidate};
            } else {
                return createError(404, 'Password entered incorrectly.');
            }
        } else {
            return createError(404, 'User with this login was not found.');
        }
    }

    register = async (newUser, file, filePath) => {
        const user = new User({
            login: newUser.login,
            password: newUser.password,
            image: file ? path: ''
        })
        console.log(path)
        await user.save();
        return user;
    }
}

module.exports = new UsersService();