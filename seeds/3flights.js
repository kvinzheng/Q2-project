'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flights').del().then(function() {
    // Inserts seed entries
    return Promise.all([knex('flights').insert([
        {
          id: 1,
          airline: "Air Canada",
          cost: 297,
          destination_city: "airport: BCN, City: Barcelona",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-09-11T00:00:00",
          arrival_date: "2017-09-22T00:00:00"
        }, {
          id: 2,
          airline: "Singapore Airlines",
          cost: 310,
          destination_city: "airport: SIN, City: Singapore Changi",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-05-09T00:00:00",
          arrival_date: "2017-05-11T00:00:00"
        }, {

          id: 3,
          airline: "Singapore Airlines",
          cost: 668,
          destination_city: "airport: SIN, City: Singapore Changi",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-11-19T00:00:00",
          arrival_date: "2017-11-28T00:00:00"
        }, {
          id: 4,
          airline: "China Airlines",
          cost: 467,
          destination_city: "airport: TPE, City: Taipei Taiwan Taoyuan",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-05-18T00:00:00",
          arrival_date: "2017-06-30T00:00:00"
        }, {
          id: 5,
          airline: "China Southern",
          cost: 444,
          destination_city: "airport: SGN, City: Ho Chi Minh City",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-04-18T00:00:00",
          arrival_date: "2017-05-22T00:00:00"
        }, {
          id: 6,
          airline: "Air China",
          cost: 502,
          destination_city: "airport: MFM, City: Macau",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-04-17T00:00:00",
          arrival_date: "2017-05-03T00:00:00"
        }, {
          id: 7,
          airline: "China Southern",
          cost: 452,
          destination_city: "airport: PNH, City: Phnom Penh",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-09-07T00:00:00",
          arrival_date: "2017-09-18T00:00:00"
        }, {
          id: 8,
          airline: "China Southern",
          cost: 453,
          destination_city: "airport: RGN, City: Yangon",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-09-09T00:00:00",
          arrival_date: "2017-09-20T00:00:00"
        }, {
          id: 9,
          airline: "China Airlines",
          cost: 730,
          destination_city: "airport: ROR, City: Koror",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-05-02T00:00:00",
          arrival_date: "2017-05-10T00:00:00"
        }, {
          id: 10,
          airline: "Japan Airlines",
          cost: 318,
          destination_city: "airport: PVG, City: Shanghai Pu Dong",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-04-14T00:00:00",
          arrival_date: "2017-05-03T00:00:00"
        }, {
          id: 11,
          airline: "China Eastern",
          cost: 600,
          destination_city: "airport: MLE, City: Velana International",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-09-18T00:00:00",
          arrival_date: "2017-10-02T00:00:00"
        }, {
          id: 12,
          airline: "China Eastern",
          cost: 395,
          destination_city: "airport: ICN, City: Seoul Incheon Int'l",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-04-28T00:00:00",
          arrival_date: "2017-04-30T00:00:00"
        }
      ])])
  }).then(() => {
    return knex.raw("SELECT setval('flights_id_seq', (SELECT MAX(id) FROM flights))");
  });
};
