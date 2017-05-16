const jwt = require('jsonwebtoken');

function middlewareVerify(req, res, next) {
  console.log("what is token",req.headers);

  jwt.verify(req.headers.token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
          res.status(401);
          res.send({status: 401, ErrorMessage: 'Unauthorized'});
      } else {
        tokenId = payload.userId;
        console.log('what userId', tokenId);
        console.log('am i here');
          next();
      }
  });
}

module.exports = {
  middlewareVerify:middlewareVerify
}
