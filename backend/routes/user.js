const express = require('express');
const router = express.Router();
const max = require("../middleware/limit");

const authCtrl = require('../controllers/auth');
const userCtrl = require('../controllers/user');
const user = require('../models/User');

// auth
router.post('/register', authCtrl.signUp);
router.post('/login', max.limiter, authCtrl.signIn);
router.get('/logout', authCtrl.logout);

// user display: 'block',
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.userInfos);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.patch('/follow/:id', userCtrl.follow);
router.patch('/unfollow/:id', userCtrl.unfollow);

module.exports = router;