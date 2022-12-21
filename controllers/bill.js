const Bill = require("../models/Bill");

const controller = {
  create: async (req, res, next) => {
    if (req.user.products.length > 0) {
      body = {
        userId: req.user._id,
        date: Date.now(),
        products: req.user.products,
        totalPrice: req.body.totalPrice,
        coins: req.body.discount ? Math.round(req.body.totalPrice * 0.02) : 0,
      };
      try {
        let newBill = await Bill.create(body);
        res.status(201).json({
          response: newBill,
          success: true,
          message: "Factura creada",
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
          message: "Factura/s encontradas",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Factura/s no encontradas",
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
          message: "Factura/s encontradas",
          response: bill,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Factura/s no encontradas",
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
          message: "Factura eliminada",
          response: bill,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Factura no encontrada",
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
