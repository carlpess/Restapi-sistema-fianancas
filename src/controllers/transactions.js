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

module.exports = {
    listTransactions
}