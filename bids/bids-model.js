const db = require("../data/dbConfig.js");

module.exports = {
  find,
  add,
  findBy
};

function find() {
  return db("bids")
    .join("users", "bids.user_id", "users.id")
    .join("auctions", "bids.auction_id", "auctions.id")
    .select(
      "bids.id",
      "bids.user_id",
      "users.username as bidder",
      "bids.auction_id",
      "auctions.name as auction_name",
      "bids.amount"
    );
}

function add(bid) {
  return db("bids").insert(bid);
}

function findBy(auction_id) {
  return db("bids").where({ auction_id });
}
