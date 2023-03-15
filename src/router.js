const express = require('express');
const { listCategories } = require('./controllers/categories')
const { verifyLogin } = require('./filter/verifyLogin');
const {
    registerUser,
    login,
    detailUser,
    updateUser
} = require('./controllers/users');
const {
    listTransactions
} = require('./controllers/transactions')

const router = express();

//users
router.post('/usuario', registerUser);
router.post('/login', login);
router.get('/usuario', verifyLogin, detailUser);
router.patch('/usuario', verifyLogin, updateUser);

//categories
router.get('/categoria', verifyLogin, listCategories);

//transactions
router.get('/transacao', verifyLogin, listTransactions);

module.exports = router;