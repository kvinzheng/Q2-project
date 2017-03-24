'use strict';
var util = require('util');
var knex = require('../../knex.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const header = require('module-header')

function GetAllFlight(req, res){
  jwt.verify(req.headers['token'], process.env.JWT_KEY, (err, payload) => {
    if (err) {
        res.send(false);
    } else {
        tokenId = payload.userId;
        console.log(tokenId);
        res.send(true);
    }
  });

  return knex('flights')
    .select('*')
      .then((result) => {
          if(result){
            res.set('Content-Type', 'application/json')
            res.send(result);
          }
        else{
          res.status(400);
          res.send('this is not a valid input')
          throw new Error("this end point doesn't exist");
        }
      })
      .catch((err) =>{
        console.error(err);
      })
}

function GetFlight(req, res){
  return knex('flights')
      .where('id', req.swagger.params.id.value)
      .returning('*')
        .then((result) => {
          res.set('Content-Type', 'application/json')
          res.send(result[0])
        })
        .catch((err) =>{
          next();
        });
}

module.exports = {
  GetAllFlight: GetAllFlight,
  GetFlight: GetFlight
};
