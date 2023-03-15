const connection = require('../connection');
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

const login = async (req, res) => {
    const { email, senha } = req.body;

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().min(8).required()
    })

    try {
        await schema.validate(req.body);

        const user = await connection('usuarios').where({ email }).first();

        if (!user) {
            return res.status(404).json('Usuario não encontrado.');
        }

        const result = await pwd.verify(
            Buffer.from(senha),
            Buffer.from(user.senha, "hex")
        );

        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json('Senha ou email incorretos');
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
                    await connection('usuarios').update({ senha: hash }).where({ email });
                } catch { }
                break;
        }

        const { senha: _, ...usuario } = user;

        const token = jwt.sign({ id: user.id }, secret);

        return res.status(200).json({ usuario, token });
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

const detailUser = async (req, res) => {
    const { usuario } = req;

    res.status(200).json(usuario);
}

const updateUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { usuario } = req;

    const schema = yup.object().shape({
        nome: yup.string(),
        email: yup.string().email(),
        senha: yup.string().min(8)
    });

    try {
        await schema.validate(req.body);

        const userFound = await connection('usuarios').where({ email }).first()

        if (!userFound) {
            return res.status(400).json('O email informado já está cadastrado.')
        }


        const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');

        const updatedUser = await connection('usuarios')
            .update({
                nome,
                email,
                senha: hash,
            }).where({ id: usuario.id })

        if (!updatedUser) {
            return res.status(400).json('Não foi possivel atualizar cadastro do usuario.')
        }

        return res.status(204).json();
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    registerUser,
    login,
    detailUser,
    updateUser
}