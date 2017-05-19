'user strict'
process.env.NODE_ENV = 'test';
// const { expect } = require('mocha');
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

  // it('GET /users/{id}/package', (done) => {
  //   request(app)
  //     .get('/users/3/packages')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /application\/json/)
  //     .expect(200, done)
      // .expect([{
      //   package_id: 3,
      //   user_id: 3,
      //   airline: 'Singapore Airlines',
      //   flight_id: 3,
      //   flight_cost: 668,
      //   restaurant_name: 'Saigon Sandwich',
      //   restaurant_id: 3,
      //   restaurants_review: 2789,
      //   hotels_name: 'Gucci Mane Hotel',
      //   hotels_id: 3,
      //   hotels_cost: 150
      // }], done)
  // })


  it('GET /users/{id}/package', (done) => {
    request(app)
      .get('/users/1000/packages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(404, JSON.stringify({code:404, message: "please enter valid information"}, done));
    });
  // it('GET /users/{id}/package{id}', (done) => {
  //     request(app)
  //         .get('/users/2/packages/2')
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /application\/json/)
  //         .expect(200)
  //         .expect({
  //           package_id: 2,
  //           user_id: 2,
  //           airline: 'SouthWest',
  //           flight_id: 2,
  //           flight_cost: 450,
  //           restaurant_name: 'Red Lobster',
  //           restaurant_id: 2,
  //           restaurants_cost: 50,
  //           hotels_name: 'Holiday Inn',
  //           hotels_id: 2,
  //           hotels_cost: 150 }, done)
  // })
})
