'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flight_package').del().then(function() {
    // Inserts seed entries
    return Promise.all([knex('flight_package').insert([
        {
          id: 1,
          flight_id: 1,
          package_id: 1
        }, {
          id: 2,
          flight_id: 2,
          package_id: 2
        }, {
          id: 3,
          flight_id: 3,
          package_id: 3
        }, {
          id: 4,
          flight_id: 4,
          package_id: 4
        }, {
          id: 5,
          flight_id: 5,
          package_id: 5
        }
      ])])
  }).then(() => {
    return knex.raw("SELECT setval('flight_package_id_seq', (SELECT MAX(id) FROM flight_package))");
  });
};
