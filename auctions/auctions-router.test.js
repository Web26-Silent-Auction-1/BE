const request = require("supertest");

const server = require("../api/server.js");

describe("bids router", function() {
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
  });
});
