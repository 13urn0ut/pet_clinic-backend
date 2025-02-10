const { sql } = require("../dbConnection");

exports.createAppointment = async (appointment) => {
  const [newAppointment] = await sql`
  INSERT INTO appointments 
  ${sql(appointment, "date", "notes", "pet_id", "confirmed")}
  RETURNING *
  `;

  return newAppointment;
};
