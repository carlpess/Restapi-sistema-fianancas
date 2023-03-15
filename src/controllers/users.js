const connection = require('../conexao');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const yup = require("yup");
const { pt } = require("yup-locales");
const secret = require('../secret');
yup.setLocale(pt);

const pwd = securePassword();

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    const schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        senha: yup.string().min(8).required()
    });

    try {
        await schema.validate(req.body);

        const userFound = await connection('usuarios').where({ email }).first();

        if (userFound) {
            return res.status(400).json('O email informado já está cadastrado.')
        }

        const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
        const registeredUser = await connection('usuarios').insert({
            nome,
            email,
            senha: hash
        }).returning('*')

        if (!registeredUser) {
            return res.status(400).json('Não foi possível cadastrar o usuário');
        }

        const { senha: _, ...user } = registeredUser[0];

        return res.status(201).json(user);
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    registerUser
}