const userRoutes = require("./routes/user.routes");

module.exports = () => {

    // Cria uma nova rota
    var router = require("express").Router();

    router.get("/", (req, res) => {
        res.json({ message: "hello world V1." });
    });

    router.use('/user', userRoutes())

    return router

}
