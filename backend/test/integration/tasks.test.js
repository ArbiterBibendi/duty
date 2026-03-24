import { expect, config } from "chai";
import { describe, it, beforeEach } from "mocha";

import db from "../../config/db.js";
import "../../app.js";

const URL = "http://localhost:3000";
const testData = [
  { title: "Task 1", description: "Test desc" },
  { title: "Task 2", description: "Test desc" },
  { title: "Task 3", description: "Test desc" },
];
config.truncateThreshold = 0;

describe("/tasks", () => {
  const getAllTasks = async () => {
    const data = await db.query("SELECT * FROM tasks;");
    return data.rows;
  };
  const getFirstTask = async () => {
    const tasks = await getAllTasks();
    return tasks[0];
  };
  const endpoint = "/tasks";
  beforeEach(async () => {
    await db.query("DELETE FROM tasks;");
    await Promise.all(
      testData.map(async (data) => {
        await db.query(
          "INSERT INTO tasks (title, description, due) VALUES ($1, $2, $3);",
          [data.title, data.description, data.due],
        );
      }),
    );
  });

  describe("GET", () => {
    it("gets all tasks", async () => {
      const res = await fetch(URL + endpoint);
      const body = await res.json();
      expect(res.status).to.be.equal(200);
      expect(body).to.have.length(testData.length);
      body.forEach((data) => {
        expect(data).to.have.keys([
          "title",
          "description",
          "due",
          "complete",
          "created",
          "id",
        ]);
      });
      expect(body).to.containSubset(testData);
    });
  });

  describe("POST", () => {
    it("db contains post data afterward", async () => {
      const testPostData = {
        title: "Task 4",
        description: "Test desc",
      };
      const res = await fetch(URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testPostData),
      });
      const tasks = await getAllTasks();
      expect(res.status).to.equal(201);
      expect(tasks).to.containSubset([testPostData]);
    });
  });

  describe("PATCH", () => {
    const patchedTitle = "Patched task";
    it("updates given task", async () => {
      const taskToPatch = await getFirstTask();
      const res = await fetch(URL + endpoint + `/${taskToPatch.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: patchedTitle, complete: true }),
      });
      const tasks = await getAllTasks();
      const patchedTask = tasks.find((task) => task.id == taskToPatch.id);
      expect(res.status).to.equal(200);
      expect(patchedTask.title).to.equal(patchedTitle);
      expect(patchedTask.complete).to.be.true;
    });
  });

  describe("DELETE", () => {
    it("deletes given task", async () => {
      const taskToDelete = await getFirstTask();
      const res = await fetch(URL + endpoint + `/${taskToDelete.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const tasks = await getAllTasks();
      expect(res.status).to.equal(200);
      expect(tasks).to.not.containSubset([taskToDelete]);
    });
  });
});
