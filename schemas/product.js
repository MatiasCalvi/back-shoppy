const joi = require("joi");

const schemaPost = joi.object({
  name: joi.string().required().min(3).max(30).messages({
    "string.base": "Nombre tiene que ser un texto",
    "any.required": "Nombre es requerido",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede tener más de 30 caracteres",
  }),
  category: joi.string().required().min(3).max(30).messages({
    "string.base": "Categoría tiene que ser un texto",
    "any.required": "Categoría es requerido",
    "string.empty": "La categoría no puede estar vacía",
    "string.min": "Categoría debe tener al menos 3 caracteres",
    "string.max": "Categoría no puede tener más de 30 caracteres",
  }),
  photo: joi.string().required().messages({
    "string.base": "La url tiene que ser texto",
    "any.required": "La url es requerida",
    "string.empty": "La url no tiene que estar vacía",
  }),
  brand: joi.string().required().min(3).max(30).messages({
    "string.base": "Marca tiene que ser un texto",
    "any.required": "Marca es requerida",
    "string.empty": "La marca no puede estar vacía",
    "string.min": "Marca no puede tener menos de 3 caracteres",
    "string.max": "La marca no puede tener más de 30 caracteres",
  }),
  price: joi.number().required().min(0).messages({
    "number.base": "El precio tiene que ser un número",
    "any.required": "Precio es requerido",
    "number.empty": "El precio no tiene que estar vacío",
  }),
  stock: joi.number().required().min(0).messages({
    "number.base": "El stock tiene que ser un número",
    "any.required": "Stock es requerido",
    "number.empty": "El campo stock no tiene que estar vacío",
  }),
  dateCreated: joi.string().required().messages({
    "any.required": "Fecha es requerido",
    "string.base": "Fecha tiene que ser un texto",
  }),
  specifications: joi.object().messages({
    "any.required": "Especificaciones es requerido",
    "object.base": "Especificaciones tiene que ser un objeto",
  }),
});

const schemaPut = joi.object({
  name: joi.string().min(3).max(30).messages({
    "string.base": "Nombre tiene que ser un texto",
    "any.required": "Nombre es requerido",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede tener más de 30 caracteres",
  }),
  category: joi.string().min(3).max(30).messages({
    "string.base": "Categoría tiene que ser un texto",
    "any.required": "Categoría es requerido",
    "string.empty": "La categoría no puede estar vacía",
    "string.min": "Categoría debe tener al menos 3 caracteres",
    "string.max": "Categoría no puede tener más de 30 caracteres",
  }),
  photo: joi.string().messages({
    "string.base": "La url tiene que ser texto",
    "any.required": "La url es requerida",
    "string.empty": "La url no tiene que estar vacía",
  }),
  brand: joi.string().min(3).max(30).messages({
    "string.base": "Marca tiene que ser un texto",
    "any.required": "Marca es requerida",
    "string.empty": "La marca no puede estar vacía",
    "string.min": "Marca no puede tener menos de 3 caracteres",
    "string.max": "La marca no puede tener más de 30 caracteres",
  }),
  price: joi.number().min(0).messages({
    "number.base": "El precio tiene que ser un número",
    "any.required": "Precio es requerido",
    "number.empty": "El precio no tiene que estar vacío",
  }),
  stock: joi.number().min(0).messages({
    "number.base": "El stock tiene que ser un número",
    "any.required": "Stock es requerido",
    "number.empty": "El campo stock no tiene que estar vacío",
  }),
  specifications: joi.object().messages({
    "any.required": "Especificaciones es requerido",
    "object.base": "Especificaciones tiene que ser un objeto",
  }),
});

module.exports = { schemaPost, schemaPut };
