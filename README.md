# Galvanize Q2 Group Project Proposal

* This proposal is for a fullstack app, eventhough you will actually only build the serverside portion of it.
* 1 member from your team will need to fork this repo and update this README file with your proposal.
* Make sure to preview your proposal in a markdown preview and [use valid markdown syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
  * Unformatted/unreadable proposals will be rejected
* Create a Pull Request against this repo with your own repo.

## Team Name

Cost manager


## Group Members

Muhammad Shoman and Kevin Zheng


## Project/Application Name

PackaVacay


## Project Description

* This project will consist of four tables hotel , fights, restaurant and user table and finally the user_package table. This app is for people who travel to another country and find the closest hotel, restaurant, and restaurant. users can also add the preference of their choices to a user package table so they know what restaurant, hotel and flight. If we are able to get to the end of the project, we will build a price optimization feature, where users can input relevant amount of budge restriction, the app will provide them an list of preference for them. For now, we will focus on building the relationship on the core three main tables first. They are hotel, flights, and restaurant.

1. users send GET request to see the user info \
 users send POST request to add user info \
 users send PUT change their person information \
 users send DELETE requests to delete the flight information.

2. users send GET view the package information \
 users send POST add info to the package \
 users send PUT update info to the package \
 users send DELETE delete info to the package.

3. users send GET requests to view a flight information \
 users send POST requests to add a flight information if it is not existed \
 users send PUT requests to update previous routines \
 users send DELETE request to delete the flight information.

4. users send GET requests to view a hotel information \
 users send POST requests to add a hotel information if it is not existed \
 users send PUT requests to update hotel info \
 users send DELETE request to delete the hotel info

5. users send GET requests to view a restaurant information \
 users send POST requests to add a restaurant information if it doesn't existet\
 users send PUT requests to update previous the restaurant review\
 users send DELETE requests to delete the flight information.


## Who uses it? (from the point of view of end users of your fullstack app)

* Traveler who travel to another country and find the closet hotel, restaurant.
* people who don't want to look for hotel or hotels after they lands.

## What outputs do they need? (from the point of view of end users of your fullstack app)

* GET requests to receive flight/hotel/restaurant/preference
* POST requests to update flight/hotel/restaurant/preference
* PUT requests to add flight/hotel/restaurant/preference
* DELETE requests delete flight/hotel/restaurant/preference

## What inputs are needed to generate those outputs? (from the point of view of end users of your fullstack app)

* The user is required to input their users name and password in order get into the page.

* The user is also required to enter current city, destination, date depart, date arrived, and relevant budget. Destination is the main core key to connect the flight_city, restaurant_city, and the hotel_city.

## What technologies do you plan to use? (server-side only)
* List libraries/frameworks you plan to use

* Swagger /create an documentation for api
* express/ server side frame work
*  knex / using knex frame work and SQL knowledge to select data from different tables
* body-parser /with post man body info for put/PUT request
* cookie-parser /might need to generate cookie
* bcrypt/need to generate password
* humps /might need to use it depending on the case
* Supertests
* Heroku


## Feature list (both server side and client side)
* List all features in priority order (including stretch features)

 * Sign-Up: Creation of a user account
 * Sign-In: cookie/token, hashed password, validation(stretch)
 * GET: Enter the route, the user would be able to get the info that they want
 * POST: Add the flight information/ hotel information
 * UPDATE: Update the flight/hotel/restaurant information
 * Delete: Delete the flight/hotel/restaurant information(it is crazy, I know.

 * But it is happening! For now, we are trying to spend time to build the relationship data base first since this is the core purpose for this backend project. Our team decide not to worry so much about the potential feature such cost optimization, we are focusing on building the tables first, then we will build the cost optimization feature later)

## End User wireframes. (Client side view of your app, which you won't be implimenting in Q2)
* This is to inform us and you of how someone may use your api to fill a need. This will also drive your user stories for the backend api.
* Include pictures of wireframes that you've drawn or you've made using a program, in this repo.

 * Please refer to the file called "homepage.png", "mypackages.png", "search. png", "signup.png"

## Entity Relationship Diagrams (Server side)
* Include pictures of the diagrams that you've drawn or you've made using a program, in this repo.

 * Please refer to the file called "relational database.png" file above

## User Stories for completing the serverside.
* Use a tracking software like trello or gihub issues.
* Should include all API end points as well details on the input and output to these endpoints

we are using github and clubhouse to work together.
*  NOTE: User need to enter the destination city and so we decide to use city column to connect flight table, restaurant table, and hotel table.

 Here are the ROUTE: \

  * GET /flight -------- [{id: 1, airline: United AirLine, flight_number: 2000,       destination_city: France, departure_city: San Francisco, arrival_date: 3/30/2017, cost:1200, user_id: 12}, {},{},..... }  \        
  GET/restaurant ------- [{id: 1, name: Soma Eat, city_name: France Cost: 30, user_id: 12}, {}, {},...] \
  GET/hotel ------------- [{id:1, name:Hilton, city_name: France, street_name: string, date: string, user_id: 12}, {}, {}]



  * GET /users  ----------   [{id: 1, hashed_password: xxxxxx, first_name, last_name:, user_name, destination_city, departure_date, arrival_date, budget}, {}, {} ,{}] \
  POST /users --------- {id: 1, hashed_password: xxxxxx, first_name, last_name:, user_name, destination_city, departure_date, arrival_date, budget}\
  Get /users/:user_id -------------- {id: 1, hashed_password: xxxxxx, first_name, last_name:, user_name, destination_city, departure_date, arrival_date, budget} \
  POST /users/:user_id -------------- {id: 1, hashed_password: xxxxxx, first_name, last_name:, user_name, destination_city, departure_date, arrival_date, budget} \
  PATCH /users/:user_id -------------- {id: 1, hashed_password: xxxxxx, first_name, last_name:, user_name, destination_city, departure_date, arrival_date, budget} \
  DELETE /users/:user_id -------------- {id: 1, hashed_password: xxxxxx, first_name, last_name:, user_name, destination_city, departure_date, arrival_date, budget} \


  * GET /user: user_id/package  --------  [{id: 1, first_name: Kevin, last_name: zheng, flight_id: 2000, restaurant_id: 200, hotel_id:400}]\
  POST /user: user_id /package  --------  [{id: 1, first_name: Kevin, last_name: zheng, flight_id: 2000, restaurant_id: 200, hotel_id:400}]\
  UPDATE /user/:user_id/package  --------  [{id: 1, first_name: Kevin, last_name: zheng, flight_id: 2000, restaurant_id: 200, hotel_id:400}]\
  DELETE /user/:user_id/package  --------  [{id: 1, first_name: Kevin, last_name: zheng, flight_id: 2000, restaurant_id: 200, hotel_id:400}]


* GET /flight/:flight_id ------ {id: 1, airline: United AirLine, flight_number: 2000,       destination_city: France, departure_city: San Francisco, arrival_date: 3/30/2017, cost:1200, user_id: 12} \
GET /hotel/:hotel_id ------------- {id: 1, name: Hilton, city_name: San_Francisco Cost: 30, user_id: 12} \
GET /restaurant/:restaurant_id ---------- {id: 1, name: Soma_Eat, city_name: San_Francisco, street_name: 2nd_Street, cost:30, user_id: 1 }

* GET /user/:user_id/mypackages/  --------- [{id: 1, budget: 500, flight_id: 1, restaurant_id: 1, hotel_id: 1,  user_id: 1,  departure_date: 04/05/2017, arrival_date: 4/05/2017}, {...}] \
 GET /user/:user_id/mypackages/:package_id -------- {id: 1, budget: 500, flight_id: 1, restaurant_id: 1, hotel_id: 1,  user_id: 1,  departure_date: 04/05/2017, arrival_date: 4/05/2017} \
POST /user/:user_id/mypackages/:package_id------------- {id: 1, budget: 500, flight_id: 1, restaurant_id: 1, hotel_id: 1,  user_id: 1,  departure_date: 04/05/2017, arrival_date: 4/05/2017}\
 PUT /user/:user_id/mypackages/:package_id ----- {id: 1, budget: 500, flight_id: 1, restaurant_id: 1, hotel_id: 1,  user_id: 1,  departure_date: 04/05/2017, arrival_date: 4/05/2017}\
DELETE /user/:user_id/mypackages/:package_id: -------  {id: 1, budget: 500, flight_id: 1, restaurant_id: 1, hotel_id: 1,  user_id: 1,  departure_date: 04/05/2017, arrival_date: 4/05/2017}

note: we are creating our data base manually due to the API restriction.

***         Stories to complete the server side:               ***
1. Learn swagger and implementation swagger to write out the router and documentation for the routes
2. write routes for the users sign up and log in
3. write routes to get/post/put/delete flight table.
4. write routes to get/post/put/delete hotel table.
5. write routes to get/post/put/delete restaurant table.
6. write routes to get/post/put/delete user package
7. write out migrations folders
8. write out seed folders
9. write out the database- 1.developement database 2. test database
10. we will have 5 tables, users, users_package, hotel, restaurant, flight
11. write out test
12. write function
