const usersService = require('../services/users.service');
const User = require('../models/User.js');
class UsersController {

    service = usersService;

    get = (req, res) => {
        res
            .status(200)
            .send({
                users: this.service.getUsers(),
            })
    }

    add = (req, res) => {
        res
            .status(200)
            .send(this.service.addUser(req.body))
    }

    rewrite = (req, res) => {
        res 
            .status(200)
            .send(this.service.update(req.body, req.params.id))
    }

    delete = (req, res) => {
        res
            .status(200)
            .send(this.service.deleteUser(req.params.id))
    }

    login = async (req, res) => {
        const candidate = await User.findOne({ login: req.body.login})

        if(candidate) {
            res 
            .status(200)
            .send(this.service.login(req.body.login, req.body.password))
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
            .send(this.service.register(req.body.login, req.body.password))
        }
    }
}


module.exports = new UsersController();