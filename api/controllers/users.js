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
    const { first_name, last_name, username, password } = req.body
    return knex('users')
        .where("username", username)
        .then((users) => {
                if (users[0]) {
                    res.status(400).send("username already exists");
                }
                bcrypt.hash(password, 12)
                    .then((hashed_password) => {
                      const user = { first_name, last_name, username, hashed_password };
                        delete user.password;
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

    function GetSpecificUser() {

    }

    function UpdateUser() {

    }

    function DeleteUser() {

    }




    module.exports = {
        GetAllUsers: GetAllUsers,
        AddUser: AddUser,
        GetSpecificUser: GetSpecificUser,
        UpdateUser: UpdateUser,
        DeleteUser: DeleteUser

    };
