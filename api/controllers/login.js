'use strict';
var util = require('util');
const knex = require('../../knex');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const app = express();

app.use(cookieParser())
//loading environmental variables
const dotenv = require('dotenv');
dotenv.load()

function userLogin(req, res) {
    let authUser;
    return knex('users')
        .where('username', req.body.username)
        .first()
        .then((user) => {
          //check if user exist
            if (!user) {
                res.set("Content-Type", "text/plain");
                return res.status(400).send('Invalid username or password');
            } else {
              //if user exist, then confirm the password with bcrypt
                authUser = user;
                return bcrypt.compare(req.body.password, authUser.hashed_password)
            }
        })
        .then((match) => {
            if (match === false) {
                res.status(400).send('Invalid username or password');
                console.log('am i here');
            } else if (match === true) {
                const claim = {
                    userId: authUser.id
                };
                //assigning token with userId within
                const token = jwt.sign(claim, process.env.JWT_KEY, {
                    expiresIn: '7 days'
                });
                //send back a response with a token inside
                let userInfo = {
                    id: authUser.id,
                    user_name: authUser.username,
                    first_name: authUser.first_name,
                    last_name: authUser.last_name,
                    token: token
                }
                //return back a 200 response with the object
                res.status(200).json(userInfo);
            }
        })
        .catch((error) => {
        // if there is an error, then response will be 400 and bad email or password
         return res.status(400).json('Bad email or password');
        })
};

module.exports = {
    userLogin
}
