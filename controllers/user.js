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
    let {
      name,
      lastName,
      dni,
      adress,
      cp,
      role,
      photo,
      age,
      email,
      phone,
      password,
      products,
      favorites,
    } = req.body;
    let code = crypto.randomBytes(10).toString("hex");
    let verified = false;
    let logged = false;
    let dateOriginal = new Date();
    let coins = 0;
    let nameDni = "";
    let nick = "";
    let aprove=false;
    function formatoFecha(fecha, formato) {
      const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear(),
      };

      return formato.replace(/dd|mm|yy|yyy/gi, (matched) => map[matched]);
    }

    let date = formatoFecha(dateOriginal, "dd/mm/yy");
    password = bcryptjs.hashSync(password, 10);

    try {
      await User.create({
        nick,
        nameDni,
        name,
        lastName,
        dni,
        adress,
        cp,
        role,
        photo,
        age,
        email,
        phone,
        password,
        code,
        verified,
        logged,
        products,
        favorites,
        date,
        coins,
        aprove
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
        return res.redirect(`${FRONT_URL}ingresar`);
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
            aprove: userDb.aprove
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
          favorites: user.favorites,
          date: user.date,
          phone: user.phone,
          cp: user.cp,
          nick: user.nick,
          coins: user.coins,
          aprove: user.aprove
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
          lastName: user.lastName,
          dni: user.dni,
          adress: user.adress,
          role: user.role,
          photo: user.photo,
          age: user.age,
          email: user.email,
          logged: user.logged,
          products: user.products,
          favorites: user.favorites,
          date: user.date,
          phone: user.phone,
          cp: user.cp,
          nick: user.nick,
          coins: user.coins,
          nameDni: user.nameDni,
          aprove: user.aprove
        },
        succes: true,
        message: "Welcome " + user.name,
      }).populate(["products.productId", "favorites"]);;

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

      let user = await User.findById({ _id: _id }).populate(["products.productId", "favorites"]);
      let userAux = {
        name: user.name,
        nameDni: user.coins,
        lastName: user.lastName,
        dni: user.dni,
        adress: user.adress,
        role: user.role,
        photo: user.photo,
        date: user.date,
        age: user.age,
        email: user.email,
        logged: user.logged,
        products: user.products,
        favorites: user.favorites,
        phone: user.phone,
        cp: user.cp,
        nick: user.nick,
        coins: user.coins,
        aprove: user.aprove
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
      let { password } = req.body;
      password = bcryptjs.hashSync(password, 10);
      req.body.password = password;
    }
    try {
      let user = await User.findOneAndUpdate({ _id: _id }, req.body, {
        new: true,
      }).populate(["products.productId", "favorites"]);
      if (user) {
        res.status(200).json({
          success: true,
          message: "user updated",
          response: user,
          id: user._id,
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
