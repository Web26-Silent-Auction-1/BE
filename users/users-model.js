const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy
};

function find() {
  return db("users");
}

function add(user) {
  return db("users").insert(user);
}

function findBy(filter) {
  return db("users").where(filter);
}
