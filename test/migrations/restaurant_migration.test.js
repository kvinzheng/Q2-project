'use strict';

process.env.NODE_ENV = 'test';

// const assert = require('chai').assert;
// const { suite, test } = require('mocha');
const { expect, assert } = require('chai');
const knex = require('../../knex');

beforeEach( done => {
  knex.migrate.latest()
  .then(() => {
      done();
    })
  .catch((err) => {
    done(err);
  });
});

afterEach( done => {
  knex.migrate.rollback()
  .then(() => {
    done();
  });
});

describe('restaurants migrations process', () => {

  it('restaurants columns', (done) => {
    knex('restaurants').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'restaurants_id_seq\'::regclass)'
          },

          name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          street_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          city_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          view_count: {
            type: 'real',
            maxLength: null,
            nullable: false,
            defaultValue: null
          }
        };

        for (const column in expected) {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
