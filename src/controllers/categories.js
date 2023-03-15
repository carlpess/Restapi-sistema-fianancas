const connection = require('../connection');

const listCategories = async (req, res) => {
    try {
        const categories = await connection('categorias');

        if (categories.length === 0) {
            return res.status(404).json('Nenhuma categoria encontrada! Se as categorias ainda não foram criadas, favor cria-las usando o script do arquivo ./src/schema.sql');
        }

        return res.status(200).json(categories);
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    listCategories
}
