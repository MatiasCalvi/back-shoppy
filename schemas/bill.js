const joi = require("joi");

const schema = joi.object({
  totalPrice: joi.number().required().min(0).messages({
    "number.base": "El precio total tiene que ser un número",
    "any.required": "Precio total es requerido",
    "number.empty": "El precio total no tiene que estar vacío",
  }),
  discount: joi.boolean().required().messages({
    "boolean.base": "Descuento debe ser true o false",
    "any.required": "Debe especificar si se aplico descuento o no",
  }),
});

module.exports = schema;
