const express = require('express');
const mongoose = require('mongoose');
const {Movie, validate} = require('../models/movies');
const router = express.Router();

router.get('/', async (request, response) => {
    let allMovies = await Movie.find();

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

    let movieAdded = await addMovie.save();
    response.send(movieAdded);
});

router.get('/:id', async (request, response) => {
    let movieDetail = await Movie.findById(request.params.id);
    if(!movieDetail) return response.send('invalided movie id provided!');

    response.send(movieDetail);
});

router.put('/:id', async (request, response) => {
    let {error} = validate(request.body);
    if(error) return response.send(error.details[0].message);

    let updateMovie = await Movie.findByIdAndUpdate(request.params.id, {
        title: request.body.title,
        releaseDate: request.body.releaseDate,
        genre: request.body.genre,
        poster: request.body.poster,
        story: request.body.story,
        director: request.body.director,
        writers: request.body.writers,
        cast: request.body.cast
    });

    if(!updateMovie) return response.send('invalid movie id provided');
    response.send(updateMovie);

});

router.delete('/:id', async (request, response) => {
    let movieDeleted = await Movie.findByIdAndRemove(request.params.id);
    if(!movieDeleted) return response.send('invalid movie id provided!');

    response.send('the movie has been deleted from the database!')
})

module.exports = router;