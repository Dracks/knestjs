
exports.up = (knex) => knex.schema.createTable("user", (table) => {
    table.increments("id");
    table.string("user", 255).notNullable();
});

exports.down = (knex) => knex.schema.dropTable("user");
