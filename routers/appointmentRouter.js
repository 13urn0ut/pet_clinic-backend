const appointmentRouter = require("express").Router();
const { createAppointment } = require("../controllers/appointmentController");
const { protect } = require("../controllers/authController");
const { checkCreateAppointmentBody } = require("../validators/checkBody");
const validate = require("../validators/validate");

appointmentRouter
  .route("/")
  .post(protect, checkCreateAppointmentBody, validate, createAppointment);

module.exports = appointmentRouter;
