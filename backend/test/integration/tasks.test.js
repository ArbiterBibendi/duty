import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";

import db from "../../config/db.js";
import "../../app.js";

const URL = "http://localhost:3000";
const testData = [
  { title: "Task 1", description: "Test desc", due: "2026-12-24" },
  { title: "Task 2", description: "Test desc", due: "2026-12-24" },
  { title: "Task 3", description: "Test desc", due: "2026-12-24" },
];

describe("/tasks", () => {
  const endpoint = "/tasks";
  beforeEach(async () => {
    await db.query("DELETE FROM tasks");
    testData.forEach(async (data) => {
      await db.query(
        "INSERT INTO tasks (title, description, due) VALUES ($1, $2, $3);",
        [data.title, data.description, data.due],
      );
    });
  });

  describe("GET", () => {
    it("GET", async () => {
      let res = await fetch(URL + endpoint);
      let body = await res.json();
      expect(res.status).to.be.equal(200);
      expect(body).to.have.length(testData.length);
      body.forEach((data) => {
        expect(data).to.have.property("title");
        expect(data).to.have.property("description");
        expect(data).to.have.property("due");
        expect(data).to.have.property("complete");
        expect(data).to.have.property("id");
      });
    });
  });

  describe("POST", () => {
    it("POST", async () => {
      const res = await fetch(URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Task 4",
          description: "Test desc",
          due: "2026-12-24",
        }),
      });
      expect(res.status).to.equal(201);
    });
  });
});
