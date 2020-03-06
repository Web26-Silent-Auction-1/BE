const request = require("supertest");

const server = require("../api/server.js");

let token;

beforeAll(done => {
  request(server)
    .post("/api/auth/login")
    .send({ username: "new user", password: "password" })
    .then(res => {
      token = res.body.token;
      done();
    });
});

describe("bids router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /", function() {
    it("should return a 400 error", function() {
      return request(server)
        .get("/api/bids")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it("should return 200 OK", function() {
      return request(server)
        .get("/api/bids")
        .set("Authorization", token)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("POST /:id", function() {
    it("should return a 400 error", function() {
      return request(server)
        .post("/api/bids")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    // it("should return a 404 error", function() {
    //   return request(server)
    //     .post("/api/bids/200")
    //     .set("Authorization", token)
    //     .send({ amount: 500 })
    //     .then(res => {
    //       expect(res.status).toBe(404);
    //     });
    // });
  });
});
