"use strict";
import express from "express";
import tasks from "./routes/tasks.js";
import path from "node:path";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", tasks);
app.use(express.static(path.resolve("../frontend")));
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log("Express server running!");
});

export default app;
