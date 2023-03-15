CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transacoes (
    id SERIAL PRIMARY KEY,
    descricao TEXT,
    valor INTEGER NOT NULL,
    data timestamptz NOT NULL DEFAULT NOW(),
    categoria_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    tipo TEXT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO categorias(descricao) VALUES ('Alimentação');
INSERT INTO categorias(descricao) VALUES ('Assinaturas e Serviços');
INSERT INTO categorias(descricao) VALUES ('Casa');
INSERT INTO categorias(descricao) VALUES ('Cuidados Pessoais');
INSERT INTO categorias(descricao) VALUES ('Educação');
INSERT INTO categorias(descricao) VALUES ('Família');
INSERT INTO categorias(descricao) VALUES ('Lazer');
INSERT INTO categorias(descricao) VALUES ('Mercado');
INSERT INTO categorias(descricao) VALUES ('Pets');
INSERT INTO categorias(descricao) VALUES ('Presentes');
INSERT INTO categorias(descricao) VALUES ('Roupas');
INSERT INTO categorias(descricao) VALUES ('Saúde');
INSERT INTO categorias(descricao) VALUES ('Salário');
INSERT INTO categorias(descricao) VALUES ('Transporte');
INSERT INTO categorias(descricao) VALUES ('Vendas');
INSERT INTO categorias(descricao) VALUES ('Outras receitas');
INSERT INTO categorias(descricao) VALUES ('Outras despesas');