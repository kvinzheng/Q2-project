'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flights').del()
    .then(function () {
      // Inserts seed entries
      return knex('flights').insert([
        {
          id: 1,
          airline: 'Delta',
          departure_city: 'San Francisco',
          destination_city: 'Miami',
          departure_date: '2017/06/24',
          arrival_date: '2017/06/24',
          cost: 300.00
        },
        {
          id: 2,
          airline:  'SouthWest',
          departure_city: 'Los Angeles',
          destination_city:'New York City',
          departure_date: '2017/05/25',
          arrival_date: '2017/05/25',
          cost: 450.00
        },
        {
          id: 3,
          airline:  'American Airlines',
          departure_city: 'Sacramento',
          destination_city: 'Atlanta',
          departure_date: '2017/12/12',
          arrival_date: '2017/12/12',
          cost: 500.00
        },
        {
          id: 4,
          airline:  'Spirit',
          departure_city: 'Los Angeles',
          destination_city: 'Miami',
          departure_date: '2017/04/10',
          arrival_date: '2017/04/10',
          cost: 500.00
        },
        {
          id: 5,
          airline:  'Frontier Airlines',
          departure_city: 'New York City',
          destination_city: 'San Francisco',
          departure_date: '2017/06/10',
          arrival_date: '2017/06/10',
          cost: 650.00
        }
      ])
  })
    .then(() => {
           return knex.raw("SELECT setval('flights_id_seq', (SELECT MAX(id) FROM flights))");
       });
};
