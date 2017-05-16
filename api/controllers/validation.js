const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
//using JTW to verify if the token is right when passing back from teh req.headers
function middlewareVerify(req, res, next) {
  jwt.verify(req.headers.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.status(401);
      res.send({status: 401, ErrorMessage: 'Unauthorized'});
    } else {
      tokenId = payload.userId;
      next();
    }
  });
}

module.exports = {
  middlewareVerify: middlewareVerify
}
