let router = require("express").Router();
let user = require("./user");

router.use("/auth", user);

module.exports = router;
