let router = require("express").Router();
let user = require("./user");
let product = require("./product");
const bill = require("./bill");

router.use("/auth", user);
router.use("/product", product);
router.use("/bill", bill);

module.exports = router;
