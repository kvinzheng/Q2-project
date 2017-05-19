'use strict';

process.env.NODE_ENV = 'test';

// const { suite, test } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');
const knex = require('../../../knex');
const server = require('../../../app');

describe('hotels routes', () => {
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

  it('GET /hotel', (done) => {
    request(server)
      .get('/hotel')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: 1,
          name: 'Hayes Valley Inn',
          city_name: 'San Francisco',
          street_name: '417 Gough St',
          cost: 300.00,
          date: '2017/06/24'
        }, {
          id: 2,
          name: 'Omni San Francisco Hotel',
          city_name: 'San Francisco',
          street_name: '319 Divisadero St',
          cost: 150.00,
          date: '2017/05/25'
        }, {
          id: 3,
          name: 'Gucci Mane Hotel',
          city_name: 'San Francisco',
          street_name: '500 California St',
          cost: 150.00,
          date: '2017/12/12'
        }, {
          id: 4,
          name: 'Chateau Tivoli Bed & Breakfast Inn',
          city_name: 'San Francisco',
          street_name: '1057 Steiner St',
          cost: 400.00,
          date: '2017/04/10'
        }, {
          id: 5,
          name: 'Hotel Abri',
          city_name: 'San Francisco',
          street_name: '127 Ellis Street',
          cost: 200.00,
          date: '2017/06/10'
        }, {
          id: 6,
          name: 'The Metro Hotel',
          city_name: 'San Francisco',
          street_name: '319 Divisadero St',
          cost: 200.00,
          date: '2017/06/10'
        }, {
          id: 7,
          name: 'The Inn San Francisco',
          city_name: 'San Francisco',
          street_name: '943 S Van Ness Ave',
          cost: 200.00,
          date: '2017/06/10'
        }, {
          id: 8,
          name: 'Hayes Valley Inn',
          city_name: 'San Francisco',
          street_name: '417 Gough St',
          cost: 200.00,
          date: '2017/06/10'
        }
     ], done)
  });
  it('GET /hotel/:id', (done) => {
    request(server)
      .get('/hotel/2')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,{
        id: 2,
        name: 'Omni San Francisco Hotel',
        city_name: 'San Francisco',
        street_name: '319 Divisadero St',
        cost: 150.00,
        date: '2017/05/25'
      }, done)
  });
});
