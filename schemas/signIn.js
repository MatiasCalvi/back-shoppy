const joi = require(`joi`);

const schemaSignIn = joi.object({
  email: joi.string().required().email().messages({
    "string.required": "Please enter your email",
    "string.empty": "The field cannot be empty",
    "string.email": "Is not a valid email",
    "string.base": "Only letters and numbers are valid",
  }),
  password: joi.string().required().messages({
    "string.required": "Please enter your password",
    "string.empty": "The field cannot be empty",
    "string.base": "Only letters and numbers are valid",
  }),
});

module.exports = schemaSignIn;
