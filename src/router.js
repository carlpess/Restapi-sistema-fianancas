const express = require('express');
const { listCategories } = require('./controllers/categories')
const { verifyLogin } = require('./filter/verifyLogin');
const {
    registerUser,
    login
} = require('./controllers/users');

const router = express();

router.post('/usuario', registerUser);
router.post('/login', login);

router.get('/categoria', verifyLogin, listCategories);

module.exports = router;