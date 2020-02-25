const mongoose = require('mongoose');
const Joi = require('joi');

const Celebrity = mongoose.model('Celebrities', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    dob: {
        type: String,
        minlength: 1,
        maxlength: 100
    },
    gender: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    picture: {
        type: String,
        minlength: 1,
        maxlength: 1000
    },
    biography: {
        type: String,
        minlength: 1,
        maxlength: 10000
    }
}));

function validateCelebrity(celebData) {
    let schema = {
        name: Joi.string().min(1).max(100).required(),
        dob: Joi.string().min(1).max(100),
        gender: Joi.string().min(1).max(50).required(),
        picture: Joi.string().min(1).max(1000),
        biography: Joi.string().min(1).max(10000)
    }

    return Joi.validate(celebData, schema);
}

exports.Celebrity = Celebrity;
exports.validate = validateCelebrity;