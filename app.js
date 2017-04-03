'use strict';
// let app = express();
if (process.env.NODE_ENV!== 'production'){
  require('dotenv').config();
}
// let verify = require('./api/controllers/validation.js')
var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const cors = require('cors');
module.exports = app; // for testing
app.use(express.static(path.join('public')));
app.use(cors());

var config = {
  appRoot: __dirname // required config
};

//middleware goes here
// app.use('/flight', verify.middlewareVerify);

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
