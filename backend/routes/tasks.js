"use strict";

const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
router.get('/', (req, res) => {
	db.query('SELECT * FROM tasks;').then((result) => {
		res.json(result.rows);
	}).catch((error) => {
		console.error(error);
	});
});

module.exports = router;
