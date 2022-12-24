const joi = require("joi");

const schemaPost = joi.object({
  nick: joi.any()/* string().required().min(3).max(15).messages({
    "string.base": "Nick tiene que ser texto",
    "any.required": "Nick es requerido",
    "string.empty": "El nick no puede estar vacio",
    "string.min": "Nick tiene que tener al menos 3 caracteres",
    "string.max": "Nick no puede tener mas de 15 caracteres",
  }) */,
  nameDni:joi.any(),
  name: joi.string().required().min(3).max(15).messages({
    "string.base": "Nombre tiene que ser texto",
    "any.required": "Nombre es requerido",
    "string.empty": "El nombre no puede estar vacio",
    "string.min": "Nombre tiene que tener al menos 3 caracteres",
    "string.max": "Nombre no puede tener mas de 15 caracteres",
  }),
  lastName: joi.string().required().min(3).max(15).messages({
    "string.base": "Apellido tiene que ser texto",
    "any.required": "Apellido es requerido",
    "string.empty": "El apellido no puede estar vacio",
    "string.min": "Apellido tiene que tener al menos 3 caracteres",
    "string.max": "Apellido no puede tener mas de 15 caracteres",
  }),
  dni: joi.string().length(8).pattern(/[0-9]/).messages({
    "any.required": "DNI es requerido",
    "string.base": "DNI tiene que ser texto",
    "string.length": "DNI tiene que tener 8 digitos",
    "string.pattern.base": "DNI caracteres tienen que ser números",
  }),
  adress: joi.string().required().messages({
    "string.base": "Direccion tiene que ser texto",
    "any.required": "Direccion es requerido",
    "string.empty": "La direccion no puede estar vacia",
  }),
  cp: joi.string().required().messages({
    "string.base": "Codigo Postal tiene que ser texto",
    "any.required": "Codigo Postal es requerido",
    "string.empty": "El Codigo Postal no puede estar vacio",
  }),
  role: joi.string().required().messages({
    "string.base": "Role tiene que ser texto",
    "any.required": "Role es requerido",
    "string.empty": "El role no puede estar vacio",
  }),
  photo: joi.string().uri().messages({
    "string.base": "El url tiene que ser texto",
    "any.required": "El url es requerido",
    "string.empty": "El url no puede estar vacio",
    "string.uri": "Tiene que ser una url válida",
  }),
  age: joi.number().min(18).max(120).required().messages({
    "number.base": "Edad tiene que ser un número",
    "any.required": "Edad es requerido",
    "number.empty": "El edad no puede estar vacia",
    "number.min": "El mínimo de edad tiene que ser 18 años",
    "number.max": "La edad máxima es de 120 años",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email tiene que ser texto",
      "any.required": "Email es requerido",
      "string.empty": "El email no puede estar vacio",
      "string.email": "Email tiene que ser un email válido",
    }),
  phone: joi.any()
    /* .string()
    .required()
    .pattern(/^[0-9]+$/)
    .messages({
      "any.required": "El numero de telefono es requerido",
      "string.base": "El numero de telefono tiene que ser texto",
      "string.pattern.base": "El numero de telefono tienen que ser 0-9 o +",
    }) */,
  password: joi.string().required().min(6).messages({
    "string.base": "La contraseña tiene que ser texto",
    "any.required": "La contraseña es requerido",
    "string.empty": "La contraseña no puede estar vacio",
    "string.min": "La contraseña tiene que tener al menos 3 caracteres",
    "string.max": "La contraseña no tiene que superar los 30 caracteres",
  }),
  products: joi.array().required().messages({
    "any.required": "Productos es requerido",
    "array.base": "Productos tiene que ser un arreglo",
  }),
  favorites: joi.array().required().messages({
    "any.required": "Favoritos es requerido",
    "array.base": "Favoritos tiene que ser un arreglo",
  }),
  
});

