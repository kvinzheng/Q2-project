'use strict';
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const knex = require('../../../knex.js');
const app = require('../../../app.js');

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

describe('users routes', () => {
  it('GET users/', (done) => {
    request(app)
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
        },
        {
          id: 6,
          username: 'Sasha',
          first_name: 'Sasha',
          last_name: 'Dog'
        }
      ],done)
  });

  it('POST /users', (done) => {
    request(app)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'KillaKev',
        password: 'nicesf',
        first_name: 'Kevin',
        last_name:  'Lam',
      })
      .expect('Content-Type', /json/)
      .expect(200,done)
  });
  it('GET /users/:id', (done) => {
    request(app)
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
  it('PATCH /users/:id', (done) => {
    request(app)
      .patch('/users/4')
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
  it('DELETE /users/:id', (done) => {
    request(app)
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
