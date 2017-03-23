'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant_package').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurant_package').insert([
        {
          id: 1,
          restaurant_id: 1,
          package_id: 1
        },
        {
          id: 2,
          restaurant_id: 2,
          package_id: 2
        },
        {
          id: 3,
          restaurant_id: 3,
          package_id: 3
        },
        {
          id: 4,
          restaurant_id: 4,
          package_id: 4
        },
        {
          id: 5,
          restaurant_id: 5,
          package_id: 5
        }
      ]);
    })
    .then(() => {
           return knex.raw("SELECT setval('restaurant_package_id_seq', (SELECT MAX(id) FROM restaurant_package))");
       });
};
