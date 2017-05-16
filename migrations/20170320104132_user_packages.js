exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_packages', (table) => {
    table.increments();
    table.float('budget').notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_packages');
};
