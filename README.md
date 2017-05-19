# Travel Package Manager - Galvanize Q2 Back End Project

For full documentation of the Travel Package API please visit:http://travel-package-project.herokuapp.com/api-docs/

Travel Package Manager is an api that allows travelers to store their favorite choices of hotels, flights and restaurants.

* Everyone can search for a flights/restaurants/hotels. logged in users can create an account and add their favorite travel package to the database
* Only logged in users/authenticated can view their own favorite choices of vacation packages.


Travel Package Manager is an API built with Swagger framework which provide an very detail documentation of the routes but also does validations when taking inputs. Vacation Package Manager uses Node.js Express framework and Knex.js to connect with a PostgreSQL database to store users, flights, hotel, and restaurants data. user authentication and authorization is transmitted and decoded using JWT. Travel Package Manager also use Mocha testing framework, Chai Library and Super Test NPM package for testing purposes.

# Getting Started
1. Fork and clone repo.
2. `npm install`
3. Please register for
4. Please register for [Yelp Oauth Tokens](`https://www.yelp.com/developers/v3/manage_app`)
```
JWT_KEY=xxxxx
OAUTH_CONSUMER_KEY= xxxxx
OAUTH_CONSUMER_SECRET= xxxxx
OAUTH_TOKEN= xxxxx
OAUTH_TOKEN_SECRET= xxxxx
```
5. `createdb PackaVacay_dev` To create local development database.
6. `createdb PackaVacay_test` To Create local testing database.
7. `knex migrate:rollback` To rollback database
8. `knex migrate:latest` Add tables to the db.
9. `knex seed:run` Add the seeds to the db.
10. `swagger project edit` To run it locally in development mode.
11. `swagger project start` To Turn on swagger

# Testing:
1. To test the routes, run `mocha test/api/controllers`
2. To test the migrations, run `mocha test/migrations`

# Our Technologies
 We are using:
   * Swagger
   * express
   * knex
   * body-parser
   * cookie-parser
   * jsonwebtoken
   * bcrypt
   * humps

# Feature list
  * Sign-Up: Creation of a user account
  * Sign-In: token, hashed password, validation(using token)
  * Get: users get a combination of favorite hotel, restaurant and flight
  * POST/PATCH: users send/update information on their workouts
  * Delete user account: remove the user account

  * Get flights(External API): user can view real time airline information and find out related ticket airline and departure date
  * Get restaurant(Yelp API): user can view local restaurants with a filter of rating from 0 - 5
  * Get hotel: user can get all the hotel information back.


# Entity Relationship Diagrams
![](https://s21.postimg.org/w6dx38g13/Relational_Database.png)
