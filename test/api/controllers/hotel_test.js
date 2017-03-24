'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../../../knex');
const server = require('../../../app');

suite('hotels routes', () => {
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

  test('GET /hotel', (done) => {
    request(server)
      .get('/hotel')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
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
      ], done)
  });
  test('GET /hotel/:id', (done) => {
    request(server)
      .get('/hotel/2')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,{
        id: 2,
        name: 'Holiday Inn',
        city_name: 'New York City',
        street_name: '3800 Main St',
        cost: 150.00,
        date: '2017/05/25'
      }, done)
  });
});
