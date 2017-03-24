exports.up = function(knex, Promise) {
    return knex.schema.createTable("hotel_package", (table) => {
        table.increments();
        table.integer('hotel_id')
               .references('id')
               .inTable('hotels')
               .notNullable()
               .onDelete('CASCADE')
               .index();
        table.integer('package_id')
            .references('id')
            .inTable('user_packages')
            .notNullable()
            .onDelete('CASCADE')
            .index();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hotel_package');
};
