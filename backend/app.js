"use strict";
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
	res.send("Monday");
});

app.listen(PORT, (error) => {
	if (error) throw error;
	console.log("Express server running!");
});
