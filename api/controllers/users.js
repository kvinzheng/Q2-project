'use strict';
var util = require('util');
var knex = require('../../knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            // console.log('what is userIno', goodUser);
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
}

function GetSpecificUser(req, res) {
  // console.log('what is this',req.swagger.params.id.value);
  knex('users')
    .where("id", req.swagger.params.id.value)
    .then((users) => {
      if (users.length === 0) {
        res.set('Content-Type', 'text/plain');
        res.status(404).send("This user is not found");
      } else {
        // console.log('am i here', users);
        delete users[0].hashed_password
        // console.log('what is user[0]', users[0]);
        res.json(users[0]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

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
            // console.log('WHAT IS THIS', userInfo);
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
}
// return bcrypt.hash(updatedUser.password, 12)
//     .then((hashed_password) => {
//         updatedUser.hashed_password = hashed_password;
//         return knex('users')
//             .where('id', req.swagger.params.id.value)
//             .update({
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 username: req.body.username
//             }, '*')
//             .first()
//             .then((updated) => {
//                 console.log('what is update?', updated);
//                 delete updated.hashed_password;
//                 if (updated) {
//                     console.log('what am i sending', updated);
//                     res.send(updated);
//                 } else {
//                     throw new Error('it is not here');
//                 }
//             })
//             .catch((err) => {
//                 res.status(404);
//                 res.send({
//                     status: 404,
//                     ErrorMessage: 'Not Found.'
//                 });
//             })
//     })
//     .catch((err) => {
//         res.status(404);
//         res.send({
//             status: 404,
//             ErrorMessage: 'Not Found.'
//         });
//     });
// };

function DeleteUser(req, res, next) {
  // let deletedUser;
  if (isNaN(req.swagger.params.id.value)) {
    res.set('Content-type', 'text/plain');
    res.status(404).send('Not Found');
  } else {
    return knex('users').first()
      .where('id', req.swagger.params.id.value)
      .then((user) => {
        // console.log('what is user', user);
        if (user === undefined) {
          res.set('Content-Type', 'text/plain');
          res.status(404).send('This ID is Not Found, Please try another one');
          // next();
        } else {
          console.log('what is value,', req.swagger.params.id.value);
          return knex('users').returning('*')
            .where('id', req.swagger.params.id.value)
            .del();
          // return user;
        }
      })
      // .catch((error) => {
      //   console.error(error)
      // })
      .then((deletedContent) => {
        // console.log('what is deletedContent', deletedContent);
        if (deletedContent) {
          // console.log('am i here');
          delete deletedContent[0].hashed_password;
          res.status(200).json(deletedContent[0]);
        }
      })
      //have a bug here
      .catch((error) => {
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
