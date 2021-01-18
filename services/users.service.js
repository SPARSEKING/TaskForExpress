const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys.js');
const User = require('../models/User.js');

const filePath = path.join(__dirname, 'files', 'text.json' );

class UsersService {
    constructor() {
       const fileData = fs.readFileSync(filePath);
        this.usersList = JSON.parse(fileData);
    }
    
    usersList = []

    getUsers = async () => {
        const users = await User.find();
        return users;
    }

    addUser = (user) => {
        this.usersList.push(user);
        this.writeFile();
        return this.usersList;
    }

    update = (dataToUpdate, id) => {
        const index  = this.usersList.findIndex(user => user.id === id);
        this.usersList[index] = {
            ...this.usersList[index],
            ...dataToUpdate,
        }
        this.writeFile();
        return this.usersList;
    }

    deleteUser = (id) => {
        this.usersList = this.usersList.filter(user => user.id !== id)
        this.writeFile();
        return this.usersList;
    }

    writeFile = () => {
        fs.writeFile(filePath, JSON.stringify(this.usersList), err => {
            if(err) {
                throw err
            }
        })
    }

    login = async (login, password) => {
        const candidate = await User.findOne({ login: login})
        const passwordResult = bcrypt.hashSync(password, candidate.password);
        if (passwordResult) {

            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
        }
    }

    register = async (login, password) => {
        const salt = bcrypt.genSaltSync(10);
        const pasword = password;
        const user = new User({
            login: login,
            password: bcrypt.hashSync(pasword, salt)
        })

        await user.save();
        
    }
}

module.exports = new UsersService();