const schemaPatch = joi.object({

  nameDni: joi.string(),

  nick: joi.string().min(3).max(15).messages({
    "string.base": "Nick tiene que ser texto",
    "any.required": "Nick es requerido",
    "string.empty": "El nick no puede estar vacio",
    "string.min": "Nick tiene que tener al menos 3 caracteres",
    "string.max": "Nick no puede tener mas de 15 caracteres",
  }),
  name: joi.string().min(3).max(15).messages({
    "string.base": "Nombre tiene que ser texto",
    "any.required": "Nombre es requerido",
    "string.empty": "El nombre no puede estar vacio",
    "string.min": "Nombre tiene que tener al menos 3 caracteres",
    "string.max": "Nombre no puede tener mas de 15 caracteres",
  }),
  lastName: joi.string().min(3).max(15).messages({
    "string.base": "Apellido tiene que ser texto",
    "any.required": "Apellido es requerido",
    "string.empty": "Apellido no puede estar vacio",
    "string.min": "Apellido tiene que tener al menos 3 caracteres",
    "string.max": "Apellido no puede tener mas de 15 caracteres",
  }),
  dni: joi.string().length(8).pattern(/[0-9]/).messages({
    "any.required": "DNI es requerido",
    "string.base": "DNI tiene que ser texto",
    "string.length": "DNI tiene que tener 8 digitos",
    "string.pattern.base": "DNI caracteres tienen que ser números",
  }),
  adress: joi.string().messages({
    "string.base": "Direccion tiene que ser texto",
    "any.required": "Direccion es requerido",
    "string.empty": "Direccion no puede estar vacia",
  }),
  cp: joi.string().messages({
    "string.base": "Codigo Postal tiene que ser texto",
    "any.required": "Codigo Postal es requerido",
    "string.empty": "El Codigo Postal no puede estar vacio",
  }),
  role: joi.string().messages({
    "string.base": "Role tiene que ser texto",
    "any.required": "Role es requerido",
    "string.empty": "El role no puede estar vacio",
  }),
  photo: joi.string().uri().messages({
    "string.base": "El url tiene que ser texto",
    "any.required": "El url es requerido",
    "string.empty": "El url no puede estar vacio",
    "string.uri": "Tiene que ser una url válida",
  }),
  age: joi.number().min(18).max(120).messages({
    "number.base": "Edad tiene que ser un número",
    "any.required": "Edad es requerido",
    "number.empty": "El edad no puede estar vacia",
    "number.min": "El mínimo de edad tiene que ser 18 años",
    "number.max": "La edad máxima es de 120 años",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.base": "Email tiene que ser texto",
      "any.required": "Email es requerido",
      "string.empty": "El email no puede estar vacio",
      "string.email": "Email tiene que ser un email válido",
    }),
  phone: joi
    .string()
    .pattern(/^[0-9]+$/)
    .messages({
      "any.required": "El numero de telefono es requerido",
      "string.base": "El numero de telefono tiene que ser texto",
      "string.pattern.base": "El numero de telefono tienen que ser 0-9 o +",
    }),
  password: joi.string().min(6).messages({
    "string.base": "La contraseña tiene que ser texto",
    "any.required": "La contraseña es requerido",
    "string.empty": "La contraseña no puede estar vacio",
    "string.min": "La contraseña tiene que tener al menos 3 caracteres",
    "string.max": "La contraseña no tiene que superar los 30 caracteres",
  }),
  passwordCurrent: joi.string().min(6).messages({
    "string.base": "La contraseña tiene que ser texto",
    "any.required": "La contraseña es requerido",
    "string.empty": "La contraseña no puede estar vacio",
    "string.min": "La contraseña tiene que tener al menos 3 caracteres",
    "string.max": "La contraseña no tiene que superar los 30 caracteres",
  }),
  products: joi.array().messages({
    "any.required": "Productos es requerido",
    "array.base": "Productos tiene que ser un arreglo",
  }),
  favorites: joi.array().messages({
    "any.required": "Favoritos es requerido",
    "array.base": "Favoritos tiene que ser un arreglo",
  }),
  coins: joi.number().messages({
    "number.base": "Monedas tiene que ser un número",
    "any.required": "Monedas es requerido",
    "number.empty": "Monedas no puede estar vacia",    
  }),
  aprove: joi.boolean()
});

module.exports = { schemaPost, schemaPatch };
