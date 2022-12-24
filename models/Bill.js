const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  date: { type: Date, required: true },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  coins: { type: Number, required: true },
});

const Bill = mongoose.model("bills", schema);
module.exports = Bill;
