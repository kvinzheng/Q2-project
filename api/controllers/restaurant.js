'use strict';
var util = require('util');
var knex = require('../../knex.js');


function GetAllRestaurant(req, res){
  return knex('restaurants')
    .then((restaurants) => {
      res.send(restaurants);
    })
    .catch((err) => {
      throw err;
    });
};

function GetSpecificRestaurant(req, res){
  return knex('restaurants')
    .where('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((restaurant) => {
      console.log(restaurant);
      res.send(restaurant);
    })
    .catch((err) => {
      throw err;
    });
};


module.exports = {
  GetAllRestaurant: GetAllRestaurant,
  GetSpecificRestaurant: GetSpecificRestaurant
};
