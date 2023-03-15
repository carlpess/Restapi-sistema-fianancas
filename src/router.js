const express = require('express');
const { listCategories } = require('./controllers/categories')
const { verifyLogin } = require('./filter/verifyLogin');
const {
    registerUser,
    login,
    detailUser,
    updateUser
} = require('./controllers/users');

const router = express();

router.post('/usuario', registerUser);
router.post('/login', login);
router.get('/usuario', verifyLogin, detailUser);
router.patch('/usuario', verifyLogin, updateUser);

router.get('/categoria', verifyLogin, listCategories);

module.exports = router;