const userController = require("../controllers/user.controller");
const User = require("../models/user.model");

module.exports = () => {
    // Cria um objeto roteador do Express
    var router = require("express").Router();

    // Define as rotas para a raiz do roteador
    router.route('/')
        // GET: retorna todos os usuários cadastrados
        .get(userController.getAll)
        // POST: cria um novo usuário com os dados enviados no corpo da requisição
        .post(userController.create)
        // DELETE: remove todos os usuários cadastrados
        .delete(userController.removeAll)

    // Define as rotas para um id de usuário específico
    router.route('/:id')
        // GET: retorna o usuário com o id informado na URL
        .get(userController.findById)
        // PUT: atualiza o usuário com o id informado na URL com os dados enviados no corpo da requisição
        .put(userController.updateById)
        // DELETE: remove o usuário com o id informado na URL
        .delete(userController.removeById)

    // Retorna o roteador criado
    return router
}
