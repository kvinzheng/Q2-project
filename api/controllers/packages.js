'use strict';
var util = require('util');
var knex = require('../../knex.js')
const fetch = require('node-fetch');
const Yelp = require('yelp')
let yelp = new Yelp({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET,
});

function GetAllPackagePerUser(req, res, err) {
    // console.log('did i get here?');
    return knex('users')
        .join('user_packages', 'users.id', 'user_packages.id')
        .join('flight_package', 'flight_package.package_id', 'user_packages.id')
        .join('flights', 'flights.id', 'flight_package.flight_id')
        .join('hotel_package', 'hotel_package.package_id', 'user_packages.id')
        .join('hotels', 'hotels.id', ' hotel_package.package_id')
        .join('restaurant_package', 'restaurant_package.package_id', 'user_packages.id')
        .join('restaurants', 'restaurants.id', 'restaurant_package.restaurant_id')
        .select('user_packages.id as package_id', 'users.id as user_id', 'airline', 'flights.id as flight_id', 'flights.cost as flight_cost', 'restaurants.name as restaurant_name', 'restaurants.id as restaurant_id',
            'restaurants.view_count as restaurants_review', 'hotels.name as hotels_name', 'hotels.id as hotels_id', 'hotels.cost as hotels_cost')
        .where('user_packages.id', req.swagger.params.id.value)
        .returning('*')
        .then((result) => {
            if (result) {
                console.log('what is result andy?', result);
                res.set('Content-Type', 'application/json');
                res.status(200).send(result);
            } else {
                res.status(404);
                res.send(" we can't find anything with this user's id");
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

function PostUniquePackagePerUser(req, res) {
    let current_city = req.body.current_city;
    let destination_city = req.body.destination_city;
    let date = req.body.departure_date;
    let budget = req.body.budget;
    let flight_cost;
    let airline;
    let carrierId;
    let user_id = req.swagger.params.id.value;
    fetch(`http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/${current_city}/${destination_city}/${date}/${date}?apikey=${process.env.FLIGHTAPI}`)
        .then((response) => {
            return response.json();
        })
        .then((jayson) => {
            flight_cost = jayson.Quotes[0].MinPrice;
            if (flight_cost > budget) {
                res.status(401).send("sorry. budget is too low");
            }
            carrierId = jayson.Quotes[0].OutboundLeg.CarrierIds[0];
            airline = jayson.Carriers.find((carrierObj) => {
                return carrierObj.CarrierId === carrierId
            })
            return jayson
        })
        .then((response) => {
            return knex('user_packages')
                .insert({
                    budget: budget,
                    user_id
                }, 'id')
                .then((package_id) => {
                    return knex('flights')
                        .insert({
                            airline: airline.Name,
                            departure_city: current_city,
                            destination_city: destination_city,
                            departure_date: date,
                            arrival_date: date,
                            cost: flight_cost
                        }, 'id')
                        .then((flight_id) => {
                            return knex('flight_package')
                                .insert({
                                    flight_id: flight_id[0],
                                    package_id: package_id[0]
                                }, 'package_id')
                                .then((package_id) => {
                                    yelp.search({
                                            term: 'food',
                                            location: destination_city,
                                            limit: 1,
                                            rating: 4
                                        })
                                        .then((response) => {
                                            let restaurant = response.businesses[0]
                                            return knex('restaurants')
                                                .insert({
                                                    name: restaurant.name,
                                                    street_name: restaurant.location.address[0],
                                                    city_name: restaurant.location.city,
                                                    view_count: restaurant.review_count
                                                }, 'id')
                                                .then((restaurant_id) => {
                                                    return knex('restaurant_package')
                                                        .insert({
                                                            restaurant_id: restaurant_id[0],
                                                            package_id: package_id[0]
                                                        }, 'package_id')
                                                        .then((package_id) => {
                                                          return knex('hotel_package')
                                                            .insert({
                                                                hotel_id: 4,
                                                                package_id: package_id[0]
                                                            })
                                                            .then((response) => {
                                                              res.send({
                                                                    user_id,
                                                                    package_id: package_id[0],
                                                                    airline: airline.Name,
                                                                    flight_id: flight_id[0],
                                                                    flight_cost,
                                                                    restaurant_name: restaurant.name,
                                                                    restaurant_id: restaurant_id[0],
                                                                    hotels_name: 'Chateau Tivoli Bed & Breakfast Inn',
                                                                    hotels_id: 4,
                                                                    hotels_cost: 350}
                                                                  );
                                                            })

                                                        })
                                                })
                                        })

                                })
                        })
                })
        })
        .catch((err) => {
            throw err;
        })
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
                console.log('what is result, kevin', result);
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

module.exports = {
    GetAllPackagePerUser: GetAllPackagePerUser,
    PostUniquePackagePerUser: PostUniquePackagePerUser,
    GetUniquePackageUniqueUser: GetUniquePackageUniqueUser,
}
