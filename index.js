const express = require("express");
const app = express(); 

// Body Parser.
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Helmet.
const helmet = require("helmet");
app.use(helmet());

// CORS.
const cors = require("cors");
app.use(cors());
var allowlist = 
  [
    "http://localhost:8000/", 
    "http://localhost:3000/", 
    "https://www.pijarmahir.id", 
    "https://www.telkom.co.id"
  ];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Static path from express.js local storage.
app.use('/images', express.static('images'));

// Routes.
const userAllRoutes = require("./routes/usersRoutes");
const recipesRoutes = require("./routes/recipesRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
app.use("/", cors(corsOptionsDelegate), userAllRoutes);
app.use("/", cors(corsOptionsDelegate), recipesRoutes);
app.use("/", cors(corsOptionsDelegate), commentsRoutes);
app.use("*", (req, res) => {res.send("You access no one valid URL in this Site.")});

// Listen the Port.
require('dotenv').config();
const port = process.env.PORT || 8000; // port database
app.listen(port, () => console.log(`[nodemon] running from port: '${port}'.`));