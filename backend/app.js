const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require("helmet");

require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(express.urlencoded({ extended: false }));
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false }));

// Traiter la data en transit d'un point A à un point B
app.use(cookieParser());

// JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

//Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//Dossier où stocker les images
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;