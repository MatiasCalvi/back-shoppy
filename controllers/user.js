const User = require("../models/User");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const accountVerificationEmail = require("../config/accountVerificationEmail");
const {
  userSignedUpResponse,
  userNotFoundResponse,
  invalidCredentialsResponse,
  userSignedOutResponse,
} = require("../config/responses");
const { FRONT_URL } = process.env;
const jwt = require("jsonwebtoken");

const controller = {
  register: async (req, res, next) => {
    let { name, lastName, dni, adress, role, photo, age, email, password } =
      req.body;
    let code = crypto.randomBytes(10).toString("hex");
    let verified = false;
    let logged = false;
    password = bcryptjs.hashSync(password, 10);
    try {
      await User.create({
        name,
        lastName,
        role,
        photo,
        age,
        email,
        password,
        code,
        verified,
        logged,
        dni,
        adress,
      });
      await accountVerificationEmail(email, code);
      return userSignedUpResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  verify: async (req, res, next) => {
    const { code } = req.params;
    try {
      let user = await User.findOneAndUpdate(
        { code: code },
        { verified: true },
        { new: true }
      );
      if (user) {
        return res.redirect(FRONT_URL);
      } else {
        return userNotFoundResponse(req, res);
      }
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req, res, next) => {
    const { password } = req.body;
    const { user } = req;
    try {
      const verifyPassword = bcryptjs.compareSync(password, user.password);
      if (verifyPassword) {
        const userDb = await User.findOneAndUpdate(
          { _id: user.id },
          { logged: true },
          { new: true }
        );
        const token = jwt.sign(
          {
            id: userDb._id,
            name: userDb.name,
            photo: userDb.photo,
            role: user.role,
            logged: userDb.logged,
          },
          process.env.KEY_JWT,
          { expiresIn: 60 * 60 * 24 }
        );
        let userAux = {
          name: user.name,
          lastName: user.lastName,
          dni: user.dni,
          adress: user.adress,
          role: user.role,
          photo: user.photo,
          age: user.age,
          email: user.email,
          logged: user.logged,
          products: user.products,
        };
        return res.status(200).json({
          response: {
            user: userAux,
            token,
          },
          success: true,
          message: "Welcome " + user.name,
        });
      }
      return invalidCredentialsResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  loginWithToken: async (req, res, next) => {
    let { user } = req;
    try {
      return res.json({
        response: {
          name: user.name,
          photo: user.photo,
          role: user.role,
          logged: user.logged,
        },
        succes: true,
        message: "Welcome " + user.name,
      });
    } catch (error) {
      next(error);
    }
  },
  signOut: async (req, res, next) => {
    const { _id } = req.user;
    try {
      await User.findOneAndUpdate(
        { _id: _id },
        { logged: false },
        { new: true }
      );
      return userSignedOutResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  readOne: async (req, res, next) => {
    const { _id } = req.user;
    try {
      let user = await User.findById({ _id: _id });
      let userAux = {
        name: user.name,
        lastName: user.lastName,
        dni: user.dni,
        adress: user.adress,
        role: user.role,
        photo: user.photo,
        age: user.age,
        email: user.email,
        logged: user.logged,
        products: user.products,
      };
      if (user) {
        res.status(200).json({
          success: true,
          message: "user founded",
          response: userAux,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    const { _id } = req.user;
    if (req.body.password) {
      let { password } = req.user;
      password = bcryptjs.hashSync(password, 10);
      req.body.password = password;
    }
    try {
      let user = await User.findOneAndUpdate({ _id: _id }, req.body, {
        new: true,
      });
      if (user) {
        res.status(200).json({
          success: true,
          message: "user updated",
          response: user,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = controller;
