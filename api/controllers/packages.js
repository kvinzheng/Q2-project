'use strict';
var util = require('util');
const knex = require('../../knex.js')
const fetch = require('node-fetch');
const Yelp = require('yelp');
//Applying Yelp API Key here to use the YELP NPM package
let yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});

//Get all the related restaurants, hotels, flights information for given user
function GetAllPackagePerUser(req, res, err) {
  return knex('users')
    .join('user_packages', 'users.id', 'user_packages.user_id')
    .join('flight_package', 'flight_package.package_id', 'user_packages.id')
    .join('flights', 'flights.id', 'flight_package.flight_id')
    .join('hotel_package', 'hotel_package.package_id', 'user_packages.id')
    .join('hotels', 'hotels.id', ' hotel_package.package_id')
    .join('restaurant_package', 'restaurant_package.package_id', 'user_packages.id')
    .join('restaurants', 'restaurants.id', 'restaurant_package.restaurant_id')
    .select('*')
    .select('user_packages.id as package_id', 'users.id as user_id', 'airline', 'flights.id as flight_id', 'flights.cost as flight_cost', 'restaurants.name as restaurant_name', 'restaurants.id as restaurant_id',
      'restaurants.view_count as restaurants_review', 'hotels.name as hotels_name', 'hotels.id as hotels_id', 'hotels.cost as hotels_cost')
    .where('users.id', req.swagger.params.id.value)
    .returning('*')
    .then((result) => {
      if (result) {
        res.set('Content-Type', 'application/json');
        res.status(200).send(result);
      } else {
        res.status(404);
        res.send(" we can't find anything with this user's id");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}


//post an package with the specific hotel, restaurant, and flight
function PostUniquePackagePerUser(req, res) {

  let current_city = req.body.departure_airport_name;
  let destination_city = req.body.destination_airport_name;
  let date = req.body.departure_date;
  let airfare = req.body.airfare;
  let flight_cost;
  let airline;
  let carrierId;
  let hotelName = req.body.hotel_name;
  let hotelCity = req.body.city_name;
  let hotelCost = 200;
  let hotelStreetName = req.body.street_name;
  let user_id = req.swagger.params.id.value;
  let package_id;
  let hotelId;

  fetch(`http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/${current_city}/${destination_city}/${date}/${date}?apikey=${process.env.FLIGHTAPI}`).then((response) => {
    return response.json();
  }).then((returnData) => {
    flight_cost = returnData.Quotes[0].MinPrice;
    //check if the price is too low
    if (flight_cost > airfare) {
      res.status(401).send("sorry. airfare is too low");
    }
    carrierId = returnData.Quotes[0].OutboundLeg.CarrierIds[0];
    airline = returnData.Carriers.find((carrierObj) => {
      return carrierObj.CarrierId === carrierId
    })
    return returnData;
  })
  .then(() => {
    return knex('user_packages').insert({
      budget: airfare,
      user_id
    }, 'id')
    //insert into flights table
    .then((user_package_id) => {
      package_id = user_package_id;
      return knex('flights').insert({
        airline: airline.Name,
        departure_city: current_city,
        destination_city: destination_city,
        departure_date: date,
        arrival_date: date,
        cost: flight_cost
      }, 'id')
      //insert into flight package
      .then((flight_id) => {
        return knex('flight_package').insert({
          flight_id: flight_id[0],
          package_id: package_id[0]
        }, 'package_id')
        //insert into restaurants table
        .then(() => {
          yelp.search({
            term: 'food', location: destination_city, limit: 1, rating: 4
          })
          .then((response) => {
            let restaurant = response.businesses[0]
            return knex('restaurants').insert({
              name: restaurant.name,
              street_name: restaurant.location.address[0],
              city_name: restaurant.location.city,
              view_count: restaurant.review_count
            }, 'id')
            //insert into the restaurant_package
            .then((restaurant_id) => {
              return knex('restaurant_package').insert({
                restaurant_id: restaurant_id[0],
                package_id: package_id[0]
              }, 'package_id')
              //insert into the hotel table
              .then(() => {
                return knex('hotels').insert({
                  name: hotelName,
                  city_name: hotelCity,
                  street_name: 'N/A',
                  cost: hotelCost,
                  date: date
                }, 'id')
              })
              //insert into the hotel package table
              .then((hotel_id) => {
                hotelId = hotel_id[0];
                return knex('hotel_package')
                .insert({hotel_id: hotelId, package_id: package_id[0]})
                //finally return the response object
                .then(() => {
                  let responseObj = {
                    user_id,
                    package_id: package_id[0],
                    airline: airline.Name,
                    flight_id: flight_id[0],
                    flight_cost,
                    restaurant_name: restaurant.name,
                    restaurant_id: restaurant_id[0],
                    hotels_name: 'Chateau Tivoli Bed & Breakfast Inn',
                    hotels_id: hotelId,
                    hotels_cost: hotelCost
                  }
                  res.send(responseObj);
                })
              })
            })
          })
        })
      })
    })
  }).catch((err) => {
    throw err;
  });
}

// function GetUniquePackageUniqueUser(req, res, err) {
//   return knex.from('users')
//     .innerJoin('user_packages', 'users.id', 'user_packages.id')
//     .join('flight_package', 'flight_package.package_id', 'user_packages.id')
//     .join('flights', 'flights.id', 'flight_package.flight_id')
//     .join('hotel_package', 'hotel_package.package_id', 'user_packages.id')
//     .join('hotels', 'hotels.id', ' hotel_package.package_id')
//     .join('restaurant_package', 'restaurant_package.package_id', 'user_packages.id')
//     .join('restaurants', 'restaurants.id', 'restaurant_package.restaurant_id')
//     .select('user_packages.id as package_id', 'users.id as user_id', 'airline', 'flights.id as flight_id', 'flights.cost as flight_cost', 'restaurants.name as restaurant_name', 'restaurants.id as restaurant_id',
//       'restaurants.cost as restaurants_cost', 'hotels.name as hotels_name', 'hotels.id as hotels_id', 'hotels.cost as hotels_cost')
//     .where('user_packages.id', req.swagger.params.package_id.value)
//     .andWhere('user_id', req.swagger.params.user_id.value)
//     .returning('*')
//     .then((result) => {
//       if (result) {
//         console.log('what is result, kevin', result);
//         res.set('Content-Type', 'application/json');
//         res.send(result);
//       } else {
//         res.status(400);
//         res.send('this is not a valid input');
//         throw new Error("this end point doesn't exist");
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//     })
// }

module.exports = {
  GetAllPackagePerUser: GetAllPackagePerUser,
  PostUniquePackagePerUser: PostUniquePackagePerUser,
  // GetUniquePackageUniqueUser: GetUniquePackageUniqueUser,
}
