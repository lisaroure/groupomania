const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.signUp = async (req, res, next) => {
    const { pseudo, email, password } = req.body
    try {
        const user = await User.create({ pseudo, email, password });
        res.status(201).json({ user: user._id })
    } catch (err) {
        res.status(200).send({ err })
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            });
        });
}
exports.signIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        res.status(200).json(err)
    }
    then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Login/Mot de passe incorrects' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Login/Mot de passe incorrects' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: maxAge }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
   
    exports.logout = (req, res, next) => {
        res.cookie('jwt', '', {maxAge: 1 });
        res.redirect('/');
    }
}