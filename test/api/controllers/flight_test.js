'use strict';

process.env.NODE_ENV = 'test';
const request = require('supertest');
const knex = require('../../../knex.js');
const app = require('../../../app.js');
const { expect } = require('chai');

before((done) => {
  knex.migrate.rollback()
  .then(() => {
    done();
  })
  .catch((err) => {
    done(err);
  });
});
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

describe('flight routes', () => {
  it("GET /flight with a specific of flights should respond with 404 if user enters incorrect parameter", (done) => {
    request(app)
      .get('/flight/3000')
      .set('Accept', 'application/json')
      .expect(404, JSON.stringify({
        code: 404,
        message: "please enter valid information"
      }, done));
  });
});
