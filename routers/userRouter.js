const userRouter = require("express").Router();
const {
  signup,
  login,
  protect,
  logout,
  getAuthenticatedUser,
} = require("../controllers/authController");
const { updateAppointment } = require("../controllers/appointmentController");
const {
  checkSignupBody,
  checkLoginBody,
  checkUpdateAppointmentBody,
} = require("../validators/checkBody");
const { checkAppointmentId } = require("../validators/checkParams");
const validate = require("../validators/validate");

userRouter.route("/signup").post(checkSignupBody, validate, signup);

userRouter.route("/login").post(checkLoginBody, validate, login);

userRouter.route("/logout").get(protect, logout);

userRouter.route("/me").get(protect, getAuthenticatedUser);

userRouter
  .route("/appointments/:id")
  .all(protect, checkAppointmentId)
  .patch(checkUpdateAppointmentBody, validate, updateAppointment);

module.exports = userRouter;
