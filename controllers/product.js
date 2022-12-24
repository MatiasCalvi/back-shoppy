const Product = require("../models/Product");

const controller = {
  create: async (req, res, next) => {
    try {
      let newProduct = await Product.create(req.body);
      res.status(201).json({
        response: newProduct,
        success: true,
        message: "Product created",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  read: async (req, res) => {
    let query = {};
    let order = {};
    let minPrice = 0;
    let maxPrice = 1000000;
    if (req.query.orderDate) {
      order = {
        dateCreated: req.query.orderDate,
      };
    }
    if (req.query.orderPrice) {
      order = {
        price: req.query.orderPrice,
      };
    }
    if (req.query.orderStock) {
      order = {
        stock: req.query.orderStock,
      };
    }
    if (req.query.name) {
      query = {
        name: { $regex: req.query.name, $options: "i" },
      };
    }
    if (req.query.category) {
      query = {
        ...query,
        category: req.query.category,
      };
    }
    if (req.query.minPrice) {
      minPrice = req.query.minPrice;
    }

    if (req.query.maxPrice) {
      maxPrice = req.query.maxPrice;
    }

    if (req.query.brand) {
      query = {
        ...query,
        brand: req.query.brand,
      };
    }

    try {
      let products = await Product.find(query)
        .sort(order)
        .gte("price", minPrice)
        .lte("price", maxPrice);
      if (products) {
        res.status(200).json({
          response: products,
          success: true,
          message: "Products founded",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Products not found",
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
      let product = await Product.findOne({ _id: id });
      if (product) {
        res.status(200).json({
          success: true,
          message: "Product founded",
          response: product,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not founded",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    let { id } = req.params;
    try {
      let product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (product) {
        res.status(200).json({
          response: product,
          success: true,
          message: "Product Updated",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found",
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
      let product = await Product.findOneAndDelete({ _id: id });
      if (product) {
        res.status(200).json({
          success: true,
          message: "Product deleted",
          response: product,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found",
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
