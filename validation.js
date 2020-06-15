const Joi = require("@hapi/joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

const loginValidation = data => {

    const schema = Joi.object().keys({

        email: Joi.string().required().email(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}
const notesValidation = data => {

    const schema = Joi.object().keys({

        address: Joi.string().required(),
        description: Joi.string().min(4).required(),
        imageUrl: Joi.string().required(),
        lat: Joi.number().required(),
        lng: Joi.number().required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.notesValidation = notesValidation;