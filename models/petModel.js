const { sql } = require("../dbConnection");

exports.registerPet = async (pet) => {
  const [newPet] = await sql`
  INSERT INTO pets 
  ${sql(pet, "name", "user_id")}
  RETURNING *
  `;

  return newPet;
};
