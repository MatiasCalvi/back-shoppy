const joi = require("joi");

const schemaPost = joi.object({
  name: joi.string().required().min(3).max(30).messages({
    "string.base": "Name must be a text",
    "any.required": "Name is required",
    "string.empty": "The name must not be empty",
    "string.min": "Name must have at least 3 characters",
    "string.max": "Name must not have more than 30 characters",
  }),
  category: joi.string().required().min(3).max(30).messages({
    "string.base": "Category must be a text",
    "any.required": "Category is required",
    "string.empty": "The category must not be empty",
    "string.min": "Category must have at least 3 characters",
    "string.max": "Category must not have more than 30 characters",
  }),
  photo: joi.string().required().uri().messages({
    "string.base": "The url must be a text",
    "any.required": "The url is required",
    "string.empty": "The url must not be empty",
    "string.uri": "Must be a valid url",
  }),
  brand: joi.string().required().min(3).max(30).messages({
    "string.base": "Brand must be a text",
    "any.required": "Brand is required",
    "string.empty": "The brand must not be empty",
    "string.min": "Brand must have at least 3 characters",
    "string.max": "Brand must not have more than 30 characters",
  }),
  price: joi.number().required().min(0).messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
    "number.empty": "The price must not be empty",
  }),
  stock: joi.number().required().min(0).messages({
    "number.base": "Stock must be a number",
    "any.required": "Stock is required",
    "number.empty": "The stock must not be empty",
  }),
  dateCreated: joi.string().required().messages({
    "any.required": "Date is required",
    "string.base": "Date must be a string",
  }),
  specifications: joi.object().required().messages({
    "any.required": "specifications is required",
    "object.base": "Specifications must be an object",
  }),
});

const schemaPut = joi.object({
  name: joi.string().min(3).max(30).messages({
    "string.base": "Name must be a text",
    "any.required": "Name is required",
    "string.empty": "The name must not be empty",
    "string.min": "Name must have at least 3 characters",
    "string.max": "Name must not have more than 30 characters",
  }),
  category: joi.string().min(3).max(30).messages({
    "string.base": "Category must be a text",
    "any.required": "Category is required",
    "string.empty": "The category must not be empty",
    "string.min": "Category must have at least 3 characters",
    "string.max": "Category must not have more than 30 characters",
  }),
  photo: joi.string().uri().messages({
    "string.base": "The url must be a text",
    "any.required": "The url is required",
    "string.empty": "The url must not be empty",
    "string.uri": "Must be a valid url",
  }),
  brand: joi.string().min(3).max(30).messages({
    "string.base": "Brand must be a text",
    "any.required": "Brand is required",
    "string.empty": "The brand must not be empty",
    "string.min": "Brand must have at least 3 characters",
    "string.max": "Brand must not have more than 30 characters",
  }),
  price: joi.number().min(0).messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
    "number.empty": "The price must not be empty",
  }),
  stock: joi.number().min(0).messages({
    "number.base": "Stock must be a number",
    "any.required": "Stock is required",
    "number.empty": "The stock must not be empty",
  }),
  specifications: joi.object().messages({
    "any.required": "specifications is required",
    "object.base": "Specifications must be an object",
  }),
});

module.exports = { schemaPost, schemaPut };
