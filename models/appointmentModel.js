// const e = require("express");
const { sql } = require("../dbConnection");

exports.createAppointment = async (appointment) => {
  const [newAppointment] = await sql`
  INSERT INTO appointments 
  ${sql(appointment, "date", "notes", "pet_name", "confirmed", "user_id")}
  RETURNING *
  `;

  return newAppointment;
};

exports.getAllAppointments = async (filter) => {
  const { page, limit, sortBy, sortDirection, userId } = filter;

  const data = await sql.begin(async () => {
    const appointments = await sql`
    SELECT appointments.*, users.first_name, users.last_name
    FROM appointments
    JOIN users
    ON appointments.user_id = users.id
    ${userId ? sql`WHERE users.id = ${userId}` : sql``}
    ORDER BY ${sql.unsafe(sortBy)} ${sql.unsafe(sortDirection)}
    LIMIT ${sql`${limit}`}
    OFFSET ${sql`${(page - 1) * limit}`}
    `;

    const [{ count }] = await sql`
    SELECT COUNT(appointments.id)
    FROM appointments
    JOIN users
    ON appointments.user_id = users.id
    ${userId ? sql`WHERE users.id = ${userId}` : sql``}
    `;

    return { appointments, count };
  });

  return data;
};

exports.getAppointmentCount = async (userId) => {
  const [count] = await sql`
  SELECT COUNT(appointments.id)
  FROM appointments
  JOIN users
  ON appointments.user_id = users.id
  ${userId ? sql`WHERE users.id = ${userId}` : sql``}`;

  return count;
};

exports.getAppointmentById = async (id) => {
  const [appointment] = await sql`
  SELECT appointments.*
  FROM appointments
  WHERE appointments.id = ${id}
  `;

  return appointment;
};

exports.updateAppointment = async (id, appointment) => {
  const columns = Object.keys(appointment).filter(
    (key) => appointment[key] !== undefined
  );

  const [updatedAppointment] = await sql`
  UPDATE appointments 
  SET ${sql(appointment, columns)}
  WHERE id = ${id}
  RETURNING *
  `;

  return updatedAppointment;
};

exports.deleteAppointment = async (id) => {
  const [deletedAppointment] = await sql`
  DELETE FROM appointments
  WHERE id = ${id}
  RETURNING *
  `;

  return deletedAppointment;
};
