
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments();
    table.string('name');
    table.string('street_name');
    table.string('city_name');
    table.float('cost');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
