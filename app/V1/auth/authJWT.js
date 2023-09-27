const jwt = require('jsonwebtoken');

exports.generateAccessToken = (password) => {
    return jwt.sign(password, process.env.TOKEN_SECRET || '123');
}