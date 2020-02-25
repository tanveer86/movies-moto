const express = require('express');
const mongoose = require('mongoose');
const {Movie, validate} = require('../models/movies');
const router = express.Router();

router.get('/', async (request, response) => {

    allMovies = await Movie.find();

    response.send(allMovies)
});

router.post('/', async (request, response) => {
    let {error} = validate(request.body);
    if(error) return response.send(error.details[0].message);

    let addMovie = new Movie({
        title: request.body.title,
        releaseDate: request.body.releaseDate,
        genre: request.body.genre,
        poster: request.body.poster,
        story: request.body.story,
        director: request.body.director,
        writers: request.body.writers,
        cast: request.body.cast
    });

    movieAdded = await addMovie.save();
    response.send(movieAdded);
});

module.exports = router;