const { generateAccessToken } = require("../auth/authJWT");
const User = require("../models/user.model")


exports.getAll = async (req, res) => {
    try {
        const data = await User.getAll();
        res.status(200).send(data)
    } catch (error) {
        res.status(503).send({ message: 'fail to find all users' })
    }
}

exports.create = async (req, res) => {

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
        first_name: body.first_name,
        last_name: body.last_name,
        image_url: body.image_url,
        active: body.active
    });

    // define a ultima data de atualização para agora
    user.last_modified_date = new Date()


    const token = generateAccessToken(body.password);
    user.password_hash = token;

    // tenta criar o usuario
    try {
        const data = await User.create(user)
        res.status(200).send(data);
        return
    } catch (error) {
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

exports.findById = async (req, res) => {
    // pega o parametro :id da URL
    const { id } = req.params
    try {
        console.log('getting by id')
        const data = await User.findById(id)
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
        if ('kind' in error && error.kind === 'not_found') {
            res.sendStatus(404);
            return
        }
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

