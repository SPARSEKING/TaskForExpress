const usersService = require('../services/users.service');
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
}


module.exports = new UsersController();