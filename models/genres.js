const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genres', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    }
}));

function validateGenre(genreData) {
    let schema = {
        name: Joi.string().min(1).max(50).required()
    }

    return Joi.validate(genreData, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;