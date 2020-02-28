const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Admin, validate} = require('../models/admin');

router.post('/', async (request, response) => {
    let {error} = validate(request.body);
    if(error) response.json(error.details[0].message);

    let checkEmail = await Admin.findOne({email: request.body.email});
    if(checkEmail) return response.json('user with this email id arleady registered!');

    let addAdmin = new Admin({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    });

    let salt = await bcrypt.genSalt(10);
    addAdmin.password = await bcrypt.hash(addAdmin.password, salt);
    let adminAdded = await addAdmin.save();

    let token = adminAdded.generateAuthToken();
    response.header('auth-token', token).json({'id': adminAdded._id, 'name': adminAdded.name});
});

module.exports = router;