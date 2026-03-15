"use strict";
import {Pool} from 'pg';
const pool = new Pool({
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.DATABASE,
	port: process.env.PORT
});
export default pool;
