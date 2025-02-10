require("dotenv").config();
const server = require("./app");
const { testConnection, sql } = require("./dbConnection");

const port = process.env.PORT;

(async () => {
  try {
    await testConnection();

    server.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }

  process.on("SIGINT", () => {
    sql.end();
    process.exit(0);
  });
})();
