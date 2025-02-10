const { sql } = require("../dbConnection");

exports.registerPet = async (pet) => {
  const [newPet] = await sql`
  INSERT INTO pets 
  ${sql(pet, "name", "user_id")}
  RETURNING *
  `;

  return newPet;
};

exports.getPetById = async (id) => {
  const [pet] = await sql`
  SELECT *
  FROM pets
  WHERE id = ${id}
  `;

  return pet;
};
