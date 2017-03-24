'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {
          id: 1,
          name: 'McDonalds',
          street_name: '3828 McDonald Way',
          city_name: 'Miami',
          cost: 5.00
        },
        {
          id: 2,
          name: 'Red Lobster',
          street_name: '9356 Lexington Way',
          city_name: 'New York City',
          cost: 50.00
        },
        {
          id: 3,
          name: 'Wingstop',
          street_name: '9356 Lexington Way',
          city_name: 'Atlanta',
          cost: 20.00
        },
        {
          id: 4,
          name: 'Red Lobster',
          street_name: '26 Redford Ln',
          city_name: 'Miami',
          cost: 100.00
        },
        {
          id: 5,
          name: 'Oasis',
          street_name: '2nd St',
          city_name:  'San Francisco',
          cost: 20.00
        }
      ]);
    })
    .then(() => {
           return knex.raw("SELECT setval('restaurants_id_seq', (SELECT MAX(id) FROM restaurants))");
       });
};
