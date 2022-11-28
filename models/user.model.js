const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
    },
    rol: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
    },
    date: {
        type: Date,
        default: Date.now
    },
});

UserSchema.methods.encryptPassword = function () {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
}

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const UserModel = model("users", UserSchema);

module.exports = { UserModel }