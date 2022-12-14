const joi = require("joi");

const schemaPost = joi.object({
  name: joi.string().required().min(3).max(15).messages({
    "string.base": "Name must be a text",
    "any.required": "Name is required",
    "string.empty": "The name must not be empty",
    "string.min": "Name must have at least 3 characters",
    "string.max": "Name must not have more than 15 characters",
  }),
  lastName: joi.string().required().min(3).max(15).messages({
    "string.base": "Last name must be a text",
    "any.required": "Last name is required",
    "string.empty": "The last name must not be empty",
    "string.min": "Last name must have at least 3 characters",
    "string.max": "Last name must not have more than 15 characters",
  }),
  dni: joi.string().length(8).pattern(/[0-9]/).messages({
    "any.required": "DNI is required",
    "string.base": "DNI must be a string",
    "string.length": "DNI must be 8 caracters long",
    "string.pattern.base": "DNI caracters must be a numbers",
  }),
  adress: joi.string().required().messages({
    "string.base": "Adress must be a text",
    "any.required": "Adress is required",
    "string.empty": "The adress must not be empty",
  }),
  role: joi.string().required().messages({
    "string.base": "Role must be a text",
    "any.required": "Role is required",
    "string.empty": "The role must not be empty",
  }),
  photo: joi.string().uri().messages({
    "string.base": "The url must be a text",
    "any.required": "The url is required",
    "string.empty": "The url must not be empty",
    "string.uri": "Must be a valid url",
  }),
  age: joi.number().min(18).max(120).required().messages({
    "number.base": "Age must be a number",
    "any.required": "Age is required",
    "number.empty": "The age must not be empty",
    "number.min": "Min age must be more than 18",
    "number.max": "Max age must be less than 120",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a text",
      "any.required": "Email is required",
      "string.empty": "The email must not be empty",
      "string.email": "Email must be a valid email",
    }),
  password: joi.string().required().messages({
    "string.base": "Password must be a text",
    "any.required": "Password is required",
    "string.empty": "The password must not be empty",
    "string.min": "Password must have at least 3 characters",
    "string.max": "Password must not have more than 30 characters",
  }),
  products: joi.array().required().messages({
    "any.required": "Products is required",
    "array.base": "Products must be an array"
  }),
});

const schemaPatch = joi.object({
  name: joi.string().min(3).max(15).messages({
    "string.base": "Name must be a text",
    "any.required": "Name is required",
    "string.empty": "The name must not be empty",
    "string.min": "Name must have at least 3 characters",
    "string.max": "Name must not have more than 15 characters",
  }),
  lastName: joi.string().min(3).max(15).messages({
    "string.base": "Last name must be a text",
    "any.required": "Last name is required",
    "string.empty": "The last name must not be empty",
    "string.min": "Last name must have at least 3 characters",
    "string.max": "Last name must not have more than 15 characters",
  }),
  dni: joi.string().length(8).pattern(/[0-9]/).messages({
    "any.required": "DNI is required",
    "string.base": "DNI must be a string",
    "string.length": "DNI must be 8 caracters long",
    "string.pattern.base": "DNI caracters must be a numbers",
  }),
  adress: joi.string().messages({
    "string.base": "Adress must be a text",
    "any.required": "Adress is required",
    "string.empty": "The adress must not be empty",
  }),
  role: joi.string().messages({
    "string.base": "Role must be a text",
    "any.required": "Role is required",
    "string.empty": "The role must not be empty",
  }),
  photo: joi.string().uri().messages({
    "string.base": "The url must be a text",
    "any.required": "The url is required",
    "string.empty": "The url must not be empty",
    "string.uri": "Must be a valid url",
  }),
  age: joi.number().min(18).max(120).messages({
    "number.base": "Age must be a number",
    "any.required": "Age is required",
    "number.empty": "The age must not be empty",
    "number.min": "Min age must be more than 18",
    "number.max": "Max age must be less than 120",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.base": "Email must be a text",
      "any.required": "Email is required",
      "string.empty": "The email must not be empty",
      "string.email": "Email must be a valid email",
    }),
  password: joi.string().messages({
    "string.base": "Password must be a text",
    "any.required": "Password is required",
    "string.empty": "The password must not be empty",
    "string.min": "Password must have at least 3 characters",
    "string.max": "Password must not have more than 30 characters",
  }),
  products: joi.array().messages({
    "any.required": "Products is required",
    "array.base": "Products must be an array"
  }),
});

module.exports = { schemaPost, schemaPatch };
