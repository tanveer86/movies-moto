const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {Movie, validate} = require('./models/movies');
const movies = require('./routes/movies');
const celebrities = require('./routes/celebrities');
const genres = require('./routes/genres');
const admin = require('./routes/admin');

mongoose.connect('mongodb://127.0.0.1:27017/moviesmoto')
    .then(() => console.log('connected to the mognodb now!'))
    .catch(error => console.log(error))

app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/celebrities', celebrities);
app.use('/api/genres', genres);
app.use('/api/admin', admin);

app.listen(5000, () => console.log('server started running now!'));