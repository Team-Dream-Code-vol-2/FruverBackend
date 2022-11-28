const { GenericController } = require("./generic.controller");
const { UserService } = require("./../services/user.service");

class UserController extends GenericController {
    constructor () {
        if (!UserController.instance) {
            super(UserService);
            UserController.instance = this;
        }

        return UserController.instance;
    }
}

module.exports = { UserController: new UserController() };
