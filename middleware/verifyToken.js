const jwt = require("jsonwebtoken");
require('dotenv').config();

const checkToken = async (req, res, next) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      req.tokenUserId = decoded.id;
      next();
    }
  })
};

module.exports = { checkToken };