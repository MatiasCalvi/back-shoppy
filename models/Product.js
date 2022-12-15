const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  photo: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  dateCreated: { type: Date, required: true },
  specifications: { type: Object, required: true },
});

const Product = mongoose.model("products", schema);
module.exports = Product;
