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
  const user = await sql.begin(async () => {
    const [user] = await sql`
    SELECT *
    FROM users
    WHERE id = ${id}
  `;

    if (!user) return;

    user.pets = await sql`
    SELECT pets.id, pets.name
    FROM pets
    WHERE pets.user_id = ${user?.id}
  `;

    return user;
  });

  return user;
};

exports.getUserByEmail = async (email) => {
  const user = await sql.begin(async () => {
    const [user] = await sql`
    SELECT *
    FROM users
    WHERE email = ${email}
  `;

    if (!user) return;

    user.pets = await sql`
    SELECT pets.id, pets.name
    FROM pets
    WHERE pets.user_id = ${user?.id}
  `;

    return user;
  });

  return user;
};
