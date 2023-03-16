<h2 align="center">
 API para sistema de finanças
</h2>

## 🔗 Link de deploy da Api:
https://lively-dog-leg-warmers.cyclic.app

A APi pode ser testada usando um API Client como por exemplo o Insomnia utilizando o link e seguindo os [endpoints](#endpoints) descritos no readme.

A api também está sendo usada por uma aplicação feita por mim, que se encontra no link abaixo:

https://github.com/carlpess/sistema-financas-react

## 
Projeto criado como desafio durante o curso na Cubos Academy.

O objetivo era criar uma API RESTful para uma aplicação para controles de finanças pessoais.
## ⚙️  Executando

As funçoes da API são:
  - Cadastrar Usuário
  - Fazer Login
  - Detalhar Perfil do Usuário Logado
  - Editar Perfil do Usuário Logado
  - Listar categorias
  - Listar transações
  - Detalhar transação
  - Cadastrar transação
  - Editar transação
  - Remover transação
  - Obter extrato de transações
  - Filtrar transações por categoria

### **Banco de dados**

Banco de Dados PostgreSQL criado de acordo com o arquivo [Schema.sql](https://github.com/carlpess/api-sistema-financas/blob/master/src/schema.sql) do projeto e já implementado no deploy.

  <details><summary><h3>Endpoints</h3></summary>
  
  ### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha
  
**Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta o conteúdo do usuário cadastrado, incluindo seu respectivo `id` e excluindo a senha criptografada.
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
    
#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta um objeto com a propriedade **token** que como valor terá o token de autenticação gerado e uma propriedade **usuario** que possui as informações do usuário autenticado, exceto a senha do usuário.  
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, irão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será validado o token informado

### **Detalhar usuário**

#### `GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo.
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
  
#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

### **Atualizar usuário**

#### `PATCH` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.  

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

  Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.
  Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
  
  #### **Exemplo de requisição**

```javascript
// PATCH /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```
### **Listar categorias**

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição
    
- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta virá um array dos objetos (categorias) encontrados.
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
    
    #### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```
### **Listar transações do usuário logado**

#### `GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.
Serão retornadas **apenas** transações associadas ao usuário logado.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.
    
- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta um array dos objetos (transações) encontrados.
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
    
 #### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```
### **Listar transações do usuário logado**

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
     Em caso de **sucesso**, será enviado no corpo (body) da resposta um objeto que representa a transação encontrada, com todas as suas propriedades, conforme exemplo abaixo.
     Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
     
#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```
### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado. 

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores).
  
- **Resposta**
    Em caso de **sucesso**, será enviado no corpo (body) da resposta as informações da transação cadastrada, incluindo seu respectivo `id`.
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
    
 #### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas. 

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
      - descricao
      - valor
      - data
      - categoria_id
      - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)
- **Resposta**  
    Em caso de **sucesso**, não dserá enviado conteúdo no corpo (body) da resposta.
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
    
#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
 "descricao": "Sapato amarelo",
 "valor": 15800,
 "data": "2022-03-23 12:35:00",
 "categoria_id": 4,
 "tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.
- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.
    
- **Resposta**  
    Em caso de **sucesso**, não dserá enviado conteúdo no corpo (body) da resposta.
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
    
#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```
### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta um objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.
    Em caso de **falha na validação**, a resposta será com **_status code_** apropriado, e em seu corpo (body) possuirá um objeto com uma propriedade **mensagem** que contém como valor um texto explicando o motivo da falha.
    
    #### **Exemplo de requisição**

```javascript
// GET /transacao/extrato
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
 "entrada": 300000,
 "saida": 15800
}
```
  </details>
  
  ## 🛠️  Construído com
  <img height=30 src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img height=30 src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"><img height=30 src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"><img height=30 src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
 
---
por [carlpess (Carlos Pessoa)](https://github.com/carlpess)
  
  
