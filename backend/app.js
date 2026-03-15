"use strict";
import 'dotenv/config.js';

import express from 'express';
import tasks from './routes/tasks.js';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/tasks', tasks); 
app.get('/', (req, res) => {
	res.send("Monday");
});


app.listen(PORT, (error) => {
	if (error) throw error;
	console.log("Express server running!");
});
