const userController = require("../controllers/user.controller");
const User = require("../models/user.model");

module.exports = () => {

    var router = require("express").Router();

    router.route('/')
        .get(userController.getAll)
        .post(userController.create)
        .delete(userController.removeAll)

    router.route('/:id')
        .get(userController.findById)
        .put(userController.updateById)
        .delete(userController.removeById)

    return router

}
