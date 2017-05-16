'use strict';

process.env.NODE_ENV = 'test';
// const { suite, test } = require('mocha');
const {describe,it} = require('mocha');
const request = require('supertest');
const knex = require('../../../knex.js');
const app = require('../../../app.js');
const expect = require('chai').expect;

beforeEach((done) => {
  knex.migrate.rollback()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    })
})
beforeEach((done) => {
  knex.migrate.latest()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    })
})
beforeEach((done) => {
  knex.seed.run()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
})

describe('restaurant routes', () => {
  it('GET restaurant/', (done) => {
    request(app)
      .get('/restaurant')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
       .expect(404, JSON.stringify({code:404, message: "please enter valid information"}, done));
  });
  // test('GET restaurant/:id', (done) => {
  //   request(server)
  //     .get('/restaurant/3')
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200, {
  //       id: 3,
  //       name: "Gucci Mane Hotel",
  //       street_name: "San Francisco",
  //       city_name: "500 California St",
  //       cost: 150,
  //       date: "2017/12/12"
  //     }, done)
  // });
});
