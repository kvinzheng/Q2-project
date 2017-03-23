'use strict';
var util = require('util');
var knex = require('../../knex.js')


function GetAllFlight(req, res){
  return knex('flights')
    .select('*')
      .then((result) => {
        // if(result){
        console.log(result);
          res.send(result);
        // }else{
          // res.status(400);
          // res.send('this is not a valid input')
        //   throw new Error("this end point doesn't exist")
        // }
        // console.log('what is result', result);
      })
      .catch((err) =>{
        console.error(err);
      })
}

function GetFlight(req, res){
  return knex('flights')
    .where('id', req.swagger.params.id.value)
    .select('*')
      .first()
      .then((result) => {
        res.send(result)
      })
      .catch((err) =>{
        next();
      });
}


module.exports = {
  GetAllFlight: GetAllFlight,
  GetFlight: GetFlight
};
