exports.up = function(knex, Promise) {
  return knex.schema.createTable("flight_package", (table) => {
    table.increments();
    table.integer('flight_id').references('id').inTable('flights').notNullable().onDelete('CASCADE').index();
    table.integer('package_id').references('id').inTable('user_packages').notNullable().onDelete('CASCADE').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flight_package');
};
