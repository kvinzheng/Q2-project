'user strict'
process.env.NODE_ENV = 'test';

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
describe('package routes', () => {

  it('GET /users/{id}/package', (done) => {
    request(app)
      .get('/users/1000/packages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(404, JSON.stringify({code:404, message: "please enter valid information"}, done));
    });
})
