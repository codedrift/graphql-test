import request from "supertest";
import { app } from "./app";

describe("GET /health", () => {
  it("responds with json", () =>
    request(app)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200, { healthy: true }));
});

describe("GET /users", () => {
  it("responds with json", () =>
    request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200, {
        data: [
          {
            name: "fuglu",
            cool: true
          },
          {
            name: "codedrift",
            cool: true
          },
          {
            name: "nightillusions",
            cool: true
          }
        ]
      }));
});
