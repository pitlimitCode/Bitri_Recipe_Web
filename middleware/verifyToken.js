const jwt = require("jsonwebtoken");
require('dotenv').config();

const checkToken = async (req, res, next) => {
  // console.log(req);
  // console.log(req.headers['authorization']);
  jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWT_KEY, function(err, decoded) {
    if (err) {
      // console.log(err);
      if(err.message == "jwt expired") { return res.status(400).send(err.message) }
      return res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      // console.log(decoded);
      // console.log(decoded.id)
      req.tokenUserId = decoded.id;
      next();
    }
  })
};

module.exports = { checkToken };