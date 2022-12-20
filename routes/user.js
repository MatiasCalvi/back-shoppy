let router = require("express").Router();
const validator = require("../middlewares/validator");
const { schemaPost, schemaPatch } = require("../schemas/user");
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
const passwordUpdateValidation = require("../middlewares/passwordUpdateValidation");

router.post("/signup", validator(schemaPost), accountExists, register);
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
router.get(
  "/me",
  validator(schemaPatch),
  passport.authenticate("jwt", { session: false }),
  readOne
);
router.patch(
  "/me",
  validator(schemaPatch),
  passport.authenticate("jwt", { session: false }),
  passwordUpdateValidation,
  update
);

module.exports = router;
