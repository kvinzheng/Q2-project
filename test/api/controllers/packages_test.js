'user strict'
process.env.NODE_ENV = 'test';
const {
    describe,
    it
} = require('mocha');
const request = require('supertest');
const knex = require('../../../knex.js');
const app = require('../../../app.js');
const expect = require('chai').expect;

describe('package routes', () => {
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

    it('GET /users/{id}/package', (done) => {
        request(app)
            .get('/users/2/packages')
            .set('Accept', 'application/json')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .expect([{
              package_id: 2,
              user_id: 2,
              airline: 'SouthWest',
              flight_id: 2,
              flight_cost: 450,
              restaurant_name: 'Red Lobster',
              restaurant_id: 2,
              restaurants_cost: 50,
              hotels_name: 'Holiday Inn',
              hotels_id: 2,
              hotels_cost: 150 }], done)
    })

    it('GET /users/{id}/package{id}', (done) => {
        request(app)
            .get('/users/2/packages/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .expect({
              package_id: 2,
              user_id: 2,
              airline: 'SouthWest',
              flight_id: 2,
              flight_cost: 450,
              restaurant_name: 'Red Lobster',
              restaurant_id: 2,
              restaurants_cost: 50,
              hotels_name: 'Holiday Inn',
              hotels_id: 2,
              hotels_cost: 150 }, done)
    })
})
