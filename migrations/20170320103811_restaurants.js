exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.string('street_name').notNullable().defaultTo('');
    table.string('city_name').notNullable().defaultTo('');
    table.float('view_count').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
