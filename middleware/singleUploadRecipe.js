const multer = require("multer");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    let theId = 'id' ;
    // console.log("REQ AN DI MULTER DISKSTORAGE" + req);
    jwt.verify( req.rawHeaders[1].split(' ')[1], process.env.JWT_KEY, async function(err, decoded) {
    // jwt.verify( req.[authorization].split(' ')[1], process.env.JWT_KEY, async function(err, decoded) {
      // console.log("REQ AN DECODED JWT" + decoded);
      theId = decoded.id;
    })
    cb(null, "foodImage_" + req.body.id + "." + file.mimetype.split("/")[1]);
  },
  destination: "./images/food_images/",
});
const singleUploadRecipe = multer({
  fileFilter: (req, file, cb) => {
    // console.log("multer req:: " + req);
    // console.log("multer req.file:: " + req.file);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      return cb(null, true);
    } else {
      return cb(null, false);
		}
  },
  // limits: {  ////////////////////////////
  //   fileSize: 1000 * 1000, // 1 MB
  // },
  storage: storage,
})

module.exports = singleUploadRecipe;