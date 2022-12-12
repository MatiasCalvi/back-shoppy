let router = require("express").Router();
const validator = require("../middlewares/validator");
const schema = require("../schemas/user");
let {
  register,
  verify,
  signIn,
  loginWithToken,
  signOut,
  readOne,
  update,
} = require("../controllers/user");
const { accountExists } = require("../middlewares/accountExistsSingUp");
const schemaSignIn = require("../schemas/signIn");
const { accountExistsSignIn } = require("../middlewares/accountExistsSignIn");
const {
  accountHasBeenVerified,
} = require("../middlewares/accountHasBeenVerified");
const passport = require("../middlewares/passport");
const mustSignIn = require("../middlewares/mustSignIn");

router.post("/signup", validator(schema), accountExists, register);
router.get("/verify/:code", verify);

router.post(
  "/signin",
  validator(schemaSignIn),
  accountExistsSignIn,
  accountHasBeenVerified,
  signIn
);

router.post(
  "/token",
  passport.authenticate("jwt", { session: false }),
  mustSignIn,
  loginWithToken
);
router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  signOut
);
router.get("/me/:id", readOne);
router.patch("/me/:id", update);

module.exports = router;
