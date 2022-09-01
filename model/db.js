const Postgre = require("pg").Pool;
const { Client } = require("pg");
require('dotenv').config();

let conn;
if (process.env.ENV_MODE === "prod") {
	conn = new Client({
    connectionString: process.env.DB_URI,
    ssl: {
      rejectUnauthorized: process.env.FALSE_FOR_DEPLOY,
    },
  });
} else {
	conn = new Postgre({
		user: process.env.DB_USER, 
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		password: process.env.DB_PASS,
		port: process.env.DB_PORT,
		ssl: {
		  rejectUnauthorized: process.env.FALSE_FOR_DEPLOY,
		},
	});
}
module.exports = conn;