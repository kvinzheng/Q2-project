
exports.up = function(knex, Promise) {
  return knex.schema.createTable('flights', (table) => {
    table.increments();
    table.string('airline');
    table.string('departure_city');
    table.string('destination_city');
    table.date('departure_date');
    table.date('arrival_date');
    table.float('cost');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flights');
};
