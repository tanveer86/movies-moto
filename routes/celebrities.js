const express = require('express');
const mongoose = require('mongoose');
const {Celebrity, validate} = require('../models/celebrities');
const router = express.Router();

router.get('/', async (request, response) => {
    let allCelebrities = await Celebrity.find();
    response.send(allCelebrities);
});

router.post('/', async (request, response) => {
    let {error} = validate(request.body);
    if(error) return response.send(error.details[0].message);

    let addCelebrity = new Celebrity({
        name: request.body.name,
        dob: request.body.dob,
        gender: request.body.gender,
        picture: request.body.picture,
        biography: request.body.biography
    })

    let celebrityAdded = await addCelebrity.save();
    response.send(celebrityAdded);
});

router.get('/:id', async (request, response) => {
    let getCelebrity = await Celebrity.findById(request.params.id);
    if(!getCelebrity) return response.send('invalid id provided');

    response.send(getCelebrity);
});

router.put('/:id', async (request, response) => {
    let {error} = validate(request.body);
    if(error) return response.send(error.details[0].message);

    let updateCelebrity = await Celebrity.findByIdAndUpdate(request.params.id, {
        name: request.body.name,
        dob: request.body.dob,
        gender: request.body.gender,
        picture: request.body.picture,
        biography: request.body.biography
    })

    if(!updateCelebrity) return response.send('invalid celebrity id provided');
    response.send(updateCelebrity);
});

router.delete('/:id', async (request, response) => {
    let deleteCelebrity = await Celebrity.findByIdAndRemove(request.params.id);
    if(!deleteCelebrity) return response.send('invalid celebrity id provided');

    response.send('the celebrity has been deleted from the database');
});

module.exports = router;