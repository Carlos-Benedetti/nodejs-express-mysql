// Importar o módulo userRoutes para definir as rotas relacionadas aos usuários
const userRoutes = require("./routes/user.routes");

module.exports = () => {

    // Cria uma nova rota
    var router = require("express").Router();

    // Rota simples para a raiz da versão 1 da API
    router.get("/", (req, res) => {
        // Enviar uma resposta em formato JSON com uma mensagem
        res.json({ message: "hello world V1." });
    });

    // Usar o módulo userRoutes para definir as rotas relacionadas aos usuários
    router.use('/user', userRoutes())

    // Retornar a rota criada
    return router

}
