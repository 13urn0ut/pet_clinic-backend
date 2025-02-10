// const e = require("express");
const { sql } = require("../dbConnection");

exports.createAppointment = async (appointment) => {
  const [newAppointment] = await sql`
  INSERT INTO appointments 
  ${sql(appointment, "date", "notes", "pet_id", "confirmed")}
  RETURNING *
  `;

  return newAppointment;
};

exports.getAllAppointments = async (filter) => {
  const { page, limit, sortBy, sortDirection, userId } = filter;

  const data = await sql.begin(async () => {
    const appointments = await sql`
    SELECT appointments.*, pets.name AS pet_name, users.first_name, users.last_name
    FROM appointments
    JOIN pets
    ON pets.id = appointments.pet_id
    JOIN users
    ON pets.user_id = users.id
    ${userId ? sql`WHERE users.id = ${userId}` : sql``}
    ORDER BY ${sql.unsafe(sortBy)} ${sql.unsafe(sortDirection)}
    LIMIT ${sql`${limit}`}
    OFFSET ${sql`${(page - 1) * limit}`}
    `;

    const [{ count }] = await sql`
    SELECT COUNT(appointments.id)
    FROM appointments
    JOIN pets
    ON pets.id = appointments.pet_id
    JOIN users
    ON pets.user_id = users.id
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
  JOIN pets
  ON pets.id = appointments.pet_id
  JOIN users
  ON pets.user_id = users.id
  ${userId ? sql`WHERE users.id = ${userId}` : sql``}`;

  return count;
};

exports.getAppointmentById = async (id) => {
  const [appointment] = await sql`
  SELECT appointments.*, users.id AS user_id
  FROM appointments
  JOIN pets
  ON pets.id = appointments.pet_id
  JOIN users
  ON pets.user_id = users.id
  WHERE appointments.id = ${id}
  `;

  return appointment;
};

exports.updateAppointment = async (id, appointment) => {
  const [columns] = Object.keys(appointment).filter(
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
