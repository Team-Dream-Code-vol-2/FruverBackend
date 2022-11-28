const jwt = require("jsonwebtoken");

const { UserService } = require("../services/user.service");
const { jwt: { secret: JWT_SECRET } } = require("./../config/config")

class AuthenticationController {
    constructor() {
        if (!AuthenticationController.instance) {
            this.service = UserService
            AuthenticationController.instance = this;
        }
        return AuthenticationController.instance;
    }

    async login({ body: { email, password } }, res, next) {
        try {
            const user = await this.service.findOne({ email });
            if (!user) throw new Error("No se encontró la información del usuario");
            const isValid = user.validatePassword(password);
            if (!isValid) throw new Error("La contraseña ingresada no es válida");
            const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: 31556926 });
            res.status(200).json({ token });
        } catch (error) { next(next); }
    }
}

module.exports = { AuthenticationController: new AuthenticationController() };