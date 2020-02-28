const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200
    },
    superAdmin: Boolean
});

adminSchema.methods.generateAuthToken = function() {
    let token = jwt.sign({id: this._id, superAdmin: this.superAdmin}, 'Tanveer');
    return token;
}

const Admin = mongoose.model('Admin', adminSchema);

function validateAdmin(adminData) {
    let schema = {
        name: Joi.string().min(1).max(40).required(),
        email: Joi.string().min(5).max(100).required(),
        password: Joi.string().min(1).max(200).required()
    }

    return Joi.validate(adminData, schema);
}

exports.Admin = Admin;
exports.validate = validateAdmin;