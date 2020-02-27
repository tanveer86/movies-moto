const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genres', genreSchema);

function validateGenre(genreData) {
    let schema = {
        name: Joi.string().min(1).max(50).required()
    }

    return Joi.validate(genreData, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;