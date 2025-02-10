const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
} = require("../models/appointmentModel");
const AppError = require("../utils/appError");

exports.createAppointment = async (req, res, next) => {
  try {
    const { date, time, notes, pet_id } = req.body;

    const newAppointment = await createAppointment({
      date: `${date}T${time}:00.000Z`,
      notes: notes || "",
      pet_id,
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
    const { page, limit, sortBy, sortDirection, userId } = req.query;

    const data = await getAllAppointments({
      page: page || 1,
      limit: limit || 10,
      sortBy: sortBy || "date",
      sortDirection: sortDirection || "ASC",
      userId: userId || null,
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
