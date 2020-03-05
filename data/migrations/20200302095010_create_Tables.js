exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .text("username", 128)
        .notNullable()
        .unique();
      tbl.text("password", 128).notNullable();
      tbl.text("user_type", 128).notNullable();
    })
    .createTable("auctions", tbl => {
      tbl.increments();
      tbl.text("name", 128).notNullable();
      tbl.text("image", 255).notNullable();
      tbl.text("description", 255).notNullable();
      tbl
        .integer("starting_price")
        .unsigned()
        .notNullable();
      tbl.datetime("deadline").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("bids", tbl => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("auction_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("auctions")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("amount")
        .unsigned()
        .notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("bids")
    .dropTableIfExists("auctions")
    .dropTableIfExists("users");
};
