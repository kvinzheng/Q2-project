'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../../../knex');
const server = require('../../../app');

suite('flight routes', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('GET /flight', (done) => {
    request(server)
      .get('/flight')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        airline: 'Delta',
        departure_city: 'San Francisco',
        destination_city: 'Miami',
        departure_date: '2017/06/24',
        arrival_date: '2017/06/24',
        cost: 300.00
      }],done)
      // .end((httpErr, _res) => {
      //   if (httpErr) {
      //     return done(httpErr);
      //   }
      //
      //   knex('flights')
      //     .where('id', 1)
      //     .first()
      //     .then((user) => {
      //       assert.deepEqual(user, {
      //         id: 1,
      //         airline: 'Delta',
      //         departure_city: 'San Francisco',
      //         destination_city: 'Miami',
      //         departure_date: '2017/06/24',
      //         arrival_date: '2017/06/24',
      //         cost: 300.00
      //       });
      //
      //       // eslint-disable-next-line no-sync
      //       done();
      //     })
      //     .catch((dbErr) => {
      //       done(dbErr);
      //     });
      // });
  });
});
