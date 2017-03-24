'use strict';
var util = require('util');
var knex = require('../../knex.js')


function GetAllPackagePerUser(req, res, err) {
    // console.log('did i get here?');
    return knex.from('users')
        .innerJoin('user_packages', 'users.id', 'user_packages.id')
        .join('flight_package', 'flight_package.package_id', 'user_packages.id')
        .join('flights', 'flights.id', 'flight_package.flight_id')
        .join('hotel_package', 'hotel_package.package_id', 'user_packages.id')
        .join('hotels', 'hotels.id', ' hotel_package.package_id')
        .join('restaurant_package', 'restaurant_package.package_id', 'user_packages.id')
        .join('restaurants', 'restaurants.id', 'restaurant_package.restaurant_id')
        .select('user_packages.id as package_id', 'users.id as user_id', 'airline', 'flights.id as flight_id', 'flights.cost as flight_cost', 'restaurants.name as restaurant_name', 'restaurants.id as restaurant_id',
            'restaurants.cost as restaurants_cost', 'hotels.name as hotels_name', 'hotels.id as hotels_id', 'hotels.cost as hotels_cost')
        .where('user_packages.id', req.swagger.params.id.value)
        .returning('*')
        .then((result) => {
            if (result) {
                console.log('what is result andy?', result);
                res.set('Content-Type', 'application/json');
                res.send(result);
            } else {
                res.status(400);
                res.send('this is not a valid input');
                throw new Error("this end point doesn't exist");
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

function PostUniquePackagePerUser() {
    // return knex('user_packages').
    //   insert({
    //     'budget': req.swagger.params.budget.value,
    //     'user_id': req.swagger.params.user_id.value
    //   })
    //   .returning('*')
    //   .then((result) => {
    //     res.send(result);
    //   })
    //   .catch((err) => {
    //     next();
    //   });
}

function GetUniquePackageUniqueUser(req, res, err) {
  return knex.from('users')
      .innerJoin('user_packages', 'users.id', 'user_packages.id')
      .join('flight_package', 'flight_package.package_id', 'user_packages.id')
      .join('flights', 'flights.id', 'flight_package.flight_id')
      .join('hotel_package', 'hotel_package.package_id', 'user_packages.id')
      .join('hotels', 'hotels.id', ' hotel_package.package_id')
      .join('restaurant_package', 'restaurant_package.package_id', 'user_packages.id')
      .join('restaurants', 'restaurants.id', 'restaurant_package.restaurant_id')
      .select('user_packages.id as package_id', 'users.id as user_id', 'airline', 'flights.id as flight_id', 'flights.cost as flight_cost', 'restaurants.name as restaurant_name', 'restaurants.id as restaurant_id',
          'restaurants.cost as restaurants_cost', 'hotels.name as hotels_name', 'hotels.id as hotels_id', 'hotels.cost as hotels_cost')
      .where('user_packages.id', req.swagger.params.package_id.value)
      .andWhere('user_id', req.swagger.params.user_id.value)
      .returning('*')
      .then((result) => {
          if (result) {
              console.log('what is result, kevin', result[0]);
              res.set('Content-Type', 'application/json');
              res.send(result[0]);
          } else {
              res.status(400);
              res.send('this is not a valid input');
              throw new Error("this end point doesn't exist");
          }
      })
      .catch((err) => {
          console.error(err);
      })
}

function UpdateUniquePackageUniqueUser() {

}

function DeleteUniquePackageUniqueUser() {

}
module.exports = {
    GetAllPackagePerUser: GetAllPackagePerUser,
    // PostUniquePackagePerUser: PostUniquePackagePerUser,
    GetUniquePackageUniqueUser: GetUniquePackageUniqueUser,
    // UpdateUniquePackageUniqueUser: UpdateUniquePackageUniqueUser,
    // DeleteUniquePackageUniqueUser: DeleteUniquePackageUniqueUser
}
