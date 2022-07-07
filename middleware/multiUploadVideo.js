const multer = require("multer");

  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, "foodVideo" + req.body.id_user + Math.round(Math.random()*1E4) + "." + file.mimetype.split("/")[1]);
    },
    destination: "././videos",
  });
  const uploadMultiple = multer({
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "video/mkv" ||
        file.mimetype == "video/mp4" ||
        file.mimetype == "video/webm" ||
        file.mimetype == "video/3gp"
      ) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    },
    limits: {
      fileSize: 40 * 1000 * 1000, // 40 MB
    },
    storage: storage,
  })


  module.exports = uploadMultiple;
  

