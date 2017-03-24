'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { describe, it } = require('mocha');
const bcrypt = require('bcrypt')
const request = require('supertest');
const knex = require('../../knex');
const app = require('../../app');
