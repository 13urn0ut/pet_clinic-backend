const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../models/appointmentModel");
const { getUserByEmail } = require("../models/userModel");
const AppError = require("../utils/appError");
const { capitalise } = require("../utils/capitalise");

exports.createAppointment = async (req, res, next) => {
  try {
    const { date, time, notes, pet_name, email } = req.body;

    const user = await getUserByEmail(email);

    const newAppointment = await createAppointment({
      date: `${date}T${time}:00.000Z`,
      notes: notes || "",
      pet_name,
      user_id: user.id,
      confirmed: false,
    });

    if (!newAppointment) throw new AppError("Appointment not created", 500);

    res.status(200).json({ status: "success", data: newAppointment });
  } catch (err) {
    next(err);
  }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    const { page, limit, sortBy, sortDirection } = req.query;

    const data = await getAllAppointments({
      page: page || 1,
      limit: limit || 10,
      sortBy: sortBy || "date",
      sortDirection: sortDirection || "ASC",
      userId: req.user.role === "admin" ? null : req.user.id,
    });

    data.appointments.forEach((appointment) => {
      appointment.pet_name = capitalise(appointment.pet_name);
      appointment.first_name = capitalise(appointment.first_name);
      appointment.last_name = capitalise(appointment.last_name);
    });

    res.status(200).json({
      status: "success",
      results: data.count,
      data: data.appointments,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, time, notes, pet_id, confirmed } = req.body;

    const appointment = {
      date: date && time ? `${date}T${time}:00.000Z` : undefined,
      notes,
      pet_id,
      confirmed: confirmed || false,
    };

    const updatedAppointment = await updateAppointment(id, appointment);

    if (!updatedAppointment) throw new AppError("Appointment not updated", 500);

    res.status(200).json({ status: "success", data: updatedAppointment });
  } catch (err) {
    next(err);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await deleteAppointment(id);

    if (!deletedAppointment) throw new AppError("Appointment not deleted", 500);

    res.status(200).json({ status: "success", data: deletedAppointment });
  } catch (err) {
    next(err);
  }
};
