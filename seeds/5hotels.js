'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hotels').del()
    .then(function () {
      // Inserts seed entries
      return knex('hotels').insert([
        {
          id: 1,
          name: 'Trump Tower',
          city_name: 'Miami',
          street_name: '38 Ivanka Ave',
          cost: 300.00,
          date: '2017/06/24'
        },
        {
          id: 2,
          name: 'Holiday Inn',
          city_name: 'New York City',
          street_name: '3800 Main St',
          cost: 150.00,
          date: '2017/05/25'
        },
        {
          id: 3,
          name: 'Gucci Mane Hotel',
          city_name:  'Atlanta',
          street_name: '3242 Trill Vill',
          cost: 150.00,
          date: '2017/12/12'
        },
          {
            id: 4,
            name: 'Trump Tower',
            city_name: 'Miami',
            street_name: '38 Ivanka Ave',
            cost: 400.00,
            date: '2017/04/10'
          },
          {
            id: 5,
            name: 'Galvanize Hotel',
            city_name: 'San Francisco',
            street_name: '44 Tehama St',
            cost: 200.00,
            date: '2017/06/10'
          }
      ]);
    })
    .then(() => {
           return knex.raw("SELECT setval('hotels_id_seq', (SELECT MAX(id) FROM hotels))");
       });
};
