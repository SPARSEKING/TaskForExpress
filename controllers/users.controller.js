const usersService = require('../services/users.service');
class UsersController {

    service = usersService;

    get = async (req, res) => {
        res
            .status(200)
            .json(await this.service.getUsers())
    }

    delete = async (req, res) => {
            res
            .status(200)
            .send(await this.service.deleteUser(req.body.login))
    }

    login = async (req, res) => {
            res 
            .status(200)
            .send(await this.service.login(req.body.login, req.body.password))
    }

    register = async (req, res) => {
            res 
            .status(201)
            .json(await this.service.register(req.body.login, req.body.password))
    }
}


module.exports = new UsersController();