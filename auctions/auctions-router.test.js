const request = require("supertest");

const server = require("../api/server.js");

let token;

beforeAll(done => {
  request(server)
    .post("/api/auth/login")
    .send({ username: "new user6", password: "password" })
    .then(res => {
      token = res.body.token;
      done();
    });
});

describe("auctions router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /", function() {
    it("should return a 400 error", function() {
      return request(server)
        .get("/api/auctions")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it("should return a 200 OK", function() {
      return request(server)
        .get("/api/auctions")
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("POST /", function() {
    it("should return a 201 created", function() {
      return request(server)
        .post("/api/auctions")
        .set("Authorization", token)
        .send({
          name: "test",
          image: "test",
          description: "test",
          starting_price: 100,
          deadline: "test"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("should return a 400 error", function() {
      return request(server)
        .post("/api/auctions")
        .send({
          name: "test",
          image: "test",
          description: "test",
          starting_price: 100,
          deadline: "test"
        })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });
});
