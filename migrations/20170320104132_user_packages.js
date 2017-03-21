
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_package', (table) => {
    table.increments();
    table.float('budget');
    table.integer('flight_id')
           .references('id')
           .inTable('flights')
           .notNullable()
           .onDelete('CASCADE')
           .index();
    table.integer('restaurant_id')
            .references('id')
            .inTable('restaurants')
            .notNullable()
            .onDelete('CASCADE')
            .index();
    table.integer('hotel_id')
            .references('id')
            .inTable('hotels')
            .notNullable()
            .onDelete('CASCADE')
            .index();
    table.integer('user_id')
            .references('id')
            .inTable('users')
            .notNullable()
            .onDelete('CASCADE')
            .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_package');
};
