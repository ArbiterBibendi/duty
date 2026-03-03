"use strict";
const Pool = require('pg').Pool;
const pool = new Pool({
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.DATABASE,
	port: process.env.PORT
});
module.exports = pool;
