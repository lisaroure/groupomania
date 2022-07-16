const router = require('express').Router();
const max = require("../middleware/limit");

const authCtrl = require('../controllers/auth');

// auth
router.post("/register", authCtrl.signUp);
router.post('/login', max.limiter, authCtrl.signIn);
router.get('/logout', authCtrl.logout);

module.exports = router;