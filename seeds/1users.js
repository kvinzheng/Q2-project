'use strict';
exports.seed = function(knex, Promise) {
  //Deletes All Existing entries
  return knex('users').del().then(function() {
    // Inserts seed entries
    return Promise.all([knex('users').insert([
        {
          id: 1,
          username: 'kDaddy',
          hashed_password: '$2a$12$ik/Gwny6vAtksQgJBWA9oOGpLcnsR4ynMRalO9ZS8OD7o.pfIUdcu', //kevinIsBoss
          first_name: 'Kevin',
          last_name: 'Zheng'
        }, {
          id: 2,
          username: 'MoSho',
          hashed_password: '$2a$12$VKYd1qf24P51whaS3JS9eu3kG2Y1KScupRXUebOS7h4HpanvU/Vy.', //ILoveKevin
          first_name: 'Muhammad',
          last_name: 'Shoman'
        }, {
          id: 3,
          username: 'Makavelli',
          hashed_password: '$2a$12$6IIwFUp4QwETniSIfEWjz.YoJCb2VJA1MyGzgB65MfdBAPIrz8.iK', //KeepYaHeadUp
          first_name: 'Tupac',
          last_name: 'Shakur'
        }, {
          id: 4,
          username: 'BigBoi',
          hashed_password: '$2a$12$pTDiyVoFKP2PKxID6SuquO6PvYOPics70IPY8yzZpLsnVXzCe.Ar6', //YeahBoi
          first_name: 'Big',
          last_name: 'Boy'
        }, {
          id: 5,
          username: 'MartyTheeMartian',
          hashed_password: '$2a$12$9y4QLq4FgrDi7O7MKssVbuGo0FDI/iLZ52OAySRD8YEX1vp/wB8QO', //ILoveJOI
          first_name: 'Marty',
          last_name: 'Yee'
        }, {
          id: 6,
          username: 'Sasha',
          hashed_password: '$2a$12$9y4QLq4FgrDi7O7MKssVbuGo0FDI/iLZ52OAySRD8YEX1vp/wB8QO',
          first_name: 'Sasha',
          last_name: 'Dog'
        }
      ])]);
  }).then(() => {
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
  });
};
