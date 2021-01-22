const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const User = require('../models/User.js');

module.exports =  async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({
                message: "User is not logged in"
            })
        }
            const decodeData = jwt.verify(token, keys.jwt)
            if(await User.findOne({ login: decodeData.login })) {
                req.user = decodeData;
                next();
            } else {
                return res.status(401).json({
                    message: "User is not logged in"
                })
            }
    }
    catch (e) {
        return res.status(401).json({                 
            message: "User is not logged in" 
        })
    }
}