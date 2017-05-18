const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
//using JTW to verify if the token is right when passing back from teh req.headers
function middlewareVerify(req, res, next) {
  console.log('what is req.headers', req.headers);
  jwt.verify(req.headers.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      // console.log(err);
      res.status(401);
      res.send({status: 401, ErrorMessage: 'Unauthorized'});
      next()
    } else {
      console.log('pass!');
      tokenId = payload.userId;
      
      next();
    }
  });
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJrZXZpbmF3ZXNvbWUiLCJpYXQiOjE0OTUwNTYyMDAsImV4cCI6MTQ5NTY2MTAwMH0.2WtveBBVh0pSOTpNIXfIaB58DDSwOhtKLBWo9dJGhR8

module.exports = {
  middlewareVerify: middlewareVerify
}
