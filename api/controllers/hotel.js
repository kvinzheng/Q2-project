'use strict';
var util = require('util');
var knex = require('../../knex.js')
const request = require('request');
const fetch = require('node-fetch');

//Due Skype Skype Scanner temporary shut down their API for hotel server, we are not able to provide real time service for hotel

// function convertCoordtoAddress(lat, long) {
//   return fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=p4a2P2xDL91lyyxP13GGAhpLhCwq7nZW&location=${lat},${long}`)
//   .then((res) => {
//     return res.json();
//   }).then((jayson) => {
//     let location = {};
//     location.street_name = jayson.results[0].locations[0].street;
//     location.city_name = jayson.results[0].locations[0].adminArea5;
//     return location
//   }).catch((err) => {
//     throw err;
//   })
// }
//
// function GetAllHotel(req, res) {
//   //obtain entity id for given city
//   let entityId;
//   fetch(`http://partners.api.skyscanner.net/apiservices/hotels/autosuggest/v2/US/USD/en-US/NYC?apiKey=${process.env.FLIGHTAPI}`).then((res) => {
//     return res.json();
//   }).then((jayson) => {
//     return jayson.results[0].individual_id
//   }).then((entityId) => {
//     console.log('entityId', entityId);
//     fetch(`http://partners.api.skyscanner.net/apiservices/hotels/liveprices/v2/US/USD/en-US/${entityId}/2017-12-04/2017-12-05/2/1?apiKey=${process.env.FLIGHTAPI}`)
//     .then((res) => {
//       return res.json()
//     }).then((jayson) => {
//       console.log('jayson', jayson);
//       let finalObjs = [];
//       let hotelPrices = jayson.hotels_prices.map((hotel) => {
//         return hotel.agent_prices[0].price_total
//       });
//       console.log('hotelPrices', hotelPrices);
//       let hotelObjects = jayson.hotels.map((hotel, index) => {
//         let hotelObj = {};
//         hotelObj.name = hotel.name;
//         hotelObj.cost = hotelPrices[index];
//         return convertCoordtoAddress(hotel.latitude, hotel.longitude).then((location) => {
//           hotelObj.street_name = location.street_name;
//           hotelObj.city_name = location.city_name;
//           finalObjs.push(hotelObj);
//           console.log('finalObjs', finalObjs);
//           return hotelObj;
//         })
//         return hotelObj;
//       })
//       return Promise.all(hotelObjects).then((hotelsArr) => {
//         console.log('hotelsArr', hotelsArr);
//         res.send(hotelsArr)
//       })
//     }).catch((err) => {
//       throw err;
//     })
//   }).catch((err) => {
//     throw err
//   })
// };


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
