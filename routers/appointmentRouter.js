const appointmentRouter = require("express").Router();
const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../controllers/authController");
const {
  checkCreateAppointmentBody,
  checkUpdateAppointmentBody,
} = require("../validators/checkBody");
const { checkAppointmentId } = require("../validators/checkParams");
const { checkGetAllAppointmentsFilter } = require("../validators/checkQuery");
const validate = require("../validators/validate");

appointmentRouter
  .route("/")
  .all(protect)
  .get(checkGetAllAppointmentsFilter, validate, getAllAppointments)
  .post(checkCreateAppointmentBody, validate, createAppointment);

appointmentRouter
  .route("/:id")
  .all(protect, checkAppointmentId)
  .patch(checkUpdateAppointmentBody, validate, updateAppointment)
  .delete(validate, deleteAppointment);

module.exports = appointmentRouter;
