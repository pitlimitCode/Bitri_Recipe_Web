const Postgre = require("pg").Pool;
const { Client } = require("pg");
require('dotenv').config();

let conn;
if (process.env.ENV_MODE === "prod") {
	conn = new Client({
    connectionString: process.env.DB_URI,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  });
} else {
	conn = new Postgre({
		user: process.env.DB_USER, 
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		password: process.env.DB_PASS,
		port: process.env.DB_PORT,
		// ssl: {
		//   rejectUnauthorized: false,
		// },
	});
}
module.exports = conn;