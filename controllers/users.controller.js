const usersService = require('../services/users.service');
const User = require('../models/User.js');
class UsersController {

    service = usersService;

    get = async (req, res) => {
        res
            .status(200)
            .json(await this.service.getUsers())
    }

    delete = async (req, res) => {
        const candidate = await User.findOne({ login: req.body.login})
        if (candidate) {
            res
            .status(200)
            .send(await this.service.deleteUser(req.body.login))
        } else {
            res.status(404).json({
                message: 'Пользователь с таким логином не найден.'
            })
        }
    }

    login = async (req, res) => {
        const candidate = await User.findOne({ login: req.body.login})
        if(candidate) {
            res 
            .status(200)
            .send(await this.service.login(req.body.login, req.body.password))
        } else {
            res.status(404).json({
                message: 'Пользователь с таким логином не найден.'
            })
        }
    }

    register = async (req, res) => {
        const candidate = await User.findOne({ login: req.body.login})
        if(candidate) {
            res.status(409).json({
                message: "Такой логин уже занят. Попробуйте другой"
            })

        } else {
            res 
            .status(201)
            .json(await this.service.register(req.body.login, req.body.password))
        }
    }
}


module.exports = new UsersController();