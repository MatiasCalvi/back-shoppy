let router = require("express").Router();
let user = require("./user");
let product = require("./product");
let payment= require("./payment")
const bill = require("./bill");

router.use("/auth", user);
router.use("/product", product);
router.use("/bill", bill);
router.use("/payment", payment);

module.exports = router;
