//Imports
const Joi = require("joi");

const validateUser = (data) => {
  const validationSchema = Joi.object({
    teamName: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return validationSchema.validate(data)
};

module.exports = validateUser;
 