const { sql } = require("../dbConnection");

exports.createUser = async (user) => {
  const [newUser] = await sql`
  INSERT INTO users 
  ${sql(user, "first_name", "last_name", "email", "password", "role")}
  RETURNING *
  `;

  return newUser;
};

exports.getUserById = async (id) => {
  const [user] = await sql`
    SELECT *
    FROM users
    WHERE id = ${id}
  `;

  return user;
};

exports.getUserByEmail = async (email) => {
  const [user] = await sql`
    SELECT *
    FROM users
    WHERE email = ${email}
  `;

  return user;
};
