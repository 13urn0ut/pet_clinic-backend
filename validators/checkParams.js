const { param } = require("express-validator");
const { getAppointmentById } = require("../models/appointmentModel");

exports.checkAppointmentId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Invalid id")
    .custom(async (id, { req }) => {
      try {
        const appointment = await getAppointmentById(id);

        if (!appointment) throw new Error("Appointment not found");

        if (appointment.user_id !== req.user?.id)
          throw new Error("You are not the owner of this appointment");

        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),
];
