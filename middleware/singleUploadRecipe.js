const multer = require("multer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // console.log(req);
    // console.log(file);
    // let theId = 'id' ;
    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWT_KEY, async function(err, decoded) {
      theId = decoded.id;
    })
    cb(null, "foodImage_" + Math.floor(Math.random()*1000000) + "." + file.mimetype.split("/")[1]);
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