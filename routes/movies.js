const express = require('express');
const mongoose = require('mongoose');
const {Movie, validate} = require('../models/movies');
const {Genre} = require('../models/genres');
const {Celebrity} = require('../models/celebrities');
const router = express.Router();

router.get('/', async (request, response) => {
    let allMovies = await Movie.find();

    response.send(allMovies)
});

router.post('/', async (request, response) => {
    let {error} = validate(request.body);
    if(error) return response.json(error.details[0].message);

    let genre = await Genre.findById(request.body.genreId);
    if(!genre) return response.json('invalid genre id provided');

    let directorList = []
    let writersList = []
    let castList = []

    for(let i = 0; i < request.body.director.length; i++){
        if(await Celebrity.findById(request.body.director[i])){
            directorList.push(request.body.director[i]);
        }else{
            return response.json('invalid direcdtor id provided');
            break;
        } 
    }

    for(let i = 0; i < request.body.writers.length; i++){
        if(await Celebrity.findById(request.body.writers[i])){
            writersList.push(request.body.writers[i]);
        }else{
            return response.json('invalid writer id provided');
            break;
        }
    }

    for(let i = 0; i < request.body.cast.length; i++){
        if(await Celebrity.findById(request.body.cast[i].id)){
            castList.push(request.body.cast[i]);
        }else{
            return response.json('invalid cast id provided');
            break;
        }
    }

    let addMovie = new Movie({
        title: request.body.title,
        releaseDate: request.body.releaseDate,
        genre: {
            _id: genre._id
        },
        poster: request.body.poster,
        story: request.body.story,
        director: directorList,
        writers: writersList,
        cast: castList
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
        genreId: request.body.genreId,
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