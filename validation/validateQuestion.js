//Imports
const Joi = require("joi");

const validateQuestion = (data) => {
  const validationSchema = Joi.object({
    problemStatement: Joi.string().required(),
    answer: Joi.string().required(),
    maxScore: Joi.number().required(),
  });
  return validationSchema.validate(data)
};

module.exports = validateQuestion;
 