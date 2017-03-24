'use strict';

const util = require('util');
const knex = require('../../knex');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const env = process.


function userLogin(req, res) {

    console.log(' i have cookie', req.cookies);
    jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        res.set('Content-type', 'text/plain');
        res.status(401).send('Unauthorized');
      } else {
        // console.log('this is the payload',payload);
        // { userId: 1, iat: 1489382285, exp: 1489987085 }
        tokenUserid = payload.userId;
        next();
      }
    });

}

module.exports = {userLogin}


router.get('/token', (req, res) => {
    jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            res.send(false);
        } else {
            tokenId = payload.userId;
            res.send(true);
        }
    });
});
