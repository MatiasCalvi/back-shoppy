const { isNotAdmin } = require("../config/responses");

function isAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  } else {
    return isNotAdmin(req, res);
  }
}

module.exports = isAdmin;
