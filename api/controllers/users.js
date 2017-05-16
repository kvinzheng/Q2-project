'use strict';
var util = require('util');
const knex = require('../../knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Return an object with all the user information
function GetAllUsers(req, res) {
  return knex('users')
    .select('id', 'first_name', 'last_name', 'username')
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};
//register a new user and return back a user object with first_name, last_name and password
function AddUser(req, res) {
  let token;
  return knex('users')
    .where("username", req.body.username)
    .then((users) => {
      if (users[0]) {
        res.status(400).send("username already exists");
      } else {
        return bcrypt.hash(req.body.password, 12)
          .then((hashed) => {
            const newUser = {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              hashed_password: hashed
            }
            const claim = {
              userId: req.body.username
            };
            token = jwt.sign(claim, process.env.JWT_KEY, {
              expiresIn: '7 days'
            });
            return knex('users').insert(newUser, '*');
          })
          .then((userInfo) => {
            let goodUser = userInfo[0];
            goodUser.token = token;
            delete goodUser.hashed_password;
            res.status(200).json(goodUser);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
    .catch((err) => {
      console.log(err);
    })
};
//get the sepecific user and return its related related user info
function GetSpecificUser(req, res) {
  knex('users')
    .where("id", req.swagger.params.id.value)
    .then((users) => {
      if (users.length === 0) {
        res.set('Content-Type', 'text/plain');
        res.status(404).send("This user is not found");
      } else {
        delete users[0].hashed_password
        res.json(users[0]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
//update the user info with a respnse of first_name, last_name, username
function UpdateUser(req, res) {
  const updatedUser = req.body;
  knex('users')
    .where("id", req.swagger.params.id.value)
    .then((users) => {
      if (users.length === 0) {
        res.set('Content-Type', 'text/plain');
        res.status(404).send("This user is not found");
      } else {
        bcrypt.hash(updatedUser.password, 12)
          .then((hash) => {
            const newUser = {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              hashed_password: hash
            };
            return knex('users')
              .where('id', req.swagger.params.id.value)
              .update(newUser, '*')
          })
          .then((userInfo) => {
            let goodUser = userInfo[0];
            delete goodUser.hashed_password;
            res.status(200).json(goodUser);
          })
          .catch((error) => {
            console.error(error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
    })
};

//delete a sepecific user
function DeleteUser(req, res, next) {
  if (isNaN(req.swagger.params.id.value)) {
    res.set('Content-type', 'text/plain');
    res.status(404).send('Not Found');
  } else {
    return knex('users').first().where('id', req.swagger.params.id.value).then((user) => {
      if (user === undefined) {
        res.set('Content-Type', 'text/plain');
        res.status(404).send('This ID is Not Found, Please try another one');
      } else {
        return knex('users').returning('*').where('id', req.swagger.params.id.value).del();
      }
    }).then((deletedContent) => {
      if (deletedContent) {
        delete deletedContent[0].hashed_password;
        res.status(200).json(deletedContent[0]);
      }
    }).catch((error) => {
      res.set('Content-Type', 'text/plain');
      res.status(404).send('This ID is Not Found, Please try another one');
      console.error(error)
    })
  }
}

module.exports = {
  GetAllUsers: GetAllUsers,
  AddUser: AddUser,
  GetSpecificUser: GetSpecificUser,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser
};
