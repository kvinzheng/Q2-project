exports.up = function(knex, Promise) {
  return knex.schema.createTable("restaurant_package", (table) => {
    table.increments();
    table.integer('restaurant_id').references('id').inTable('restaurants').notNullable().onDelete('CASCADE').index();
    table.integer('package_id').references('id').inTable('user_packages').notNullable().onDelete('CASCADE').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurant_package');
};
