'use strict';

process.env.NODE_ENV = 'test';
// const { suite, test } = require('mocha');
const {describe,it} = require('mocha');
const request = require('supertest');
const knex = require('../../../knex.js');
const app = require('../../../app.js');
const expect = require('chai').expect;

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
  it('GET /flight with a specific of flights', (done) => {
    request(app)
      .get('/flight/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal({
          id: 2,
          airline: "Singapore Airlines",
          cost: 310,
          destination_city: "airport: SIN, City: Singapore Changi",
          departure_city: "airport: SFO, City: San Francisco International",
          departure_date: "2017-05-09T00:00:00",
          arrival_date: "2017-05-11T00:00:00"
        })
        done();
      });
  });
});
