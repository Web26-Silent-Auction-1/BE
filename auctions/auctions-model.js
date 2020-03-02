const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("auctions")
    .join("users", "auctions.user_id", "users.id")
    // .join("bids", "auctions.id", "bids.auction_id")
    .select(
      "auctions.id",
      "auctions.name",
      "users.username as seller",
      "auctions.image",
      "auctions.description",
      "auctions.starting_price",
      "auctions.deadline",
    //   "bids.amount"
    );
}

function findById(id) {
  return db("auctions")
    .where({ id })
    .first();
}

function add(body) {
  return db("auctions").insert(body, "id");
}

function update(id, changes) {
  return db("auctions")
    .where({ id })
    .update(changes, "*");
}

function remove(id) {
  return db("auctions")
    .where({ id })
    .del();
}
