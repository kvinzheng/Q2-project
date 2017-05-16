# Travel Package Manager - Galvanize Q2 Back End Project

For full documentation of the Travel Package API please visit:http://travel-package-project.herokuapp.com/api-docs/

Travel Package Manager is an api that allows users to store their preferred choices of hotels, flights and restaurants.

Travel Package Manager is an api that help travelers store their favorite choices of hotels, flights and restaurants.
All users can view their own favorite choice of vacation package; add a package to the database; search for specific hotel, restaurants and flight in the specific city; update the package or delete the package; Everyone can log in or create an account with Travel Package Manager. Registered users can save their favorite travel package, update their packages or delete them as well.


Travel Package Manager is an API built with Swagger framework which provide an very detail documentation of the routes but also does validations when taking inputs. Vacation Package Manager uses Node.js Express framework and Knex.js to connect with a PostgreSQL database to store users, flights, hotel, and restaurants data. user authentication and authorization is transmitted and decoded using JWT. Travel Package Manager also use Mocha testing framework, Chai Library and Super Test NPM package for testing.

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
11. Have fun!

