const bcryptjs = require("bcryptjs");
const { passwordNotMatch } = require("../config/responses");

function passwordUpdateValidation(req, res, next) {
  if (req.body.password) {
    if (bcryptjs.compareSync(req.body.passwordCurrent, req.user.password)) {
      delete req.body.passwordCurrent;
   /*    console.log(req.body); */
      return next();
    } else {
      return passwordNotMatch(req, res);
    }
  } else {
    next();
  }
}

module.exports = passwordUpdateValidation;
