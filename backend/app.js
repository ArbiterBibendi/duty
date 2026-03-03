"use strict";
const express = require('express');
require('dotenv').config( {path: './config/.env'} );

const tasks = require('./routes/tasks.js');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
	res.send("Monday");
});

app.use('/tasks', tasks); 

app.listen(PORT, (error) => {
	if (error) throw error;
	console.log("Express server running!");
});
