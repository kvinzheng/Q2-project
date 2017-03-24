
exports.up = function(knex, Promise) {
  return knex.schema.createTable('hotels', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.string('city_name').notNullable().defaultTo('');
    table.string('street_name').notNullable().defaultTo('');
    table.float('cost').notNullable();
    table.string('date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hotels');
};
