const Bill = require("../models/Bill");

const controller = {
  create: async (req, res, next) => {
    if (req.user.products.length > 0) {
      req.body = {
        userId: req.user._id,
        date: Date.now(),
        products: req.user.products,
        totalPrice: req.body.totalPrice,
        coins: req.body.totalPrice * 0.02,
      };
      try {
        let newBill = await Bill.create(req.body);
        res.status(201).json({
          response: newBill,
          success: true,
          message: "Bill created",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "No hay productos para crear una factura",
      });
    }
  },
  read: async (req, res) => {
    let order = {};
    if (req.query.order) {
      order = {
        date: req.query.order,
      };
    }
    try {
      let bill = await Bill.find({ userId: req.user._id }).sort(order);
      if (bill) {
        res.status(200).json({
          response: bill,
          success: true,
          message: "Bill/s founded",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Bill/s not founded",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  readOne: async (req, res) => {
    let { id } = req.params;
    try {
      let bill = await Bill.findOne({ _id: id });
      if (bill) {
        res.status(200).json({
          success: true,
          message: "Bill founded",
          response: bill,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Bill not founded",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  destroy: async (req, res) => {
    let { id } = req.params;
    try {
      let bill = await Bill.findOneAndDelete({ _id: id });
      if (bill) {
        res.status(200).json({
          success: true,
          message: "Bill deleted",
          response: bill,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Bill not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controller;
