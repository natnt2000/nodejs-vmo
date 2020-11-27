const Joi = require('joi')

const createValidation = data => {
    const schema = Joi.object({
        username: Joi.string().required().min(3).max(30),
        password: Joi.string().required().min(8).max(30),
        firstname: Joi.string().required().min(3).max(30),
        lastname: Joi.string().required().min(3).max(30),
        role: Joi.string().required(),

    })

    return schema.validate(data);
}

module.exports = { createValidation }