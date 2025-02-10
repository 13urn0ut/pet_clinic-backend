const appointmentRouter = require("express").Router();
const {
  createAppointment,
  getAllAppointments,
} = require("../controllers/appointmentController");
const { protect } = require("../controllers/authController");
const { checkCreateAppointmentBody } = require("../validators/checkBody");
const { checkGetAllAppointmentsFilter } = require("../validators/checkQuery");
const validate = require("../validators/validate");

appointmentRouter
  .route("/")
  .all(protect)
  .get(checkGetAllAppointmentsFilter, validate, getAllAppointments)
  .post(checkCreateAppointmentBody, validate, createAppointment);

module.exports = appointmentRouter;
