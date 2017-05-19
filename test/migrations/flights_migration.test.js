'use strict';

process.env.NODE_ENV = 'test';

// const assert = require('chai').assert;
// const { suite, test } = require('mocha');
const { expect, assert } = require('chai');
const knex = require('../../knex');

describe('flights migrations', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('flights columns', (done) => {
    knex('flights').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'flights_id_seq\'::regclass)'
          },

          airline: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          departure_city: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          destination_city: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          departure_date: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },

          arrival_date: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },

          cost: {
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
