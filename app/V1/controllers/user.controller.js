const { generateAccessToken } = require("../auth/authJWT");
const User = require("../models/user.model")

// Define uma função que retorna todos os usuários cadastrados
exports.getAll = async (req, res) => {
    try {
        // Aguarda a execução da função User.getAll que busca os dados dos usuários no banco de dados 
        const data = await User.getAll();
        // Envia uma resposta com o status 200 (sucesso) e os dados dos usuários
        res.status(200).send(data)
    } catch (error) {
        // Envia uma resposta com o status 503 (serviço indisponível) e uma mensagem de erro
        res.status(503).send({ message: 'fail to find all users' })
    }
}

// Define uma função que cria um novo usuário com os dados enviados na requisição
exports.create = async (req, res) => {
    // Extrai o corpo da requisição
    const { body } = req
    // Verifica se o corpo da requisição está vazio 
    if (!body) {
        // Envia uma resposta com o status 400 (requisição inválida) e uma mensagem de erro
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Cria um objeto user com os dados do corpo da requisição 
    const user = new User({
        login: body.login,
        first_name: body.first_name,
        last_name: body.last_name,
        image_url: body.image_url,
        active: body.active
    });
    // Define a data da última modificação do usuário como a data atual
    user.last_modified_date = new Date()

    // Ignore essa linha por enquanto
    user.password_hash = 'TODO: add auth'
    try {
        // Aguarda a execução da função User.create que salva o usuário no banco de dados
        const data = await User.create(user)
        // Envia uma resposta com o status 200 (sucesso) e os dados do usuário criado
        res.status(200).send(data);
        return
    } catch (error) {
        // Envia uma resposta com o status 500 (erro interno do servidor) e uma mensagem de erro
        res.status(500).send({ message: error.message || "Some error occurred while creating the User." });
    }
}

exports.removeAll = async (req, res) => {
    // tenta remover todos usuario
    try {
        const data = await User.removeAll()
        res.status(200).send(data)

    } catch (error) {
        res.status(503).send({
            message: 'fail to remove all users'
        })
    }
}

// Define uma função que retorna o usuário com o id informado na requisição
exports.findById = async (req, res) => {
    // Extrai o parâmetro :id da URL
    const { id } = req.params
    try {
         // Aguarda a execução da função User.findById que busca o usuário com o id informado no banco de dados 
        const data = await User.findById(id)
         // Envia uma resposta com o status 200 (sucesso) e os dados do usuário encontrado
        res.status(200).send(data)
    } catch (error) {
         // Imprime o erro no console
        console.error(error)
         // Verifica se o erro é do tipo not_found, ou seja, se não encontrou o usuário com o id informado
        if ('kind' in error && error.kind === 'not_found') {
             // Envia uma resposta com o status 404 (não encontrado)
            res.sendStatus(404);
            return
        }
        // Se o codigo chegou aqui, é pq um erro desconhecido ocorreu, então envia uma resposta com o status 503 (serviço indisponível)
        res.sendStatus(503);
    }
}


exports.removeById = async (req, res) => {
    // pega o parametro :id da URL
    const { id } = req.params
    try {
        const data = await User.removeById(id)
        res.status(200).send(data)
    } catch (error) {
        if ('kind' in error && error.kind === 'not_found') {
            res.sendStatus(404);
            return
        }
        res.sendStatus(503);
    }
}

exports.updateById = async (req, res) => {

    // pega o parametro :id da URL
    const { id } = req.params

    const { body } = req

    // Valida o request
    if (!body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Organiza os valores recebidos em um novo usuario
    const user = new User({
        login: body.login,
        password_hash: body.password_hash,
        first_name: body.first_name,
        last_name: body.last_name,
        image_url: body.image_url,
        active: body.active,
    });

    // define a ultima data de atualização para agora
    user.last_modified_date = new Date()

    try {
        const data = await User.updateById(id, user)
        res.sendStatus(200)
    } catch (error) {
        if ('kind' in error && error.kind === 'not_found') {
            res.sendStatus(404);
            return
        }
        res.sendStatus(503)
    }
}

