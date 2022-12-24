function userExistsResponse(req, res) {
  return res.status(200).json({
    success: false,
    message: ["User already exists"],
  });
}

function userSignedUpResponse(req, res) {
  return res.status(201).json({
    success: true,
    message: "User signed up",
  });
}

function userSignedOutResponse(req, res) {
  return res.status(201).json({
    success: true,
    message: "User signed out",
  });
}

function userNotFoundResponse(req, res) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

function mustSignInResponse(req, res) {
  return res.status(400).json({
    success: false,
    message: "Sign in please!",
  });
}

function invalidCredentialsResponse(req, res) {
  return res.status(200).json({
    success: false,
    message: ["Email or password incorrect"],
  });
}

function verifyResponse(req, res) {
  return res.status(200).json({
    success: false,
    message: ["Please, verify your email account and try again"],
  });
}

function isNotCommentOwner(req, res) {
  return res.status(401).json({
    success: false,
    message: "You must be the owner to carry out this operation",
  });
}

function noActivity(req, res) {
  return res.status(404).json({
    success: false,
    message: "Couldn't find the activity",
  });
}

function isNotAdmin(req, res) {
  return res.status(401).json({
    success: false,
    message: "You must be an admin to do this operation",
  });
}

function passwordNotMatch(req, res) {
  return res.status(400).json({
    success: false,
    message: "La contraseña es errónea",
  });
}

module.exports = {
  userSignedUpResponse,
  userExistsResponse,
  userNotFoundResponse,
  userSignedOutResponse,
  mustSignInResponse,
  invalidCredentialsResponse,
  verifyResponse,
  isNotCommentOwner,
  noActivity,
  isNotAdmin,
  passwordNotMatch,
};
