'use strict';
var util = require('util');
const knex = require('../../knex.js');
const Yelp = require('yelp');
//loading all the restaurant in the current departure city and yelp rating as inputs
function GetAllRestaurant(req, res) {
    // Request API access: http://www.yelp.com/developers/getting_started/api_access
    let yelp = new Yelp({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        token: process.env.TOKEN,
        token_secret: process.env.TOKEN_SECRET,
    });
    // See http://www.yelp.com/developers/documentation/v2/search_api
    // console.log('did i hit here');
    yelp.search({
            term: 'food',
            location: req.query.departure_city,
            limit: 40,
            rating: req.query.rating
        })
        .then(function(data) {
            let finalArray = [];
            data.businesses.forEach((ele) => {
                let result = {};
                result.id = ele.id;
                result.name = ele.name
                result.city_name = req.query.departure_city
                result.street_name = ele.location.address[0]
                if(ele.review_count){
                  result.view_count = parseInt(ele.review_count);
                }
                else{
                  result.view_count = 0;
                }
                finalArray.push(result);
            });
            finalArray.sort((a,b) =>{
              return b.view_count - a.view_count
            });
            res.status(200).json(finalArray);
        })
        .catch(function(err) {
            console.error(err);
        });
};

module.exports = {
    GetAllRestaurant,
};
