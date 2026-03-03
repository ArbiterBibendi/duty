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

router.post('/', (req, res) => {
	const {title, description, due} = req.body;
	if (!title) {
		res.status(400).json({ error: "Missing required parameter: title" });
		return;
	}
	db.query('INSERT INTO tasks (title, description, due) VALUES ($1, $2, $3)',
		[title, description, due]).then((result => {
			res.sendStatus(201);
			console.log("POST");
		})).catch((error) => {
			res.sendStatus(500);
			console.log(error);
		});
});

router.patch('/', (req, res) => {
	const { id } = req.body;
	if (isNaN(id)) {
		res.status(400).json( { error: "id is NaN" });
		return;
	}
	db.query('SELECT * FROM tasks WHERE id = $1', [id]).then((result) => {
		const task = result.rows[0];
		if (!task) {
			res.status(500).json({ error: `Could not find task with id of ${id}` });
			return;
		}
		const updatedTask = {...task, ...req.body};
		db.query('UPDATE tasks SET title = $1, description = $2, due = $3, complete = $4 WHERE id = $5',
		[updatedTask.title, updatedTask.description, updatedTask.due, updatedTask.complete, updatedTask.id])
			.then((result) => {
				res.sendStatus(200);
			})
			.catch((error) => {
				res.sendStatus(500);
			});
	}).catch((error) => {
		res.status(500).json({ error: `Something went wrong with id of ${id}` });
	});
});

module.exports = router;
