'use strict';
var util = require('util');
var knex = require('../../knex.js');
const bcrypt = require('bcrypt');

function GetAllUsers(req, res) {
    return knex('users')
        .select('id', 'first_name', 'last_name', 'username')
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            throw err;
        });
};

function AddUser(req, res) {
    const {
        first_name,
        last_name,
        username,
        password
    } = req.body;
    return knex('users')
        .where("username", username)
        .then((users) => {
                if (users[0]) {
                    res.status(400).send("username already exists");
                }
                bcrypt.hash(password, 12)
                    .then((hashed_password) => {

                      const user = { first_name, last_name, username, hashed_password };

                        delete users.password;

                        return knex("users")
                            .insert(user, '*')
                    }).then((users) => {
                        delete users[0].hashed_password;
                        res.send(users[0]);
                    })
                    .catch((err) => {
                        if (err) {
                            throw err;
                        }
                    });

        })
}

function GetSpecificUser(req, res) {
    const userId = req.swagger.params.id.value;
    return knex('users')
        .where('id', userId)
        .then((user) => {
            delete user[0].hashed_password
            res.send(user[0]);
        })
        .catch((err) => {
            throw err;
        });
};

function UpdateUser(req, res) {
    const updatedUser = req.body;
    return bcrypt.hash(updatedUser.password, 12)
        .then((hashed_password) => {
          updatedUser.hashed_password = hashed_password;
          delete updatedUser.password;
            return knex('users')
                .where('id', updatedUser.id)
                .update(updatedUser)
                .then((updated) => {
                    delete updatedUser.hashed_password;
                    if (updated) {
                      res.send(updatedUser);
                    }
                })
                .catch((err) => {
                  throw err;
                })
        })
        .catch((err) => {
            throw err;
        });
};

function DeleteUser(req, res) {
  const deleteUserId = req.swagger.params.id.value;
  let deletedUser;
  return knex('users')
    .where('id', deleteUserId)
    .then((user) => {
      deletedUser = user[0];
      delete deletedUser.hashed_password;
      res.json(deletedUser);
    })
    .then(() => {
      return knex('users')
        .where('id', deleteUserId)
        .del()
    })
    .catch((err) => {
      throw err;
    })
};




module.exports = {
    GetAllUsers: GetAllUsers,
    AddUser: AddUser,
    GetSpecificUser: GetSpecificUser,
    UpdateUser: UpdateUser,
    DeleteUser: DeleteUser

};
