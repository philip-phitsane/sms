const express = require('express');
const router = express.Router();

//login handle
router.get('/login', (res, req) => {
    res.render('login');
})

router.get('/register', (res, req) => {
    res.render('register')
})

//Register handle
router.post('/register', (res, req) => {
})

router.post('/register', (res, req) => {
})

//logout
router.get('/logout', (res, req) => {
})

module.exports = router;