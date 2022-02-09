const Joi = require("joi");

const validateUser = (user) => {
    const schema = Joi.object({
        first_name: Joi.string().min(5).max(50).required(),
        last_name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(190).required(),
        mobile: Joi.number().min(10).required()
    });

    return schema.validate(user);
}

exports.validate = validateUser;