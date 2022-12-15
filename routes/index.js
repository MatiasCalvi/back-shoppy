let router = require("express").Router();
let user = require("./user");
let product = require("./product")

router.use("/auth", user);
router.use("/product", product);

module.exports = router;
