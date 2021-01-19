const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const User = require('../models/User.js');

module.exports =  async function (req, res, next) {
    const candidate = await User.findOne({ login: user.login})
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({
                message: "Пользователь не авторизирован"
            })
        }
        if (candidate) {
            const decodeData = jwt.verify(token, keys.jwt)
            req.user = decodeData;
            next();
        } else {
            return res.status(401).json({
                message: "Пользователь не авторизирован"
            })
        }
    } catch (e) {
        return res.status(403).json({
            message: "Пользователь не авторизирован"
        })
    }
}