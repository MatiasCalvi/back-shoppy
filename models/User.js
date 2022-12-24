const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nameDni:{type: String },
  nick: { type: String },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: Number, required: true },
  adress: { type: String, required: true },
  cp: { type: String, required: true },
  role: { type: String, required: true },
  photo: { type: String },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  password: { type: String, required: true },
  code: { type: String, required: true },
  verified: { type: Boolean, required: true },
  logged: { type: Boolean, required: true },
  date: { type: String },
  aprove: { type: Boolean,required: true },
  products: {
    type: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "products",
        },
        quantity: { type: Number },
      },
    ],
    required: true,
  },
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
  ],
  coins: { type: Number, required: true },
});

const User = mongoose.model("users", schema);
module.exports = User;
