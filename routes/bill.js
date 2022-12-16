const router = require("express").Router();
const passport = require("passport");
const isAdmin = require("../middlewares/isAdmin");

const { create, read, readOne, destroy } = require("../controllers/bill");

router
  .route("/")
  .post(passport.authenticate("jwt", { session: false }), create)
  .get(passport.authenticate("jwt", { session: false }), read);

router
  .route("/:id")
  .get(readOne)
  .delete(passport.authenticate("jwt", { session: false }), isAdmin, destroy);

module.exports = router;
