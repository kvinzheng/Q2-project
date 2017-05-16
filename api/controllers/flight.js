'use strict';
const util = require('util');
const knex = require('../../knex.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const request = require('request');
const fetch = require('node-fetch');

function GetAllFlight(req, res) {
  //making an AJAX request to outside third party API called skyscanner and receive real time flight data
  fetch("http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-US/us/anywhere/anytime/anytime?apikey=" + process.env.FLIGHTAPI).then((response) => {
    return response.json();
  }).then((realRes) => {
    let finalArray = [];
    realRes["Quotes"].forEach((ele) => {
      let result = {};
      let Airline = realRes["Carriers"].filter((flight) => {
        return flight.CarrierId === ele.OutboundLeg["CarrierIds"][0]
      })[0];

      if (Airline === undefined) {
        Airline = 'ID_Missing'
      }

      Airline = Airline['Name'];
      let departureLocation = realRes['Places'].filter((place) => {
        return place.PlaceId === ele['OutboundLeg']['OriginId']
      })[0];
      let departureCity = 'airport: ' + departureLocation.SkyscannerCode + ', City: ' + departureLocation.Name;
      let destinationLocation = realRes['Places'].filter((place) => {
        return place.PlaceId === ele['OutboundLeg']['DestinationId']
      })[0];

      let destinationCity = 'airport: ' + destinationLocation.SkyscannerCode + ', City: ' + destinationLocation.Name;
      let QuoteId = ele.QuoteId;
      result.id = parseInt(QuoteId);
      if (Airline === undefined) {
        Airline = 'ID_Missing'
      }
      result.airline = Airline;
      result.cost = parseInt(ele.MinPrice);
      result.destination_city = destinationCity;
      result.departure_city = departureCity;
      result.departure_date = ele.OutboundLeg.DepartureDate;
      result.arrival_date = ele.InboundLeg.DepartureDate;

      finalArray.push(result);
    });
    let newArray = finalArray.filter((ele) => {
      return (ele.departure_city.includes(req.query.departure_city)) && (ele.departure_date.includes(req.swagger.params.departure_date.value))
    })

    res.status(200).json(newArray);
  }).catch((err) => {
    console.error(err);
  })
}

function GetFlight(req, res) {
  //making an AJAX request to outside third party API called skyscanner and receive real time flight data
  fetch("http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-US/us/anywhere/anytime/anytime?apikey=" + process.env.FLIGHTAPI).then((response) => {
    return response.json();
  }).then((realRes) => {
    let finalArray = [];
    realRes["Quotes"].forEach((ele) => {
      let result = {};
      let Airline = realRes["Carriers"].filter((flight) => {
        return flight.CarrierId === ele.OutboundLeg["CarrierIds"][0]
      })[0];

      if (Airline === undefined) {
        Airline = 'ID_Missing'
      }

      Airline = Airline['Name'];
      let departureLocation = realRes['Places'].filter((place) => {
        return place.PlaceId === ele['OutboundLeg']['OriginId']
      })[0];
      let departureCity = 'airport: ' + departureLocation.SkyscannerCode + ', City: ' + departureLocation.Name;
      let destinationLocation = realRes['Places'].filter((place) => {
        return place.PlaceId === ele['OutboundLeg']['DestinationId']
      })[0];

      let destinationCity = 'airport: ' + destinationLocation.SkyscannerCode + ', City: ' + destinationLocation.Name;
      let QuoteId = ele.QuoteId;
      result.id = parseInt(QuoteId);
      if (Airline === undefined) {
        Airline = 'ID_Missing'
      }
      result.airline = Airline;
      result.cost = parseInt(ele.MinPrice);
      result.destination_city = destinationCity;
      result.departure_city = departureCity;
      result.departure_date = ele.OutboundLeg.DepartureDate;
      result.arrival_date = ele.InboundLeg.DepartureDate;

      finalArray.push(result);
    });
    let newArray = finalArray.filter((ele) => {
      return ele.id === req.swagger.params.id.value
    });

    res.status(200).json(newArray[0]);
  }).catch((err) => {
    console.error(err);
  })

}

module.exports = {
  GetAllFlight: GetAllFlight,
  GetFlight: GetFlight
};
