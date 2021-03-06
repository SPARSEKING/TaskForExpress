const Joi = require('joi');

const updateUserScheme = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        
    image: Joi.string()
})

module.exports = updateUserScheme;