require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working
const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3003);