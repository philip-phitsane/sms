const express = require('express');
const router = express.Router();

//login page
router.get('/', (res, req) => {
    res.render('welcome');
})

//register page
router.get('/register', (res, req) => {
    res.render('render');
})

module.exports = router;