const express = require("express");
const passport = require("passport");

const { UserController } = require("./../controllers/user.controller");

const router = express.Router();

router
    .route('/')
    .post(passport.authenticate("jwt", { session: false }), UserController.create.bind(UserController))
    .get(passport.authenticate("jwt", { session: false }), UserController.find.bind(UserController))

router
    .route('/:id')
    .put(passport.authenticate("jwt", { session: false }), UserController.update.bind(UserController))
    .patch(passport.authenticate("jwt", { session: false }), UserController.update.bind(UserController))
    .get(passport.authenticate("jwt", { session: false }), UserController.findOne.bind(UserController))
    .delete(passport.authenticate("jwt", { session: false }), UserController.delete.bind(UserController))

module.exports = { userRoutes: router };
