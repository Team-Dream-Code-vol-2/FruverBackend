const { GenericService } = require("./generic.service");
const { UserModel } = require("../models/user.model")

class UserService extends GenericService {
    constructor () {
        if (!UserService.instance) {
            super(UserModel);
            UserService.instance = this;
        }
        return UserService.instance;
    }

    async create (data) {
        const model = new this.model(data);
        model.encryptPassword()
        return model.save();
    }
}

module.exports = { UserService: new UserService() }