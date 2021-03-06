const usersService = require('../services/users.service');
class UsersController {

    service = usersService;

    get = async (req, res) => {
        res
            .status(200)
            .json(await this.service.getUsers())
    }

    update = async (req, res) => {
        res 
            .status(200)
            .json(await this.service.update(req.body, req.params.id))
    }

    delete = (req, res) => {
            res
            .status(200)
            .send(this.service.deleteUser(req.params.id))
    }

    login = async (req, res) => {
            res 
            .status(200)
            .send(await this.service.login(req.body))
    }

    register = async (req, res) => {
            res 
            .status(201)
            .json(await this.service.register(req.body, req.file, req.file.path))
    }
}


module.exports = new UsersController();