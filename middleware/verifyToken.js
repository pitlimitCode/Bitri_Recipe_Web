const jwt = require("jsonwebtoken");
require('dotenv').config();

const checkToken = async (req, res, next) => {
  // console.log(req);
  // console.log(req.headers['authorization']);
  jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWK_KEY, function(err, decoded) {
    if (err) {
      // console.log(err)
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      req.tokenUserId = decoded.id;
      // console.log(decoded.id)
      next();
    }
  })
};

module.exports = { checkToken };