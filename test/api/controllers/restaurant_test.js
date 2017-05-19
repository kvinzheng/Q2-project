'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');
const knex = require('../../../knex.js');
const app = require('../../../app.js');
const { expect } = require('chai');

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
});
