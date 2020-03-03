const request = require("supertest");

const server = require("../api/server.js");

describe("auth router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("/login", function() {
    it("should return a 400 error", function() {
      return request(server)
        .post("/api/auth/login")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it("should return a 401 error", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "notauser", password: "notapassword" })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("should return a 200 OK", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "newuser", password: "newpass" })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("/register", function() {
    it("should return a 400 error", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "testuser", password: "testpass" })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it("should return 201 Created", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "newuser2",
          password: "newpass",
          user_type: "seller"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
});
