const router = require("express").Router();
const passport = require("passport");
const validator = require("../middlewares/validator");
const isAdmin = require("../middlewares/isAdmin");
const { schemaPost, schemaPut } = require("../schemas/product");

const {
  create,
  read,
  readOne,
  update,
  destroy,
} = require("../controllers/product");

router
  .route("/")
  .post(
    validator(schemaPost),
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    create
  )
  .get(read);

router
  .route("/:id")
  .get(readOne)
  .put(
    validator(schemaPut),
    passport.authenticate("jwt", { session: false }),
    update
  )
  .delete(passport.authenticate("jwt", { session: false }), isAdmin, destroy);

module.exports = router;
