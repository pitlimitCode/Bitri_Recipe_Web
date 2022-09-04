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
    "https://bitri-recipe.herokuapp.com",
    "http://localhost:8000",
    "https://bitri-recipe.web.app",
    "http://localhost:3000"
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
// const corsOptionsDelegate = {
// 	origin: function (origin, callback) {
// 		if (allowlist.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowaned by CORS"));
// 		}
// 	},
// };

// Static path from express.js local storage.
app.use('/images', express.static('images'));

// Routes.
const usersRoutes = require("./routes/usersRoutes");
const recipesRoutes = require("./routes/recipesRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const likesRoutes = require("./routes/likesRoutes");
// const savesRoutes = require("./routes/savesRoutes");
app.use("/", cors(corsOptionsDelegate), usersRoutes);
app.use("/", cors(corsOptionsDelegate), recipesRoutes);
app.use("/", cors(corsOptionsDelegate), commentsRoutes);
app.use("/", cors(corsOptionsDelegate), likesRoutes);
// app.use("/", cors(corsOptionsDelegate), savesRoutes);

// const tesRoutes = require("./routes/tesRoutes");
// app.use("/", cors(corsOptionsDelegate), tesRoutes);

// app.use("/tes", (req, res) => {res.send("tes tanpa Cors, berhasil.")});
// app.use("*", (req, res) => {res.send("You access no one valid URL in this Site.")});
app.use("*", (req, res) => {res.send([
  'testing endpoint?:',
  '/users/all/',
  '/users/id/:id',
  '/users/name/:name',
  '/recipes/all/',
  '/recipes/pagination/',
  '/recipes/fivenew',
  '/recipes/id/:id',
  '/recipes/name/:name',
  '/comments/all/',
  '/comments/new/',
])});

// Listen the Port.
require('dotenv').config();
const port = process.env.PORT || 8000; // port database
app.listen(port, () => console.log(`[nodemon] running from port: '${port}'.`));