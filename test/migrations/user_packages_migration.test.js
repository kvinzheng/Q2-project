'use strict';

process.env.NODE_ENV = 'test';

const { expect, assert } = require('chai');
const knex = require('../../knex');

describe('user packages migrations', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

})

  it('user_packages migrations', (done) => {
    knex('user_packages').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'user_packages_id_seq\'::regclass)'
          },

          budget: {
            type: 'real',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },

          user_id:  {
            type: 'integer',
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
  })
