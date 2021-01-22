const Joi = require('joi');

const createUserScheme = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
        
    image: Joi.string()
})

module.exports = createUserScheme;