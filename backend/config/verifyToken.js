var jwt = require('jsonwebtoken');
var secret = require('../config/secret');


function verifyToken(req, res, next) {
  // var token = req.headers['x-access-token'];
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, secret.secretKey, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req._id = decoded._id;
    next();
  });
}
module.exports = verifyToken;
