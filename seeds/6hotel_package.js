'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hotel_package').del()
    .then(function () {
      // Inserts seed entries
      return knex('hotel_package').insert([
        {
          id: 1,
          hotel_id: 1,
          package_id: 1
        },
        {
          id: 2,
          hotel_id: 2,
          package_id: 2
        },
        {
          id: 3,
          hotel_id: 3,
          package_id:3
        },
        {
          id: 4,
          hotel_id: 4,
          package_id:4
        },
        {
          id: 5,
          hotel_id: 5,
          package_id:5
        }
      ]);
    })
    .then(() => {
           return knex.raw("SELECT setval('hotel_package_id_seq', (SELECT MAX(id) FROM hotel_package))");
       });
};
