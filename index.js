const express = require("express");
const app = express(); 

// Body Parser.
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Helmet.
const helmet = require("helmet");
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS.
const cors = require("cors");
app.use(cors());
var allowlist = 
  [
    "https://bitri-recipe.herokuapp.com/",
    "https://herokuapp.com/",
    "http://localhost:3000/", 
    // "https://www.pijarmahir.id", 
    // "https://www.telkom.co.id",
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
app.use("/", cors(corsOptionsDelegate), recipesRoutes); // CORSNYA DIMATIKAN SEMENTARA UNTUK COBA RUNNING DI HEROKU
app.use("/", cors(corsOptionsDelegate), commentsRoutes);

app.use("/tes", (req, res) => {res.send("tes tanpa Cors, berhasil.")});
// app.use("*", (req, res) => {res.send("You access no one valid URL in this Site.")});
app.use("*", (req, res) => {res.send({ 
  SHOW_ALL_USERS: ' users/show/all ' ,
  SHOW_ALL_RECIPES: ' recipes/show/all ' ,
  SHOW_5_NEW_RECIPES: ' recipes/show/new ',
  SHOW_ALL_COMMENTS_PUBLIC: ' comments/all ' ,
})});

// Listen the Port.
require('dotenv').config();
const port = process.env.PORT || 8000; // port database
app.listen(port, () => console.log(`[nodemon] running from port: '${port}'.`));