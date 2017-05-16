exports.up = function(knex, Promise) {
  return knex.schema.createTable('flights', (table) => {
    table.increments();
    table.string('airline').notNullable().defaultTo('');
    table.string('departure_city').notNullable().defaultTo('');
    table.string('destination_city').notNullable().defaultTo('');
    table.string('departure_date').notNullable();
    table.string('arrival_date').notNullable();
    table.float('cost').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flights');
};
