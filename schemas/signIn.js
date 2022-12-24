const joi = require(`joi`);

const schemaSignIn = joi.object({
  email: joi.string().required().email().messages({
    "string.required": "El email es requerido",
    "string.empty": "El campo no puede estar vacío",
    "string.email": "Is not a valid email",
    "string.base": "Solo letras y numeros son válidos",
  }),
  password: joi.string().required().messages({
    "string.required": "La contraseña es requerida",
    "string.empty": "El campo no puede estar vacío",
    "string.base": "Solo letras y numeros son válidos",
  }),
});

module.exports = schemaSignIn;
