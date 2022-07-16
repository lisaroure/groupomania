const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// user 
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.userInfos);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;