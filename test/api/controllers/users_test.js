'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../../../knex');
const server = require('../../../app');

suite('users routes', () => {
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

  test('GET /users', (done) => {
    request(server)
      .get('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,[
        {
          id: 1,
          username: 'kDaddy',
          first_name: 'Kevin',
          last_name: 'Zheng'
        },
        {
          id: 2,
          username: 'MoSho',
          first_name: 'Muhammad',
          last_name:  'Shoman'
        },
        {
          id: 3,
          username: 'Makavelli',
          first_name: 'Tupac',
          last_name:  'Shakur'
        },
        {
          id: 4,
          username: 'BigBoi',
          first_name: 'Big',
          last_name:  'Boy'
        },
        {
          id: 5,
          username: 'MartyTheeMartian',
          first_name: 'Marty',
          last_name:  'Yee'
        }
      ],done)
  });

  test('POST /users', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'KillaKev',
        password: 'NiceLA',
        first_name: 'Kevin',
        last_name:  'Lam',
      })
      .expect('Content-Type', /json/)
      .expect(200,{
        id: 6,
        username: 'KillaKev',
        first_name: 'Kevin',
        last_name:  'Lam',
      },done)
  });
  test('GET /users/:id', (done) => {
    request(server)
      .get('/users/2')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200,{
        id: 2,
        username: 'MoSho',
        first_name: 'Muhammad',
        last_name:  'Shoman'
      },done)
  });
  test('PUT /users/:id', (done) => {
    request(server)
      .put('/users/4')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        id: 4,
        username: 'LittleBoi',
        password:  'noBoi', //YeahBoi
        first_name: 'Little',
        last_name:  'Boy'
      })
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 4,
        username: 'LittleBoi',
        first_name: 'Little',
        last_name:  'Boy'
      },done)

  });
  test('DELETE /users/:id', (done) => {
    request(server)
      .del('/users/4')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200,{
        id: 4,
        username: 'BigBoi',
        first_name: 'Big',
        last_name:  'Boy'
      },done)
  });
});
