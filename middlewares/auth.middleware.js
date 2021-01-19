const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(403).json({
                message: "Пользователь не авторизирован"
            })
        }
        const decodeData = jwt.verify(token, keys.jwt)
        req.user = decodeData;
        next();
    } catch (e) {
        return res.status(403).json({
            message: "Пользователь не авторизирован"
        })
    }
}