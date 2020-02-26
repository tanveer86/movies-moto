const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genres');

router.get('/', async (request, response) => {
    let allGenre = await Genre.find();
    
    response.send(allGenre);

});

router.post('/', async (request, response) => {
    let {error} = validate(request.body);
    if(error) return response.send(error.details[0].message);

    let addGenre = new Genre({
        name: request.body.name
    });
    let genreAdded = await addGenre.save();
    response.send(genreAdded);
})

module.exports = router;