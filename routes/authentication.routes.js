const express = require("express");

const { AuthenticationController } = require("./../controllers/authentication.controller");

const router = express.Router();

router
    .route('/login')
    .post(AuthenticationController.login.bind(AuthenticationController))

module.exports = { authenticationRoutes: router };
