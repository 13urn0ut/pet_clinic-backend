const { sql } = require("../dbConnection");

exports.getAll = async () => {
  const results = await sql`
  SELECT *
  FROM users
  `;

  return results;
};

exports.registerPet = async (pet) => {
  const [newPet] = await sql`
  INSERT INTO pets 
  ${sql(pet, "name", "user_id")}
  RETURNING *
  `;

  return newPet;
};
