const express = require("express");
const app = express(); 

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const helmet = require("helmet");
app.use(helmet());

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

// static path
app.use('/images', express.static('images'));

// Routes
const userAllRoutes = require("./routes/usersRoutes");
const recipesRoutes = require("./routes/recipesRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
app.use("/", cors(corsOptionsDelegate), userAllRoutes);
app.use("/", cors(corsOptionsDelegate), recipesRoutes);
app.use("/", cors(corsOptionsDelegate), commentsRoutes);

// Port listen
const port = 8000; // port database
app.listen(port, () => console.log(`[nodemon] running from port: '${port}'.`));