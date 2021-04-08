const Joi = require('@hapi/joi');

//register info validation
const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(4).required()
    };
    return Joi.validate(data, schema);
};

//login info validation
const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(4).required()
    };
    return Joi.validate(data, schema);
};