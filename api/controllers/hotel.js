'use strict';
var util = require('util');
var knex = require('../../knex.js')
const request = require('request');
const fetch = require('node-fetch');


//get all the hotel
function GetAllHotel(req, res) {
  return knex('hotels')
  .then((hotels) => {
    console.log(hotels);
    res.send(hotels);
  })
  .catch((err) => {
    console.error(err);
  })
};

function GetSpecificHotel(req, res) {
  return knex('hotels').where('id', req.swagger.params.id.value).select('*').first()
  .then((hotel) => {
    res.send(hotel);
  })
  .catch((err) => {
    console.error(err);
  })
};

module.exports = {
  GetAllHotel: GetAllHotel,
  GetSpecificHotel: GetSpecificHotel
};
