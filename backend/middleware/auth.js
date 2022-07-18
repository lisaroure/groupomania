const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.checkUser = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    res.cookie('jwt', '', { maxAge: 1 });
                    next();
                } else {
                    let user = await User.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
            })
        } else {
            res.locals.user = null;
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error | 'Requête non-authentifiée !'
        })
    }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('No token');
    }
};
