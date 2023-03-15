const connection = require('../conexao');
const yup = require("yup");
const { pt } = require("yup-locales");
yup.setLocale(pt);

const listTransactions = async (req, res) => {
    const { usuario } = req;

    try {
        let userTransactions = await connection('transacoes')
            .join('categorias', 'categoria_id', 'categorias.id')
            .select('transacoes.*', 'categorias.descricao as categoria_nome')
            .where('usuario_id', usuario.id);

        return res.status(200).json(userTransactions);
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

const detailTransaction = async (req, res) => {
    const { usuario } = req;
    const { id: idTransaction } = req.params;

    try {
        const userTransaction = await connection('transacoes')
            .join('categorias', 'categoria_id', 'categorias.id')
            .select('transacoes.*', 'categorias.descricao as categoria_nome')
            .where('usuario_id', usuario.id)
            .andWhere('transacoes.id', idTransaction).first();

        if (!userTransaction) {
            res.status(404).json('Transação não encontrada.')
        }

        return res.status(200).json(userTransaction)
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

const registerTransaction = async (req, res) => {
    const { usuario } = req;
    const {
        descricao,
        valor,
        data,
        categoria_id,
        tipo
    } = req.body;

    const schema = yup.object().shape({
        descricao: yup.string().required(),
        valor: yup.number().required(),
        data: yup.date().required(),
        categoria_id: yup.string().required(),
        tipo: yup.string().required()
    })

    if (tipo === 'entrada' || tipo === 'saida') { } else {
        return res.status(400).json('O campo "tipo" pode ser preenchido apenas com as palavras "entrada" ou "saida"');
    }

    try {
        await schema.validate(req.body);

        const category = await connection('categorias').where({ id: categoria_id }).first();

        if (!category) {
            return res.status(404).json('Categoria informada não encontrada.');
        }

        const transaction = await connection('transacoes').insert({
            descricao,
            valor,
            data,
            categoria_id,
            usuario_id: usuario.id,
            tipo
        }).returning('*');

        if (!transaction) {
            res.status(400).json('Não foi possivel cadastrar a transação');
        }

        const registeredTransaction = await connection('transacoes')
            .join('categorias', 'categoria_id', 'categorias.id')
            .select('transacoes.*', 'categorias.descricao as categoria_nome')
            .where('usuario_id', usuario.id)
            .orderBy('transacoes.id', 'desc').first();

        return res.status(201).json(registeredTransaction);
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

const updateTransaction = async (req, res) => {
    const { usuario } = req;
    const { id: idTransaction } = req.params;
    const {
        descricao,
        valor,
        data,
        categoria_id,
        tipo
    } = req.body;

    const schema = yup.object().shape({
        descricao: yup.string().required(),
        valor: yup.number().required(),
        data: yup.date().required(),
        categoria_id: yup.string().required(),
        tipo: yup.string().required()
    })

    if (tipo === 'entrada' || tipo === 'saida') { } else {
        return res.status(400).json('O campo "tipo" pode ser preenchido apenas com as palavras "entrada" ou "saida"');
    }

    try {
        await schema.validate(req.body);

        const category = await connection('categorias').where({ id: categoria_id }).first();

        if (!category) {
            return res.status(404).json('Categoria informada não encontrada.');
        }

        const transaction = await connection('transacoes')
            .where({ id: idTransaction })
            .andWhere({ usuario_id: usuario.id }).first();

        if (!transaction) {
            return res.status(404).json('Transação não encontrada.')
        }

        const updatedTransaction = await connection('transacoes')
            .where({ id: idTransaction })
            .andWhere({ usuario_id: usuario.id })
            .update({
                descricao,
                valor,
                data,
                categoria_id,
                tipo
            })

        if (!updatedTransaction) {
            res.status(400).json('Não foi possivel atualizar a transação');
        }

        return res.status(204).json();
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

const deleteTransaction = async (req, res) => {
    const { usuario } = req;
    const { id: idTransaction } = req.params;

    try {
        const transaction = await connection('transacoes')
            .where({ id: idTransaction })
            .andWhere({ usuario_id: usuario.id }).first();

        if (!transaction) {
            return res.status(404).json('Transação não encontrada.')
        }

        const delTransaction = await connection('transacoes').del()
            .where({ id: idTransaction });

        if (!delTransaction) {
            return res.status(400).json('não foi possivel deletar a transação');
        }

        return res.status(200).json();
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    listTransactions,
    detailTransaction,
    registerTransaction,
    updateTransaction,
    deleteTransaction
}