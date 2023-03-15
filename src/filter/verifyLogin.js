const connection = require('../connection');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(404).json('Token não informado.');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, secret);

        const rows = await connection('usuarios').where({ id }).first();

        if (!rows) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha: _, ...usuario } = rows;

        req.usuario = usuario;

        next();
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    verifyLogin
}