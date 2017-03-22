'use strict';
var util = require('util');
var knex = require(../../knex.js)


function GetAllHotel(){
  knex('hotels')
    .select('*')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    });
}

function GetSpecificHotel(){
  knex('hotels')
    .where('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next();
    })
}


module.exports = {
  GetAllHotel: GetAllHotel
  GetSpecificRestaurant: GetSpecificRestaurant
};
