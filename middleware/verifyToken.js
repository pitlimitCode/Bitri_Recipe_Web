const jwt = require("jsonwebtoken");
require('dotenv').config();

const checkToken = async (req, res, next) => {
  // penyesuaian untuk request-an frontend
  // console.log(req.rawHeaders[7]);
  jwt.verify(req.rawHeaders[7].split(' ')[1], process.env.JWK_KEY, function(err, decoded) {
    if (err) {
      console.log(err.message)
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      req.tokenUserId = decoded.id;
      // console.log(decoded.id)
      next();
    }
  })

  // backend fix sebelum forntend
  // jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, function(err, decoded) {
  //   console.log(req.rawHeaders[1]);
  //   if (err) {
  //     res.status(400).send('Error verify type: ' + err.message + '.');
  //   } else {
  //     req.tokenUserId = decoded.id;
  //     // console.log(file)
  //     next();
  //   }
  // })
};

module.exports = { checkToken };