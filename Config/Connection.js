require("dotenv").config(); // Load environment variables
const mysql = require("mysql2/promise"); // Import mysql2 with promise support

const connection = mysql.createPool({
  host: process.env.DB_HOST,      // ✅ Use Clever Cloud MySQL host
  user: process.env.DB_USER,      // ✅ MySQL username
  password: process.env.DB_PASSWORD,  // ✅ MySQL password
  database: process.env.DB_NAME,  // ✅ Database name
  port: process.env.DB_PORT,      // ✅ MySQL port (3306)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.getConnection()
  .then(() => console.log("✅ Connected to Clever Cloud MySQL Database!"))
  .catch(err => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1); // Stop execution if DB fails
  });

module.exports = connection;
