const userRouter = require("express").Router();
const {
  signup,
  login,
  protect,
  logout,
  getAuthenticatedUser,
} = require("../controllers/authController");
const { checkSignupBody, checkLoginBody } = require("../validators/checkBody");
const validate = require("../validators/validate");

userRouter.route("/signup").post(checkSignupBody, validate, signup);

userRouter.route("/login").post(checkLoginBody, validate, login);

userRouter.route("/logout").get(protect, logout);

userRouter.route("/me").get(protect, getAuthenticatedUser);

module.exports = userRouter;
