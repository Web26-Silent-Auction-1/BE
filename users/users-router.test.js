const request = require("supertest");

const server = require("../api/server.js");

describe("users router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/api/users")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
