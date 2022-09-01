const multer = require("multer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // console.log(req?.file);
    let theId = 'id' ;
    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWT_KEY, async function(err, decoded) {
      theId = decoded.id;
    })
    cb(null, "avatar_" + theId + "." + file.mimetype.split("/")[1]);
  },
  // destination: (req, file, cb) => {
  // 	cb(null, 'images/users_avatar/')
  // },
  destination: "./images/users_avatar/",
});
const singleUploadAvatar = multer({
  fileFilter: (req, file, cb) => {
    // console.log(req);
    // console.log(file);
    // // console.log(req.[Symbol(kHeaders)].content-length);
    // console.log(req.rawHeaders[17]);
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
  // limits: {
  //   fileSize: 150 * 1000, // 1 MB
  // },
  storage: storage,
})

module.exports = singleUploadAvatar;