const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genres');
const {celebritySchema} = require('./celebrities');

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
        type: genreSchema,
        required: true
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
        type: Array,
        required: true
    },
    writers: {
        type: Array,
        required: true
    },
    cast: {
        type: Array,
        required: true
    }
}));

function validateMovie(movieData) {
    let schema = {
        title: Joi.string().min(1).max(200).required(),
        releaseDate: Joi.string().min(1).max(10).required(),
        genreId: Joi.string().required(),
        poster: Joi.string().min(1).max(1000),
        story: Joi.string().min(1).max(2000),
        director: Joi.array().required(),
        writers: Joi.array().required(),
        cast: Joi.array().required()

    }

    return Joi.validate(movieData, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;