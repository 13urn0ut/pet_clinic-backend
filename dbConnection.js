const postgres = require("postgres");

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  // ssl: process.env.DB_ssl,
});

const testConnection = async () => {
  try {
    await sql`SELECT 1 AS result`;

    console.log(`DB connected`);
  } catch (err) {
    console.log("DB connection failed");
    throw err;
  }
};

module.exports = { sql, testConnection };
