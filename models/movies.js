const mongoose = require('mongoose');
const Joi = require('joi');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200
    },
    releaseDate: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10,
    },
    genre: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    poster: {
        type: String,
        minlength: 1,
        maxlength: 1000
    },
    promo: {
        type: String,
        minlength: 1,
        maxlength: 1000
    },
    story: {
        type: String,
        minlength: 1,
        maxlength: 2000
    },
    director: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    writers: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    cast: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    }
}));

function validateMovie(movieData) {
    let schema = {
        title: Joi.string().min(1).max(200).required(),
        releaseDate: Joi.string().min(1).max(10).required(),
        genre: Joi.string().min(1).max(100).required(),
        poster: Joi.string().min(1).max(1000),
        story: Joi.string().min(1).max(2000),
        director: Joi.string().min(1).max(100).required(),
        writers: Joi.string().min(1).max(100).required(),
        cast: Joi.string().min(1).max(100).required()

    }

    return Joi.validate(movieData, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;