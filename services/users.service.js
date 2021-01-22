const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const User = require('../models/User-sequelize.js');

class UsersService {
    getUsers = async () => {
        return User.findAll();
    }

    update = async (updateData, id) => {
        if(updateData.password === undefined) {
            const updateUser =  await User.update({ login: updateData.login}, { where : { id: id }});
            return updateUser;
        } else if(updateData.login === undefined) {
            const salt = await bcrypt.genSalt(10);
            const updateUser =  await User.update({ password: await bcrypt.hash(updateData.password, salt)}, { where : { id: id }} );
            return updateUser;
        } else {
            const updateUser =  await User.update({ login: updateData.login, password: await bcrypt.hash(updateData.password, salt), image: filePath}, { where : { id: id }});
            return updateUser;
        }
    }

    deleteUser = (id) => {
        return User.destroy({ where : { id: id }}) 
    }

    login = async (user) => {
        const candidate = await User.findOne({ where: {login: user.login}})
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
        const user = await User.build({
            login: newUser.login,
            password: newUser.password,
            image: file ? filePath : ''
    })

        await user.save();
        return user;
    }
}

module.exports = new UsersService();