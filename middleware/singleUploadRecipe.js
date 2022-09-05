const multer = require("multer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // console.log(req);
    jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWT_KEY, async function(err, decoded) {
      theId = decoded.id;
    })
    cb(null, "foodImage_" + Math.floor(Math.random()*1000000) + "." + file.mimetype.split("/")[1]);
  },
  destination: "./images/food_images/",
});
const singleUploadRecipe = multer({
  // limits: {
  //   fileSize: 1000 * 1000, // 1000 * 1000 = 1 MB
  // },
  fileFilter: (req, file, cb) => {
    // console.log(req);
    // console.log(file);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      const fileSizeUpload = req.headers['content-length'];
      const maxUpload = 500 * 1000; // 1000 * 1000 = 1 MB
      if (fileSizeUpload < maxUpload ) {
        cb(null, true); 
      } else {
        cb(`Max. image size is '${maxUpload/1000} kb', you upload image with size '${fileSizeUpload/1000} kb'`, false); 
      }
    } else {
      cb("Image type file must be: png / jpg / jpeg", false); 
      // cb("Image type file must be: png / jpg / jpeg", true);
		}
  },
  storage: storage,
}).single('image')

module.exports = singleUploadRecipe;