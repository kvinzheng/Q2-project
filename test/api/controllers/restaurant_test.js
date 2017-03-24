'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../../../knex');
const server = require('../../../app');

suite('restaurant routes', () => {
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
  test('GET restaurant/', (done) => {
    request(server)
      .get('/restaurant')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,[
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
      ], done)
  });
  test('GET restaurant/:id', (done) => {
    request(server)
      .get('/restaurant/3')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 3,
        name: 'Wingstop',
        street_name: '9356 Lexington Way',
        city_name: 'Atlanta',
        cost: 20.00
      }, done)
  });
});
