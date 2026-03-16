"use strict";

import express from "express";
const router = express.Router();
import db from "../config/db.js";
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks;");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const { title, description, due } = req.body;
  if (!title) {
    res.status(400).json({ error: "Missing required parameter: title" });
    return;
  }

  try {
    await db.query(
      "INSERT INTO tasks (title, description, due) VALUES ($1, $2, $3)",
      [title, description, due],
    );
    res.sendStatus(201);
    console.log("POST");
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.status(400).json({ error: "id is NaN" });
    return;
  }
  try {
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    const task = result.rows[0];
    if (!task) {
      res.status(500).json({ error: `Could not find task with id of ${id}` });
      return;
    }
    const updatedTask = { ...task, ...req.body };
    try {
      await db.query(
        "UPDATE tasks SET title = $1, description = $2, due = $3, complete = $4 WHERE id = $5",
        [
          updatedTask.title,
          updatedTask.description,
          updatedTask.due,
          updatedTask.complete,
          updatedTask.id,
        ],
      );
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.status(400).json({ error: "id is NaN" });
  }
  try {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
export default router;
