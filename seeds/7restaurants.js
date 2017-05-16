'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants').del().then(function() {
    // Inserts seed entries
    return Promise.all([knex('restaurants').insert([
        {
          id: 1,
          name: 'San Tung',
          city_name: 'San Francisco',
          street_name: '1031 Irving St',
          view_count: 5409
        }, {
          id: 2,
          name: 'El Farolito',
          city_name: 'San Francisco',
          street_name: '2779 Mission St',
          view_count: 4003
        }, {
          id: 3,
          name: 'Saigon Sandwich',
          city_name: 'San Francisco',
          street_name: '560 Larkin St',
          view_count: 2789
        }, {
          id: 4,
          name: 'The Codmother Fish and Chips',
          city_name: 'San Francisco',
          street_name: '496 Beach St',
          view_count: 2096
        }, {
          id: 5,
          name: 'HRD',
          city_name: 'San Francisco',
          street_name: '521A 3rd St',
          view_count: 2021
        }, {
          id: 6,
          name: 'Hot Sauce and Panko',
          city_name: 'San Francisco',
          street_name: '1468 Hyde St',
          view_count: 808
        }, {
          id: 7,
          name: 'Dinosaurs',
          city_name: 'San Francisco',
          street_name: '2275 Market St',
          view_count: 744
        }, {
          id: 8,
          name: 'Home',
          city_name: 'San Francisco',
          street_name: '1222 Noriega St',
          view_count: 535
        }, {
          id: 9,
          name: 'Tacorea',
          city_name: 'San Francisco',
          street_name: '809 Bush St',
          view_count: 465
        }, {
          id: 10,
          name: 'Box Kitchen',
          city_name: 'San Francisco',
          street_name: '431 Natoma St',
          view_count: 452
        }, {
          id: 11,
          name: 'The Bird',
          city_name: 'San Francisco',
          street_name: '115 New Montgomery St',
          view_count: 273
        }, {
          id: 12,
          name: 'Rooster & Rice',
          city_name: 'San Francisco',
          street_name: '2211 Filbert St',
          view_count: 226
        }, {
          id: 13,
          name: 'Mac Daddy',
          city_name: 'San Francisco',
          street_name: '1453 18th St',
          view_count: 191
        }, {
          id: 14,
          name: 'Tselogs',
          city_name: 'San Francisco',
          street_name: '552 Jones St',
          view_count: 158
        }, {
          id: 15,
          name: 'Surisan',
          city_name: 'San Francisco',
          street_name: '505 Beach St',
          view_count: 144
        }, {
          id: 16,
          name: 'Poké Bar',
          city_name: 'San Francisco',
          street_name: '1355 Market St',
          view_count: 110
        }, {
          id: 17,
          name: 'FOB Kitchen',
          city_name: 'San Francisco',
          street_name: '2351 Mission St',
          view_count: 80
        }, {
          id: 18,
          name: 'DragonEats',
          city_name: 'San Francisco',
          street_name: '1671 Haight St',
          view_count: 77
        }, {
          id: 19,
          name: 'Milkbean',
          city_name: 'San Francisco',
          street_name: '881 Post St',
          view_count: 62
        }, {
          id: 20,
          name: 'Marufuku Ramen',
          city_name: 'San Francisco',
          street_name: '1581 Webster St',
          view_count: 56
        }
      ])])
  }).then(() => {
    return knex.raw("SELECT setval('restaurants_id_seq', (SELECT MAX(id) FROM restaurants))");
  });
};
